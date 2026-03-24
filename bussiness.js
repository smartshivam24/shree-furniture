// --- 1. Beds ---
const bedsList = [];
const totalBedsInFolder = 56; 
for (let i = 1; i <= totalBedsInFolder; i++) {
    bedsList.push({ name: "Premium Double Bed " + i, image: `Beds/Double Bed  (${i}).jpg` });
}

// --- 2. Center Tables ---
const centerTablesList = [];
const totalCenterTables = 4; 
for (let i = 1; i <= totalCenterTables; i++) {
    centerTablesList.push({ name: "Designer Center Table " + i, image: `Center Tables/Table (${i}).jpg` });
}

// --- 3. Sofa Set ---
const sofasList = [];
const totalSofas = 40; 
for (let i = 1; i <= totalSofas; i++) {
    sofasList.push({ name: "Luxury Sofa Set " + i, image: `Sofa/Sofa Sets (${i}).jpg` });
}

// --- 4. Dining Table ---
const diningTableList = [];
const totalDiningTables = 7;
for (let i = 1; i <= totalDiningTables; i++) {
    diningTableList.push({ name: "Designer Dining Table " + i, image: `Dining Table/Dining (${i}).jpg` });
}

// --- 5. Dressing Table ---
const dressingTableList = [];
const totalDressingTables = 23;
for (let i = 1; i <= totalDressingTables; i++) {
    dressingTableList.push({ name: "Designer Dressing Table " + i, image: `Dressing Table/Dressing (${i}).jpg` });
}

// --- Main Products Data ---
const productsData = {
    'beds': bedsList,
    'center-tables': centerTablesList,
    'sofas': sofasList,
    'dining-tables': diningTableList,
    'dressing-tables': dressingTableList,
};

let cart = [];
let currentCategory = ''; 

// --- Page Switch Function ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// --- Open Category ---
function openCategory(category) {
    currentCategory = category; 
    document.getElementById('category-title').innerText = category.toUpperCase() + " PRODUCTS";

    const searchInput = document.getElementById('search-input');
    if(searchInput) searchInput.value = '';

    renderProducts(productsData[category] || []); 
    showPage('products-page');
}

// --- Render Products ---
function renderProducts(productsList) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    if (productsList.length === 0) {
        container.innerHTML = '<p style="text-align: center; width: 100%; font-size: 1.2rem; color: #e74c3c;">No products found! 😥</p>';
        return;
    }

    productsList.forEach(product => {
        const originalIndex = productsData[currentCategory].findIndex(p => p.name === product.name);
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-content" onclick="viewProduct('${currentCategory}', ${originalIndex})">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                <h3 class="card-title">${product.name}</h3>
            </div>
            <button class="add-to-cart-btn card-btn" onclick="addToCart('${product.name}', '${product.image}'); event.stopPropagation();">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

// --- Search Filter ---
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const allProducts = productsData[currentCategory] || [];
    const filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    renderProducts(filteredProducts);
}

// --- View Product Preview ---
function viewProduct(category, index) {
    const product = productsData[category][index];
    const container = document.getElementById('product-details-container');
    
    container.innerHTML = `
        <div class="preview-box">
            <div class="preview-img-container">
                <img class="preview-img" src="${product.image}" alt="${product.name}">
            </div>
            <div class="preview-details">
                <h2 class="preview-title">${product.name}</h2>
                <hr class="preview-divider">
                <p class="preview-desc">A high-quality, durable furniture piece from Shree Furniture. Perfect for modern homes. Made with premium materials for comfort and style.</p>
                <p class="preview-category">Category: ${category.toUpperCase()}</p>
                <button class="preview-btn" onclick="addToCart('${product.name}', '${product.image}')">Add to Cart 🛒</button>
            </div>
        </div>
    `;
    showPage('product-view-page');
}

// --- Cart Functions ---
function addToCart(productName, productImage) {
    cart.push({ name: productName, image: productImage });
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
    alert(productName + " added to your cart! 🛒");
}

function renderCart() {
    const container = document.getElementById('cart-container');
    container.innerHTML = '';

    if(cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <span class="cart-item-name">${item.name}</span>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        `;
        container.appendChild(div);
    });

    const whatsappBtn = document.createElement('button');
    whatsappBtn.innerText = 'Order on WhatsApp 💬';
    whatsappBtn.className = 'whatsapp-btn'; 
    whatsappBtn.onclick = orderOnWhatsApp;
    container.appendChild(whatsappBtn);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    renderCart();
}

// --- WhatsApp Order ---
function orderOnWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello Shree Furniture, I want to order the following items:\n\n";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`; 
    });

    const phoneNumber = "919696178421"; 
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}