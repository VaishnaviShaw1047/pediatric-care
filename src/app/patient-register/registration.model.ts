export interface ChildRegistration {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  abhaId: string | null;
  aadhaarNumber: string | null;
  bloodGroup: string | null;
  knownAllergies: string | null;
  existingConditions: string | null;
  currentMedications: string | null;
  immunizationStatus: string | null;
  referredBy: string | null;
}

export interface GuardianRegistration {
  firstName: string;
  lastName: string;
  relationshipToChild: string;
  mobileNumber: string;
  email: string | null;
  password: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  preferredLanguage: string | null;
  termsAccepted: boolean;
  healthDataConsent: boolean;
  children: ChildRegistration[];
}