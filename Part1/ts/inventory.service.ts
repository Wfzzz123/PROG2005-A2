import { InventoryItem } from './item.interface.js';
export class InventoryService {
  private items: InventoryItem[] = [];
  addItem(item: InventoryItem): boolean {
    const exists = this.items.some(i => i.itemId === item.itemId);
    if (exists) return false;
    item.stockStatus = this.calculateStockStatus(item.quantity);
    this.items.push(item);
    return true;
  }
  deleteItem(name: string): boolean {
    const originalLength = this.items.length;
    this.items = this.items.filter(i => i.itemName.toLowerCase() !== name.toLowerCase());
    return this.items.length < originalLength;
  }
  searchItems(query: string): InventoryItem[] {
    const lowerQuery = query.toLowerCase();
    return this.items.filter(i => i.itemName.toLowerCase().includes(lowerQuery));
  }
  getAllItems(): InventoryItem[] {
    return [...this.items];
  }
  getPopularItems(): InventoryItem[] {
    return this.items.filter(i => i.isPopular);
  }
  private calculateStockStatus(qty: number): 'In Stock' | 'Low Stock' | 'Out of Stock' {
    if (qty === 0) return 'Out of Stock';
    if (qty <= 5) return 'Low Stock';
    return 'In Stock';
  }
}