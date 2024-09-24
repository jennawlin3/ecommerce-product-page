const d = document;

// Menu
const $menuIcon = d.querySelector(".menu-icon");
const $mobileNav = d.querySelector(".mobile-nav");
const $overlay = d.querySelector(".overlay");
const $closeIcon = d.querySelector(".close-icon");

$menuIcon.addEventListener("click", (e) => {
  $mobileNav.classList.remove("hide");
  $overlay.classList.remove("hide");
});

$closeIcon.addEventListener("click", (e) => {
  $mobileNav.classList.add("hide");
  $overlay.classList.add("hide");
})

// Slider mobile

const $sliderMobile = d.querySelector(".slider-wrapper_mobile");
const $prevBtnMobile = d.querySelectorAll(".slide-mobile .prev-btn");
const $nextBtnMobile = d.querySelectorAll(".slide-mobile .next-btn");
console.log($nextBtnMobile);
console.log($sliderMobile);
let count = -1;

$nextBtnMobile.forEach(btn => {
  btn.addEventListener("click", (e) => {
    if(e) {
          if(count === -4) {
            count = -1;
            $sliderMobile.style.transform = `translateX(${0*25}%)`;
            return;            
          }
          $sliderMobile.style.transform = `translateX(${count*25}%)`;
          count--;
    }
  })
})

$prevBtnMobile.forEach(btn => {
  btn.addEventListener("click", (e) => {
    if(e) {
          if(count === -1) {
            count = -4;
            $sliderMobile.style.transform = `translateX(${0*25}%)`;
            return;            
          }
          count++;
          $sliderMobile.style.transform = `translateX(${count*25}%)`;
    }
  })
})

// Cart 
let cart = {};

// Cart box
const $cartIcon = d.querySelector(".cart-icon");
const $cart = d.querySelector(".cart");

$cartIcon.addEventListener("click", (e) => {
  $cart.classList.toggle("hide");
});

//Cart functionality
const $moreBtn = d.querySelector(".more-btn");
const $removeBtn = d.querySelector(".remove-btn");
const $itemProductCount = d.querySelector(".item-product_count");
const $productTitle = d.querySelector(".product-title").textContent;
const $productPrice = d.querySelector(".product-price").textContent;
const $addToCart = d.querySelector(".add-to_cart__btn");
const $cartItems = d.querySelector(".cart-items");
const $checkoutBtn = d.querySelector(".checkout-btn");
const $emptyInfo = d.querySelector(".empty");

let itemCount = 0;
let cartCount = 0;
let cartItemCount = 0;
let productItem = {};

$moreBtn.addEventListener("click", (e) => {
  itemCount++;
  $itemProductCount.textContent = itemCount;
  let total = parseFloat($productPrice) * itemCount;

  productItem = {
    title: $productTitle,
    items: itemCount,
    price: parseFloat($productPrice),
    total:  total
    }
  } 
);

console.log($removeBtn);

$removeBtn.addEventListener("click", (e) => {
  if(itemCount === 0) {
    return;
  } else {
  itemCount--;
  $itemProductCount.textContent = itemCount;
  let total = parseFloat($productPrice) * itemCount;

  productItem = {
    title: $productTitle,
    items: itemCount,
    price: parseFloat($productPrice),
    total:  total
    } 
  }
  } 
);

$addToCart.addEventListener("click", (e) => {
  if(itemCount === 0) {
    return;
  }

  cartCount++;
  productItem.sku = cartCount;

  updateCart(productItem);
  localStorage.setItem(cartCount, JSON.stringify(productItem));
  //console.log(localStorage);
  //console.log(cartCount);
});

function updateCart(productItem) {
  $emptyInfo.classList.add("hide");

    const cartItem = d.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-cart", cartCount);
    const productInfoContainerCart = d.createElement("div");
    productInfoContainerCart.classList.add("product-info_container__cart");
    const productPic = d.createElement("img");
    productPic.src = "./images/image-product-1-thumbnail.jpg";
    productPic.alt = productItem.title;
    productPic.classList.add("product-pic_cart");
    const productInfoCart = d.createElement("div");
    productInfoCart.classList.add("product-info_cart");
    const productTitleCart = d.createElement("p");
    productTitleCart.classList.add("product-title_cart")
    productTitleCart.textContent = productItem.title;
    const productPricesCart = d.createElement("div");
    productPricesCart.classList.add("product-prices_cart");
    const individualPriceContainer = d.createElement("p");
    individualPriceContainer.classList.add("individual-price_container__cart");
    individualPriceContainer.textContent = "$";
    const individualPriceCart = d.createElement("span");
    individualPriceCart.classList.add("individual-price__cart");
    individualPriceCart.textContent = productItem.price;
    const productCountContainerCart = d.createElement("p");
    productCountContainerCart.classList.add("product-count_container__cart");
    productCountContainerCart.textContent = "x";
    const itemCountCart = d.createElement("span");
    itemCountCart.classList.add("item-count__cart");
    itemCountCart.textContent = productItem.items;
    const totalPriceContainer = d.createElement("p");
    totalPriceContainer.classList.add("total-price_container");
    totalPriceContainer.textContent = "$";
    const total = d.createElement("span");
    total.classList.add("total");
    total.textContent = productItem.total;
    const deleteBtn = d.createElement("img");
    deleteBtn.src = "./images/icon-delete.svg";
    deleteBtn.alt = "Delete icon";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("data-cart", cartCount);

    individualPriceContainer.appendChild(individualPriceCart);
    productCountContainerCart.appendChild(itemCountCart);
    totalPriceContainer.appendChild(total);

    productInfoCart.appendChild(productTitleCart);
    productPricesCart.appendChild(individualPriceContainer);
    productPricesCart.appendChild(productCountContainerCart);
    productPricesCart.appendChild(totalPriceContainer);

    productInfoCart.appendChild(productTitleCart);
    productInfoCart.appendChild(productPricesCart);

    productInfoContainerCart.appendChild(productPic);
    productInfoContainerCart.appendChild(productInfoCart);
    productInfoContainerCart.appendChild(deleteBtn);

    cartItem.appendChild(productInfoContainerCart);

  $cartItems.appendChild(cartItem);
  console.log(cartCount); 
  cartFunctionality();
  return; 
}

//Delete Product 

function cartFunctionality() {
  const $deleteBtn = d.querySelectorAll(".delete-btn");

  $deleteBtn.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    if(e) {
    let idItem = e.target.getAttribute("data-cart");
      deleteProduct(idItem);
      console.log(idItem);
      return;
      }
    })    
  })
}

function deleteProduct(idItem) {
  const $cartItem = d.querySelectorAll(".cart-item");
  cartItemCount = $cartItem.length;

  $cartItem.forEach((item, i) => {
    console.log(item.getAttribute("data-cart"));
    if(item.getAttribute("data-cart") === idItem) {
      console.log(item);
      item.classList.add("hide");
      $cartItems.removeChild($cartItem[i]);
      cartItemCount--;
      localStorage.removeItem(idItem);
      console.log(cartItemCount);
      console.log(localStorage);
     } else {
      return;
    }
  });

  if(cartItemCount === 0) {
    $emptyInfo.classList.remove("hide");
  }
  return; 
}

//localStorage.clear();


/*
            <div class="cart-item">

            </div>
             */