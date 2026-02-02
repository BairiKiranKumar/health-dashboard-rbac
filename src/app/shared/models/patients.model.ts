export interface Patient {
  id: string;
  name: string;
  age: number;
  photo: string;
  gender: 'Male' | 'Female' | 'Other';
  lastVisit: string;
  nextAppointment: string;
  status: 'Active' | 'Inactive';
  condition: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  medications: string[];
  insuranceProvider: string;
  insuranceId: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: EmergencyContact;
  vitals: Vitals;
  notes: string;
  visitHistory: Visit[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface Vitals {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  weight: number;
  height: number;
}

export interface Visit {
  id: string;
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}
