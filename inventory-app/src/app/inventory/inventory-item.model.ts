export interface InventoryItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  popular: boolean;
  updatedAt: string;
}

export interface InventorySearchFilters {
  name: string;
  category: string;
  popularOnly: boolean;
}
