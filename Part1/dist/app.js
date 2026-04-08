import { InventoryService } from './inventory.service.js';
const inventoryService = new InventoryService();
const itemList = document.getElementById('itemList');
const addForm = document.getElementById('addItemForm');
const searchInput = document.getElementById('searchInput');
const showAllBtn = document.getElementById('showAllBtn');
const showPopularBtn = document.getElementById('showPopularBtn');
function renderItems(items) {
    itemList.innerHTML = '';
    if (items.length === 0) {
        itemList.innerHTML = '<p style="text-align:center;">No items found</p>';
        return;
    }
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
      <h3>${item.itemName}</h3>
      <p><strong>ID:</strong> ${item.itemId}</p>
      <p><strong>Category:</strong> ${item.category}</p>
      <p><strong>Qty:</strong> ${item.quantity}</p>
      <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
      <p><strong>Supplier:</strong> ${item.supplierName}</p>
      <p class="status" style="color: ${item.stockStatus === 'In Stock' ? 'green' : item.stockStatus === 'Low Stock' ? 'orange' : 'red'}">
        ${item.stockStatus}
      </p>
      <p><strong>Popular:</strong> ${item.isPopular ? 'Yes' : 'No'}</p>
      ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p>` : ''}
      <div class="actions">
        <button class="delete-btn" data-name="${item.itemName}">Delete</button>
      </div>
    `;
        itemList.appendChild(card);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            if (confirm(`Delete ${name}?`)) {
                inventoryService.deleteItem(name);
                renderItems(inventoryService.getAllItems());
            }
        });
    });
}
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
        itemId: document.getElementById('itemId').value,
        itemName: document.getElementById('itemName').value,
        category: document.getElementById('category').value,
        quantity: Number(document.getElementById('quantity').value),
        price: Number(document.getElementById('price').value),
        supplierName: document.getElementById('supplierName').value,
        isPopular: document.getElementById('isPopular').checked,
        comment: document.getElementById('comment').value,
        stockStatus: 'In Stock'
    };
    const success = inventoryService.addItem(item);
    if (success) {
        alert('Item added successfully!');
        addForm.reset();
        renderItems(inventoryService.getAllItems());
    }
    else {
        alert('Item ID already exists!');
    }
});
searchInput.addEventListener('input', () => {
    renderItems(inventoryService.searchItems(searchInput.value));
});
showAllBtn.addEventListener('click', () => {
    renderItems(inventoryService.getAllItems());
});
showPopularBtn.addEventListener('click', () => {
    renderItems(inventoryService.getPopularItems());
});
renderItems(inventoryService.getAllItems());
