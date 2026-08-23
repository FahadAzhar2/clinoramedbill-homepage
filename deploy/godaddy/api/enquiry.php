<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://clinoramedbill.com',
    'https://www.clinoramedbill.com',
];
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid origin']);
    exit;
}

$body = file_get_contents('php://input');
if ($body === false || strlen($body) > 16384) {
    http_response_code(413);
    echo json_encode(['error' => 'Request too large']);
    exit;
}

$upstream = 'https://clinora-homepage.vercel.app/api/enquiry/';
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
$headers = [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($body),
];
if ($clientIp !== '') {
    $headers[] = 'X-Forwarded-For: ' . $clientIp;
}

if (!function_exists('curl_init')) {
    http_response_code(503);
    echo json_encode(['error' => 'Email delivery bridge is unavailable']);
    exit;
}

$curl = curl_init($upstream);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_FOLLOWLOCATION => false,
]);

$response = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$error = curl_error($curl);
curl_close($curl);

if ($response === false || $status < 100) {
    http_response_code(502);
    echo json_encode(['error' => 'Email delivery bridge failed', 'detail' => $error !== '' ? 'upstream unavailable' : 'no response']);
    exit;
}

http_response_code($status);
echo $response;
