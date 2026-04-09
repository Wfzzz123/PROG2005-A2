import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryItem, InventorySearchFilters } from './inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly storageKey = 'inventory-hub-items';

  private readonly itemsSubject = new BehaviorSubject<InventoryItem[]>(this.loadInitialData());
  readonly items$ = this.itemsSubject.asObservable();

  getAllItems(): InventoryItem[] {
    return [...this.itemsSubject.value].sort((a, b) => a.name.localeCompare(b.name));
  }

  getPopularItems(): InventoryItem[] {
    return this.getAllItems().filter((item) => item.popular);
  }

  addItem(item: Omit<InventoryItem, 'updatedAt'>): boolean {
    const nameKey = this.normalize(item.name);
    if (!nameKey || this.existsByName(nameKey) || !this.isValidNumeric(item.quantity, item.price)) {
      return false;
    }

    const nextItem: InventoryItem = {
      ...item,
      name: item.name.trim(),
      category: item.category.trim(),
      updatedAt: new Date().toISOString()
    };

    const nextItems = [...this.itemsSubject.value, nextItem];
    this.persistAndPublish(nextItems);
    return true;
  }

  updateByName(targetName: string, next: Omit<InventoryItem, 'updatedAt'>): boolean {
    const targetKey = this.normalize(targetName);
    const nextKey = this.normalize(next.name);

    if (!targetKey || !nextKey || !this.isValidNumeric(next.quantity, next.price)) {
      return false;
    }

    const currentItems = [...this.itemsSubject.value];
    const targetIndex = currentItems.findIndex((item) => this.normalize(item.name) === targetKey);
    if (targetIndex === -1) {
      return false;
    }

    const duplicated = currentItems.some(
      (item, index) => index !== targetIndex && this.normalize(item.name) === nextKey
    );
    if (duplicated) {
      return false;
    }

    currentItems[targetIndex] = {
      ...next,
      name: next.name.trim(),
      category: next.category.trim(),
      updatedAt: new Date().toISOString()
    };

    this.persistAndPublish(currentItems);
    return true;
  }

  deleteByName(name: string): boolean {
    const nameKey = this.normalize(name);
    if (!nameKey) {
      return false;
    }

    const currentItems = this.itemsSubject.value;
    const nextItems = currentItems.filter((item) => this.normalize(item.name) !== nameKey);
    if (nextItems.length === currentItems.length) {
      return false;
    }

    this.persistAndPublish(nextItems);
    return true;
  }

  search(filters: InventorySearchFilters): InventoryItem[] {
    const nameFilter = this.normalize(filters.name);
    const categoryFilter = this.normalize(filters.category);

    return this.getAllItems().filter((item) => {
      const itemName = this.normalize(item.name);
      const itemCategory = this.normalize(item.category);
      const nameMatch = !nameFilter || itemName.includes(nameFilter);
      const categoryMatch = !categoryFilter || itemCategory === categoryFilter;
      const popularMatch = !filters.popularOnly || item.popular;
      return nameMatch && categoryMatch && popularMatch;
    });
  }

  private existsByName(nameKey: string): boolean {
    return this.itemsSubject.value.some((item) => this.normalize(item.name) === nameKey);
  }

  private isValidNumeric(quantity: number, price: number): boolean {
    return Number.isFinite(quantity) && Number.isFinite(price) && quantity >= 0 && price >= 0;
  }

  private persistAndPublish(items: InventoryItem[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadInitialData(): InventoryItem[] {
    const cached = localStorage.getItem(this.storageKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as InventoryItem[];
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        localStorage.removeItem(this.storageKey);
      }
    }

    const sample: InventoryItem[] = [
      {
        name: 'Notebook A5',
        category: 'Stationery',
        quantity: 120,
        price: 18,
        popular: true,
        updatedAt: new Date().toISOString()
      },
      {
        name: 'USB-C Cable 1m',
        category: 'Accessories',
        quantity: 65,
        price: 25,
        popular: true,
        updatedAt: new Date().toISOString()
      },
      {
        name: 'Desk Lamp',
        category: 'Office',
        quantity: 34,
        price: 129,
        popular: false,
        updatedAt: new Date().toISOString()
      }
    ];

    localStorage.setItem(this.storageKey, JSON.stringify(sample));
    return sample;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
