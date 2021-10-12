export default interface User {
  id: string;
  name: string;
  age: number;
  city: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | undefined;
}
