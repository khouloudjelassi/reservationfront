export interface Seat {
  id: number;
  name: string;
  reference: string;
  reserved?: boolean;
  reservedBy?: string;
}
