document.addEventListener('DOMContentLoaded', () => {
    loadItems();

    // Add Item Form Submission
    document.getElementById('add-item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('item-name').value;
        const category = document.getElementById('item-category').value;
        const stock = document.getElementById('item-stock').value;
        const price = document.getElementById('item-price').value;

        fetch('add_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${name}&category=${category}&stock=${stock}&price=${price}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadItems();
                document.getElementById('add-item-form').reset();
            } else {
                alert('Failed to add item');
            }
        });
    });
});

function loadItems() {
    fetch('get_items.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('items-table-body');
            tableBody.innerHTML = '';

            let totalItems = data.length;
            let inStock = data.filter(item => item.stock > 0).length;
            let outOfStock = totalItems - inStock;

            document.getElementById('total-items').textContent = totalItems;
            document.getElementById('in-stock').textContent = inStock;
            document.getElementById('out-of-stock').textContent = outOfStock;

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.stock}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="edit" onclick="editItem(${item.id})">Edit</button>
                        <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function editItem(id) {
    const name = prompt('Enter new item name:');
    const category = prompt('Enter new category:');
    const stock = prompt('Enter new stock:');
    const price = prompt('Enter new price:');

    if (name && category && stock && price) {
        fetch('edit_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${id}&name=${name}&category=${category}&stock=${stock}&price=${price}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadItems();
            } else {
                alert('Failed to edit item');
            }
        });
    }
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch('delete_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${id}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadItems();
            } else {
                alert('Failed to delete item');
            }
        });
    }
}