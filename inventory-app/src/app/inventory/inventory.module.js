import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
let InventoryModule = class InventoryModule {
};
InventoryModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, RouterModule],
        exports: [CommonModule, FormsModule, RouterModule]
    })
], InventoryModule);
export { InventoryModule };
