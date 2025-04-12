document.addEventListener("DOMContentLoaded", function() {
    loadInventory();
});

// Fungsi untuk menambahkan barang
function addItem() {
    let itemName = document.getElementById("itemName").value;
    let itemStock = document.getElementById("itemStock").value;
    let itemPrice = document.getElementById("itemPrice").value;

    if (itemName === "" || itemStock === "" || itemPrice === "") {
        alert("Mohon isi semua kolom!");
        return;
    }

    let newItem = {
        name: itemName,
        stock: parseInt(itemStock),
        price: parseFloat(itemPrice)
    };

    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push(newItem);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    document.getElementById("itemName").value = "";
    document.getElementById("itemStock").value = "";
    document.getElementById("itemPrice").value = "";

    loadInventory();
}

// Fungsi untuk memuat daftar persediaan dari localStorage
function loadInventory() {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    let table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.stock}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>
                <button onclick="sellItem(${index})">Jual</button>
                <button onclick="deleteItem(${index})">Hapus</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

// Fungsi untuk menjual barang (mengurangi stok)
function sellItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    if (inventory[index].stock > 0) {
        inventory[index].stock -= 1;
    } else {
        alert("Stok habis!");
    }
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}

// Fungsi untuk menghapus barang dari daftar
function deleteItem(index) {
    let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    loadInventory();
}
