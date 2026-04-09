import { Component } from '@angular/core';
import { InventoryModule } from '../inventory/inventory.module';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [InventoryModule],
  template: `
    <section class="card">
      <h1>Privacy and Security Analysis</h1>
      <p>
        Inventory data may reveal sensitive business signals such as stock levels, pricing behavior,
        and product demand. The system should be operated with secure-by-default practices.
      </p>
    </section>

    <section class="grid">
      <article class="card">
        <h2>Data Minimization</h2>
        <ul>
          <li>Keep only required operational fields: name, category, quantity, price, and popularity.</li>
          <li>Avoid storing personal customer information in inventory entries.</li>
          <li>Use update timestamps only for traceability and routine audits.</li>
        </ul>
      </article>

      <article class="card">
        <h2>Input and Access Controls</h2>
        <ul>
          <li>Validate numeric fields to block malformed or unexpected values.</li>
          <li>Use authentication plus role-based authorization in production environments.</li>
          <li>Enforce update and delete checks on the server side, not only in the UI.</li>
        </ul>
      </article>

      <article class="card">
        <h2>Storage and Transport Security</h2>
        <ul>
          <li>Use HTTPS for every request to reduce interception and tampering risks.</li>
          <li>Encrypt sensitive records at rest in backend storage.</li>
          <li>Do not treat browser local storage as a secure vault for secrets or tokens.</li>
        </ul>
      </article>

      <article class="card">
        <h2>Operational Security</h2>
        <ul>
          <li>Log critical actions (add, update, delete) and monitor unusual activity.</li>
          <li>Patch dependencies regularly and scan for known vulnerabilities.</li>
          <li>Back up inventory data and verify restore procedures on schedule.</li>
        </ul>
      </article>
    </section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
      }

      .card {
        border: 1px solid #d1d5db;
        border-radius: 14px;
        background: #ffffff;
        padding: 1rem;
        box-shadow: 0 14px 24px -28px rgba(0, 0, 0, 0.45);
      }

      h2 {
        color: #0f766e;
      }

      ul {
        margin: 0;
        padding-left: 0;
        list-style: none;
      }

      li {
        margin-bottom: 0.45rem;
        border-left: 3px solid #14b8a6;
        padding-left: 0.55rem;
      }
    `
  ]
})
export class PrivacyComponent {}
