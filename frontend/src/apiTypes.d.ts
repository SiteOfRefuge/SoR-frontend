export type ApiDefinition = {
  url: string,
  method: 'GET' | 'POST',
}

export type ContactMethods = 'Phone' | 'Email' | 'SMS';

export type ContactMethod = {
  id: string;
  method: ContactMethods;
  value: string;
  verified: boolean;
}

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  methods: ContactMethod[];
}

export type Region = {
  country: string;
  code: string;
  countryCode: string;
  type: string;
  name: string;
}

export type Restriction = 'Kids' | 'Adult men' | 'Adult women' | 'Dogs' | 'Cats' | 'Other pets';
export type SpokenLanguages = 'English' | 'Ukrainian' | 'Polish' | 'Russian' | 'Slovak' |
  'Hungarian' | 'Romanian' | 'Other';

export type RefugeeSummary = {
  id: string;
  people: number;
  region: string;
  message: string;
  restrictions: Restriction[];
  languages: SpokenLanguages[];
  possession_date: string;
}

export type RefugeeProfile = {
  id: string;
  summary: RefugeeSummary;
  contact: Contact;
}