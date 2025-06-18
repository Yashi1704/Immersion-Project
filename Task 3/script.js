let allProducts = [];

window.onload = fetchProducts;

// Fetch products on page load
async function fetchProducts() {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    allProducts = data.products;
    displayProducts(allProducts);
  } catch (error) {
    document.getElementById('error').textContent = "Failed to load products.";
  }
}

// Display products
function displayProducts(products) {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  if (products.length === 0) {
    list.innerHTML = '<p style="text-align:center;">No products found.</p>';
    return;
  }

  products.forEach(product => {
    list.innerHTML += `
      <div class="product">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Price:</strong> $${product.price}</p>
      </div>
    `;
  });
}

// Search products
function searchProducts() {
  const input = document.getElementById('searchInput').value.trim();
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';

  if (!input) {
    errorDiv.textContent = "Please enter a valid product name.";
    return;
  }

  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(input.toLowerCase()) ||
    product.brand.toLowerCase().includes(input.toLowerCase())
  );

  displayProducts(filtered);
  document.getElementById('sortSelect').value = "";
}

// Sort products
function sortProducts() {
  const sortOrder = document.getElementById('sortSelect').value;

  let displayedProducts = document.querySelectorAll(".product").length === allProducts.length
    ? [...allProducts]
    : [...document.querySelectorAll(".product")].map(el => {
        const title = el.querySelector("h3").textContent;
        return allProducts.find(p => p.title === title);
      });

  if (sortOrder === 'asc') {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(displayedProducts);
}
