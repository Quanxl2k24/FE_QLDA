export type MooncakeCategory = "all" | "baked" | "snowskin" | "gift-boxes";

export interface MooncakeItem {
  id: string;
  name: string;
  category: MooncakeCategory;
  crustDescription: string;
  fillingDescription: string;
  price: number;
  imageUrl: string;
  isOnlineOnly?: boolean;
  calories?: number;
  weightGrams?: number;
}
