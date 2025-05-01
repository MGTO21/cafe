let cart = [];

// Fetch products from a public API and display them dynamically
async function fetchProducts() {
    const productsGrid = document.querySelector(".products-grid");
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="details">
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <p class="price">${product.price} $</p>
                    <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">أضف إلى السلة</button>
                </div>
            `;

            productsGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productsGrid.innerHTML = "<p>حدث خطأ أثناء تحميل المنتجات. حاول مرة أخرى لاحقًا.</p>";
    }
}

// Add product to the cart
function addToCart(id, title, price, image) {
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartContainer = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <h4>${item.title}</h4>
                <p>${item.price} $ × ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">إزالة</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `المجموع: ${total.toFixed(2)} $`;
}

// Remove product from the cart
function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCartUI();
}

// Call the function to fetch and display products
if (document.querySelector(".products-grid")) {
    fetchProducts();
}

// Add scroll animation for sections
document.addEventListener("scroll", () => {
    const elements = document.querySelectorAll("[data-scroll]");
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});
