export type SignupFlows = null | 'refugee' | 'host';

export type Region = {
  country: string;
  code: string;
  countryCode: string;
  type: string;
  name: string;
}

export type Restriction = 'Minors' | 'Adult men' | 'Adult women' | 'Dogs' | 'Cats' | 'Pets';
export type SpokenLanguages = 'English' | 'Ukrainian' | 'Polish' | 'Russian' | 'Slovak' |
  'Hungarian' | 'Romanian' | 'Other';

export type RefugeeSummary = {
  id: string;
  firstName: string;
  lastInitial: string;
  email: string;
  phoneNumber: string;
  people: number;
  region: string;
  message: string;
  restrictions: Restriction[];
  languages: SpokenLanguages[];
  possession_date: Date;
}