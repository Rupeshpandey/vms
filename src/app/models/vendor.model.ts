import { LanguagePreference } from "./LanguagePreference.model";

export interface vendor {
  vendorID: Number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  mobile: string;
  dob: Date;
  panCard: string;
  profileImage: string;
  languagePreference: LanguagePreference;
  district: string;
  block: string;
  createdAt: Date;
  updatedAt: Date;
}
