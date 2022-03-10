import { RefugeeSummary } from "./apiTypes";

export type SignupFlows = null | 'refugee' | 'host';

export type RefugeeForm = {
  id: string;
  summary: RefugeeSummary;
  phone: string;
  email: string;
  sms: string;
  firstName: string;
  lastName: string;
}