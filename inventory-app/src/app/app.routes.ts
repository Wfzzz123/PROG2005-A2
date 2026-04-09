import { Routes } from '@angular/router';
import { HelpComponent } from './pages/help.component';
import { HomeComponent } from './pages/home.component';
import { InventoryManagementComponent } from './pages/inventory-management.component';
import { PrivacyComponent } from './pages/privacy.component';
import { SearchComponent } from './pages/search.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Inventory Hub | Home' },
	{ path: 'inventory', component: InventoryManagementComponent, title: 'Inventory Hub | Manage Items' },
	{ path: 'search', component: SearchComponent, title: 'Inventory Hub | Search' },
	{ path: 'privacy-security', component: PrivacyComponent, title: 'Inventory Hub | Privacy & Security' },
	{ path: 'help', component: HelpComponent, title: 'Inventory Hub | Help' },
	{ path: '**', redirectTo: '' }
];
