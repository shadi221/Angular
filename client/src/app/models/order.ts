export class Order {
  id?: number;
  userId: number;
  basketId: number;
  total_price: number;
  address_city: string;
  address_street: string;
  date: Date;
  card: string;
  ispaid: number;
}
