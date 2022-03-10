export type ApiDefinition = {
  url: string,
  method: 'GET' | 'POST',
}

type d = 1|2|3|4|5|6|7|8|9|0;
type oneToNine = 1|2|3|4|5|6|7|8|9;
type MM = `0${oneToNine}` | `1${0|1|2}`;
type YYYY = `20${d}${d}`
type DD = `${0}${oneToNine}` | `${1|2}${d}` | `3${0|1}`;
type DateDD_MM_YY = `${DD}-${MM}-${YYYY}`;

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

export type Availability = {
  id: string
  date_available: DateDD_MM_YY
  active: boolean
  length_of_stay: string
}

export type HostSummary = {
  id: string
  region: string
  allowed_people: number
  restrictions: Restriction[]
  message: string
  shelter: string
  languages: SpokenLanguages[]
  availability: Availability
}

export type HostProfile = {
  id: string;
  summary: HostSummary;
  contact: Contact;
}

export type RefugeeProfile = {
  id: string
  summary: RefugeeSummary
  contact: Contact
}