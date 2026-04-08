export class InventoryService {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        const exists = this.items.some(i => i.itemId === item.itemId);
        if (exists)
            return false;
        item.stockStatus = this.calculateStockStatus(item.quantity);
        this.items.push(item);
        return true;
    }
    deleteItem(name) {
        const originalLength = this.items.length;
        this.items = this.items.filter(i => i.itemName.toLowerCase() !== name.toLowerCase());
        return this.items.length < originalLength;
    }
    searchItems(query) {
        const lowerQuery = query.toLowerCase();
        return this.items.filter(i => i.itemName.toLowerCase().includes(lowerQuery));
    }
    getAllItems() {
        return [...this.items];
    }
    getPopularItems() {
        return this.items.filter(i => i.isPopular);
    }
    calculateStockStatus(qty) {
        if (qty === 0)
            return 'Out of Stock';
        if (qty <= 5)
            return 'Low Stock';
        return 'In Stock';
    }
}
