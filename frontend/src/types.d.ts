import { HostSummary, RefugeeSummary } from "./apiTypes";

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

export type HostForm = {
  id: string;
  summary: HostSummary;
  phone: string;
  email: string;
  sms: string;
  firstName: string;
  lastName: string;
}