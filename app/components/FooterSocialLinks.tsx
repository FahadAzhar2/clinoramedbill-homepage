import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function FooterSocialLinks() {
  return (
    <div className="footer-socials" aria-label="ClinoraMedBill social media">
      <a
        className="footer-social-link"
        href="https://www.facebook.com/people/Clinora-Medbill/61593144666683/"
        target="_blank"
        rel="noreferrer"
        aria-label="ClinoraMedBill on Facebook"
        title="Facebook"
      >
        <FaFacebookF aria-hidden="true" />
      </a>
      <a
        className="footer-social-link"
        href="https://www.instagram.com/clinoramedbill/"
        target="_blank"
        rel="noreferrer"
        aria-label="ClinoraMedBill on Instagram"
        title="Instagram"
      >
        <FaInstagram aria-hidden="true" />
      </a>
      <span
        className="footer-social-link is-pending"
        aria-label="ClinoraMedBill LinkedIn link coming soon"
        title="LinkedIn link coming soon"
      >
        <FaLinkedinIn aria-hidden="true" />
      </span>
    </div>
  );
}
