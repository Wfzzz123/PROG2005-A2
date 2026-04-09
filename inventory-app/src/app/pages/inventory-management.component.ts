import { Component } from '@angular/core';
import { InventoryItem } from '../inventory/inventory-item.model';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';

interface ItemForm {
  name: string;
  category: string;
  quantity: number;
  price: number;
  popular: boolean;
}

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [InventoryModule],
  template: `
    <section class="panel">
      <h1>Inventory Management</h1>
      <p class="tip">Use item name as the key for updating and deleting records.</p>
    </section>

    <section class="layout">
      <article class="card">
        <h2>Add Item</h2>
        <form #addFormRef="ngForm" (ngSubmit)="addItem()" novalidate>
          <label>Item name</label>
          <input
            type="text"
            name="addName"
            required
            maxlength="60"
            [(ngModel)]="addForm.name"
            #addName="ngModel"
          />
          <small *ngIf="addName.invalid && addName.touched">Item name is required.</small>

          <label>Category</label>
          <input type="text" name="addCategory" required maxlength="40" [(ngModel)]="addForm.category" />

          <label>Quantity</label>
          <input
            type="number"
            name="addQuantity"
            required
            min="0"
            step="1"
            [(ngModel)]="addForm.quantity"
          />

          <label>Price</label>
          <input
            type="number"
            name="addPrice"
            required
            min="0"
            step="0.01"
            [(ngModel)]="addForm.price"
          />

          <label class="inline">
            <input type="checkbox" name="addPopular" [(ngModel)]="addForm.popular" />
            Mark as popular item
          </label>

          <button type="submit" [disabled]="addFormRef.invalid">Add Item</button>
        </form>
      </article>

      <article class="card">
        <h2>Update Item By Name</h2>
        <form #updateFormRef="ngForm" (ngSubmit)="updateItem()" novalidate>
          <label>Target item name</label>
          <input
            type="text"
            name="targetName"
            required
            maxlength="60"
            [(ngModel)]="updateTargetName"
          />

          <label>New item name</label>
          <input type="text" name="newName" required maxlength="60" [(ngModel)]="updateForm.name" />

          <label>Category</label>
          <input type="text" name="newCategory" required maxlength="40" [(ngModel)]="updateForm.category" />

          <label>Quantity</label>
          <input
            type="number"
            name="newQuantity"
            required
            min="0"
            step="1"
            [(ngModel)]="updateForm.quantity"
          />

          <label>Price</label>
          <input
            type="number"
            name="newPrice"
            required
            min="0"
            step="0.01"
            [(ngModel)]="updateForm.price"
          />

          <label class="inline">
            <input type="checkbox" name="newPopular" [(ngModel)]="updateForm.popular" />
            Keep in popular list
          </label>

          <button type="submit" [disabled]="updateFormRef.invalid">Update Item</button>
        </form>
      </article>

      <article class="card">
        <h2>Delete Item By Name</h2>
        <label>Item name to delete</label>
        <input type="text" maxlength="60" [(ngModel)]="deleteName" name="deleteName" />
        <button type="button" class="danger" (click)="deleteItem()">Delete with Confirmation</button>
      </article>
    </section>

    <p class="feedback" *ngIf="message">{{ message }}</p>

    <section class="tables">
      <article class="card">
        <h2>All Items</h2>
        <table *ngIf="items.length; else noItems">
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
            <tr *ngFor="let item of items">
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price | number: '1.2-2' }}</td>
              <td>{{ item.popular ? 'Yes' : 'No' }}</td>
            </tr>
          </tbody>
        </table>
      </article>

      <article class="card">
        <h2>Popular Items</h2>
        <table *ngIf="popularItems.length; else noPopular">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of popularItems">
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price | number: '1.2-2' }}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>

    <ng-template #noItems>
      <p class="empty">No items in inventory yet.</p>
    </ng-template>

    <ng-template #noPopular>
      <p class="empty">No popular items set.</p>
    </ng-template>
  `,
  styles: [
    `
      .panel,
      .card {
        border: 1px solid #d1d5db;
        border-radius: 14px;
        background: #ffffff;
        box-shadow: 0 14px 24px -28px rgba(0, 0, 0, 0.45);
      }

      .panel {
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .tip {
        color: #4b5563;
      }

      .layout {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1rem;
      }

      .card {
        padding: 1rem;
      }

      form {
        display: grid;
        gap: 0.45rem;
      }

      label {
        font-weight: 600;
        color: #374151;
      }

      .inline {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 500;
      }

      input {
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 0.5rem 0.6rem;
      }

      small {
        color: #b91c1c;
      }

      button {
        margin-top: 0.35rem;
        border: none;
        border-radius: 10px;
        background: #0f766e;
        color: #ffffff;
        padding: 0.58rem 0.75rem;
        cursor: pointer;
      }

      button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .danger {
        background: #b91c1c;
      }

      .feedback {
        margin: 1rem 0;
        font-weight: 600;
      }

      .tables {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
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
export class InventoryManagementComponent {
  items: InventoryItem[] = [];
  popularItems: InventoryItem[] = [];
  message = '';

  addForm: ItemForm = {
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    popular: false
  };

  updateTargetName = '';
  updateForm: ItemForm = {
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    popular: false
  };

  deleteName = '';

  constructor(private readonly inventoryService: InventoryService) {
    this.refreshItems();
  }

  addItem(): void {
    const succeeded = this.inventoryService.addItem({ ...this.addForm });
    this.message = succeeded ? 'Item added successfully.' : 'Add failed. Name may already exist or values are invalid.';
    if (succeeded) {
      this.addForm = { name: '', category: '', quantity: 0, price: 0, popular: false };
      this.refreshItems();
    }
  }

  updateItem(): void {
    const succeeded = this.inventoryService.updateByName(this.updateTargetName, { ...this.updateForm });
    this.message = succeeded
      ? 'Item updated successfully.'
      : 'Update failed. Check target name, duplicate names, or numeric values.';

    if (succeeded) {
      this.updateTargetName = '';
      this.updateForm = { name: '', category: '', quantity: 0, price: 0, popular: false };
      this.refreshItems();
    }
  }

  deleteItem(): void {
    if (!this.deleteName.trim()) {
      this.message = 'Please provide an item name for deletion.';
      return;
    }

    const confirmed = window.confirm(`Delete item "${this.deleteName}"?`);
    if (!confirmed) {
      this.message = 'Deletion cancelled.';
      return;
    }

    const succeeded = this.inventoryService.deleteByName(this.deleteName);
    this.message = succeeded ? 'Item deleted successfully.' : 'Delete failed. Item not found.';

    if (succeeded) {
      this.deleteName = '';
      this.refreshItems();
    }
  }

  private refreshItems(): void {
    this.items = this.inventoryService.getAllItems();
    this.popularItems = this.inventoryService.getPopularItems();
  }
}
