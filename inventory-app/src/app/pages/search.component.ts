import { Component } from '@angular/core';
import { InventoryItem } from '../inventory/inventory-item.model';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InventoryModule],
  template: `
    <section class="card">
      <h1>Item Search</h1>
      <p>Find inventory by name and apply category/popularity filters.</p>
      <div class="filters">
        <label>
          Item name
          <input type="text" maxlength="60" [(ngModel)]="nameFilter" name="nameFilter" />
        </label>

        <label>
          Category
          <select [(ngModel)]="categoryFilter" name="categoryFilter">
            <option value="">All categories</option>
            <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
          </select>
        </label>

        <label class="inline-check">
          <input type="checkbox" [(ngModel)]="popularOnly" name="popularOnly" />
          Popular items only
        </label>

        <button type="button" (click)="runSearch()">Search</button>
      </div>
    </section>

    <section class="card">
      <h2>Search Results ({{ results.length }})</h2>
      <table *ngIf="results.length; else noResults">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Popular</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of results">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price | number: '1.2-2' }}</td>
            <td>{{ item.popular ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
      <ng-template #noResults>
        <p class="empty">No matching items found.</p>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .card {
        border: 1px solid #d1d5db;
        border-radius: 14px;
        background: #ffffff;
        box-shadow: 0 14px 24px -28px rgba(0, 0, 0, 0.45);
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.7rem;
        margin-top: 0.7rem;
      }

      label {
        display: grid;
        gap: 0.35rem;
        font-weight: 600;
      }

      input,
      select {
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 0.45rem 0.5rem;
      }

      .inline-check {
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      button {
        border: none;
        border-radius: 10px;
        background: #0f766e;
        color: #ffffff;
        padding: 0.58rem 0.75rem;
        margin-top: auto;
        cursor: pointer;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
        padding: 0.5rem;
      }

      th {
        color: #0f766e;
      }

      .empty {
        color: #6b7280;
      }
    `
  ]
})
export class SearchComponent {
  nameFilter = '';
  categoryFilter = '';
  popularOnly = false;

  categories: string[] = [];
  results: InventoryItem[] = [];

  constructor(private readonly inventoryService: InventoryService) {
    this.loadCategories();
    this.runSearch();
  }

  runSearch(): void {
    this.results = this.inventoryService.search({
      name: this.nameFilter,
      category: this.categoryFilter,
      popularOnly: this.popularOnly
    });
    this.loadCategories();
  }

  private loadCategories(): void {
    const unique = new Set(this.inventoryService.getAllItems().map((item) => item.category));
    this.categories = [...unique].sort((a, b) => a.localeCompare(b));
  }
}
