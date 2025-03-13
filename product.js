// product.js

document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  loadNewArrival();
});

const productForm = document.getElementById("product-form");
const productTable = document.getElementById("product-table");
const newArrivalList = document.getElementById("newArrivalList");

if (productForm) {
  productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveProduct();
  });
}

function saveProduct() {
  let id = document.getElementById("product-id").value;
  let name = document.getElementById("product-name").value;
  let price = document.getElementById("product-price").value;
  let imgInput = document.getElementById("product-img");

  if (!name || !price) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
    return;
  }

  let imgSrc = "";
  if (imgInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgSrc = e.target.result;
      saveToLocalStorage(id, name, price, imgSrc);
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    saveToLocalStorage(id, name, price, imgSrc);
  }
}

function saveToLocalStorage(id, name, price, imgSrc) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (id) {
    let index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      imgSrc = imgSrc || products[index].imgSrc;
      products[index] = { id, name, price, imgSrc };
    } else {
      products.push({ id: Date.now().toString(), name, price, imgSrc });
    }
  } else {
    products.push({ id: Date.now().toString(), name, price, imgSrc });
  }

  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  loadNewArrival();
  if (productForm) productForm.reset();
}

function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  if (!productTable) return;

  productTable.innerHTML = "";
  products.forEach((product) => {
    let row = `<tr>
              <td><img src="${product.imgSrc}" width="50"></td>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price} VND</td>
              <td>
                  <button onclick="editProduct('${product.id}')" class="btn btn-warning btn-sm">Sửa</button>
                  <button onclick="deleteProduct('${product.id}')" class="btn btn-danger btn-sm">Xóa</button>
              </td>
          </tr>`;
    productTable.innerHTML += row;
  });
}

function editProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let product = products.find((p) => p.id === id);
  if (product) {
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
  }
}

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((p) => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  loadNewArrival();
}

function loadNewArrival() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let newArrivalList = document.getElementById("newArrivalList");

  if (!newArrivalList) return;

  newArrivalList.innerHTML = "";

  products.slice(-4).forEach((product) => {
    let productCard = `
        <div class="col-md-6 col-lg-4 col-xl-3 p-2">
            <div class="collection-img position-relative overflow-hidden">
                <img src="${product.imgSrc}" class="w-100">
            </div>
            <div class="text-center">
                <p class="text-capitalize my-1">${product.name}</p>
                <span class="fw-bold">${product.price} VND</span>
            </div>
        </div>`;
    newArrivalList.innerHTML += productCard;
  });
}

// cart

document
  .getElementById("addToCartButton")
  .addEventListener("click", function () {
    let quantity = parseInt(document.getElementById("quantity").value) || 1;
    const product = {
      id: "FS2401228DIWOBK",
      name: "Đầm tơ trắng cuốn hoa xèo",
      price: 2498000,
      image: "../img/anh1.jpg",
      quantity: quantity, // Lấy số lượng từ input
    };
    addToCart(product);
  });

// Quản lý giỏ hàng

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += product.quantity; // Cộng dồn số lượng thay vì chỉ tăng 1
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector(".bi-cart + span");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

document.addEventListener("DOMContentLoaded", updateCartCount);

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsElement.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsElement.innerHTML =
      "<p class='text-center text-secondary'>Giỏ hàng trống</p>";
    totalPriceElement.textContent = "0 VND";
    return;
  }

  cart.forEach((product, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add(
      "cart-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "py-2"
    );

    itemElement.innerHTML = `
          <img src="${product.image}" alt="${product.name}" width="50">
          <div>
              <p class="mb-0">${product.name}</p>
              <small>${product.price.toLocaleString()} VND</small>
          </div>
          <div>
              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
              <span class="mx-2">${product.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
              <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Xóa</button>
          </div>
        `;

    cartItemsElement.appendChild(itemElement);
    totalPrice += product.price * product.quantity;
  });

  totalPriceElement.textContent = totalPrice.toLocaleString() + " VND";
}

function updateQuantity(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity + change >= 1) {
    cart[index].quantity += change;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCart();
});

// search

function searchProduct() {
  let input = document.getElementById("searchInput").value.trim().toLowerCase();
  let products = document.querySelectorAll(
    ".collection-list .col-md-6, .collection-list .col-lg-4, .collection-list .col-xl-3"
  );

  products.forEach((product) => {
    let productNameElement = product.querySelector(".text-capitalize");

    if (productNameElement) {
      let productName = productNameElement.textContent.trim().toLowerCase();

      if (productName.startsWith(input) || input === "") {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  });
}
