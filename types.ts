
export interface User {
  id: string;
  email: string;
}

export interface VoiceSample {
  id: string;
  title: string;
  url: string; // In a real app, this would be a URL to an audio file
  style: string;
}

export interface Interpreter {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  tags: string[];
  rating: number;
  reviews: number;
  samples: VoiceSample[];
}

export enum JobStatus {
  Open = "Otevřeno",
  InProgress = "V realizaci",
  InReview = "Ke schválení",
  Completed = "Dokončeno",
  Cancelled = "Zrušeno",
}

export interface Job {
  id: string;
  title: string;
  customerName: string;
  interpreterName?: string;
  price: number;
  status: JobStatus;
  description: string;
  deadline: string;
}