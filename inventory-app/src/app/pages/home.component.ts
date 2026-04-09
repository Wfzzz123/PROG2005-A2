import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventoryModule } from '../inventory/inventory.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InventoryModule, RouterLink],
  template: `
    <section class="hero">
      <p class="eyebrow">Inventory Workspace</p>
      <h1>Track stock clearly, find items fast, and keep records current.</h1>
      <p>
        This app is built for day-to-day inventory work: add and maintain item details,
        update records by item name, and quickly filter what you need.
      </p>
      <div class="hero-actions">
        <a routerLink="/inventory">Open Inventory Manager</a>
        <a routerLink="/search">Search Items</a>
      </div>
    </section>

    <section class="grid">
      <article>
        <h2>What you can do here</h2>
        <ul>
          <li>Add inventory items with input validation.</li>
          <li>Update or delete records using item name.</li>
          <li>Filter by item name, category, and popularity.</li>
          <li>View complete inventory and popular items separately.</li>
        </ul>
      </article>
      <article>
        <h2>Suggested workflow</h2>
        <ol>
          <li>Start by creating your baseline item records.</li>
          <li>Use update-by-name whenever quantity or price changes.</li>
          <li>Use the search page for quick filtering and lookup.</li>
          <li>Review privacy and security notes before deployment.</li>
        </ol>
      </article>
    </section>
  `,
  styles: [
    `
      .hero {
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 18px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        box-shadow: 0 14px 34px -24px rgba(0, 0, 0, 0.4);
      }

      .eyebrow {
        color: #0f766e;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 0.5rem;
      }

      h1 {
        font-size: clamp(1.55rem, 3vw, 2.25rem);
        margin-bottom: 0.65rem;
        color: #1f2937;
      }

      p {
        color: #374151;
      }

      .hero-actions {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      .hero-actions a {
        text-decoration: none;
        border: 1px solid #cbd5e1;
        border-radius: 999px;
        padding: 0.5rem 0.9rem;
        color: #1f2937;
        background: #f9fafb;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1rem;
      }

      article {
        background: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 14px;
        padding: 1rem;
      }

      h2 {
        color: #0f766e;
        margin-bottom: 0.5rem;
      }

      ul,
      ol {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }

      li {
        margin-bottom: 0.4rem;
        border-left: 3px solid #14b8a6;
        padding-left: 0.55rem;
      }
    `
  ]
})
export class HomeComponent {}
