import { Stethoscope } from "lucide-react";
import {
  PiAmbulance, PiBaby, PiBabyCarriage, PiBrain, PiEye, PiFirstAidKit,
  PiFlower, PiFootprints, PiGenderFemale, PiHandHeart, PiHandPalm,
  PiHeadCircuit, PiHeartbeat, PiHospital, PiMicroscope, PiPersonSimple,
  PiStethoscope, PiSyringe, PiTooth, PiUserSound, PiVirus, PiWheelchair,
} from "react-icons/pi";
import {
  GiBackPain, GiBlood, GiBrain, GiHeartOrgan, GiJoint, GiKidneys,
  GiKneeCap, GiLiver, GiLungs, GiNoseSide, GiRadiations, GiScalpel,
  GiSpinalCoil, GiStomach,
} from "react-icons/gi";
import { TbPhysotherapist, TbRibbonHealth, TbZzz } from "react-icons/tb";
import type { IconType } from "react-icons";

export const specialtyIcons: Record<string, IconType> = {
  "Family Medicine": PiHospital,
  "Internal Medicine": PiStethoscope,
  Pediatrics: PiBaby,
  Geriatrics: PiWheelchair,
  "Urgent Care": PiFirstAidKit,
  "Emergency Medicine": PiAmbulance,
  Cardiology: GiHeartOrgan,
  Gastroenterology: GiStomach,
  Hepatology: GiLiver,
  Endocrinology: PiSyringe,
  Nephrology: GiKidneys,
  Pulmonology: GiLungs,
  Rheumatology: GiJoint,
  "Infectious Disease": PiVirus,
  Hematology: GiBlood,
  Oncology: TbRibbonHealth,
  "Allergy & Immunology": PiFlower,
  Neurology: PiBrain,
  "Sleep Medicine": TbZzz,
  "Pain Management": GiBackPain,
  "General Surgery": GiScalpel,
  "Orthopedic Surgery": GiKneeCap,
  Neurosurgery: GiBrain,
  Urology: GiKidneys,
  "Vascular Surgery": PiHeartbeat,
  "Thoracic Surgery": GiLungs,
  "Plastic Surgery": PiPersonSimple,
  "Oral & Maxillofacial Surgery": PiTooth,
  "Otolaryngology (ENT)": GiNoseSide,
  Ophthalmology: PiEye,
  Podiatry: PiFootprints,
  "Obstetrics & Gynecology (OB/GYN)": PiGenderFemale,
  Neonatology: PiBabyCarriage,
  Psychiatry: PiHeadCircuit,
  Psychology: PiBrain,
  "Behavioral Health": PiHandHeart,
  "Physical Medicine & Rehabilitation": GiSpinalCoil,
  "Physical Therapy": TbPhysotherapist,
  "Occupational Therapy": PiHandPalm,
  "Speech Therapy": PiUserSound,
  Radiology: GiRadiations,
  "Pathology & Laboratory Services": PiMicroscope,
  Dental: PiTooth,
};

export const fallbackSpecialtyIcon = Stethoscope;
