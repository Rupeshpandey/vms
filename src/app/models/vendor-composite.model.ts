export interface VendorCompositeModel {
    vendor: vendor; 
    companyContact: CompanyContact;
    bankingInformation: BankingInformation;
  }
  
  export interface vendor {
    vendorID?: Number;
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
  
  export interface LanguagePreference {
    hindi: boolean;
    english: boolean;
  }
  
  export interface CompanyContact {
    vendorID?: number;
    companyName: string;
    telephone: string;
    fax?: string;
    email: string;
    pointOfContactName?: string;
    title?: string;
    contactPhone1?: string;
    mailingAddress?: string;
    website?: string;
    contactEmail?: string;
    contactPhone2?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface BankingInformation {
    vendorID?: number;
      bankName: string;
      IFSCCode?: string;
      accountNumber: string;
      Branch?: string;
      createdAt?: Date;
      updatedAt?: Date;
  }
  
  export interface VendorCompositeModel {
    vendor: vendor;
    companyContact: CompanyContact;
    bankingInformation: BankingInformation;
  }
  