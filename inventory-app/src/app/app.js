import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InventoryModule } from './inventory/inventory.module';
let App = class App {
    title = 'Inventory Hub';
};
App = __decorate([
    Component({
        selector: 'app-root',
        imports: [RouterOutlet, RouterLink, RouterLinkActive, InventoryModule],
        templateUrl: './app.html',
        styleUrl: './app.css'
    })
], App);
export { App };
