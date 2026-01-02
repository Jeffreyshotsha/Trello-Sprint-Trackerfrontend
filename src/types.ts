// src/types.ts
export interface Member {
  id: string;
  name: string;
  "TO DO": number;
  "DOING": number;
  "DONE": number;
  "NOT DONE": number;
}

export interface BurndownPoint {
  date: string;      // preferably "YYYY-MM-DD"
  remaining: number;
}

export interface ReportData {
  success: boolean;
  
  totals: {
    "TO DO": number;
    "DOING": number;
    "DONE": number;
    "NOT DONE": number;
  };

  members: Member[];

  burndown: BurndownPoint[];
}