const d = document;

// Slider buttons hover
const $nextBtns = d.querySelectorAll(".next-btn img");
const $prevBtns = d.querySelectorAll(".prev-btn img");

console.log($prevBtns);

$nextBtns.forEach((btn,i) => {
  btn.addEventListener("mousemove", (e) => {
    $nextBtns[i].src = "./images/icon-next_hover.svg";
  })
});

$nextBtns.forEach((btn,i) => {
  btn.addEventListener("mouseout", (e) => {
    $nextBtns[i].src = "./images/icon-next.svg";
  })
});

$prevBtns.forEach((btn,i) => {
  btn.addEventListener("mousemove", (e) => {
    $prevBtns[i].src = "./images/icon-previous_hover.svg";
  })
});

$prevBtns.forEach((btn,i) => {
  btn.addEventListener("mouseout", (e) => {
    $prevBtns[i].src = "./images/icon-previous.svg";
  })
});

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
    if(e.currentTarget) {
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
    if(e.currentTarget) {
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

$cartIcon.addEventListener("mouseover", (e) => {
  $cartIcon.src = "./images/icon-cart_hover.svg";
});

$cartIcon.addEventListener("mouseout", (e) => {
  $cartIcon.src = "./images/icon-cart.svg";
});

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
const $addToCartIcon = d.querySelector(".add-to_cart__btn img");
const $cartItems = d.querySelector(".cart-items");
const $checkoutBtn = d.querySelector(".checkout-btn");
const $emptyInfo = d.querySelector(".empty");
const $productNumber = d.querySelector(".product-number");

let itemCount = 0;
let cartCount = 0;
let cartItemCount = 0;
let productItem = {};
let sku = 0;

$moreBtn.addEventListener("mouseover", (e) => {
  $moreBtn.src = "./images/icon-plus_hover.svg";
});

$moreBtn.addEventListener("mouseout", (e) => {
  $moreBtn.src = "./images/icon-plus.svg";
});

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

$removeBtn.addEventListener("mouseover", (e) => {
  $removeBtn.src = "./images/icon-minus_hover.svg";
});

$removeBtn.addEventListener("mouseout", (e) => {
  $removeBtn.src = "./images/icon-minus.svg";
});

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

$addToCart.addEventListener("mousemove", (e) => {
    $addToCartIcon.src = "./images/icon-cart_hover.svg";
});

$addToCart.addEventListener("mouseout", (e) => {
    $addToCartIcon.src = "./images/icon-cart.svg";
});


$addToCart.addEventListener("click", (e) => {
  if(itemCount === 0) {
    return;
  }

  //cartCount++;
  productItem.sku = sku;

  updateCart(productItem);
  localStorage.setItem(cartCount, JSON.stringify(productItem));
});

function updateCart(productItem) {
  const $cartItems = d.querySelector(".cart-items");
  $cartItems.innerHTML = "";

    const cartItem = d.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-cart", productItem.sku);
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
    deleteBtn.setAttribute("data-cart", productItem.sku);

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
  $checkoutBtn.classList.remove("hide");

  //console.log(cartCount);

  cartFunctionality();
  return; 
}

//Add event to delete icon in Cart

function cartFunctionality() {
  const $deleteBtn = d.querySelectorAll(".delete-btn");
  const $cartItem = d.querySelectorAll(".cart-item");
  
  $productNumber.classList.remove("hide");
  $productNumber.textContent = $cartItem.length;

  $deleteBtn.forEach((btn, i) => {
  btn.addEventListener("click", (e) => {
    if(e) {
    let idItem = e.target.getAttribute("data-cart");
      deleteProduct(idItem);
      console.log(idItem);
      return;
      }
    })  
  
  btn.addEventListener("mouseover", (e) => {
    if(e) {
      btn.src = "./images/icon-delete_hover.svg"
      }
    });
    
    btn.addEventListener("mouseout", (e) => {
      if(e) {
      btn.src = "./images/icon-delete.svg"
        }
      })    
  }); 
}

// Delete products

function deleteProduct(idItem) {
  const $cartItem = d.querySelectorAll(".cart-item");
  cartItemCount = $cartItem.length;
  $productNumber.textContent = $cartItem.length;

  $cartItem.forEach((item, i) => {
    //console.log(item.getAttribute("data-cart"));
    if(item.getAttribute("data-cart") === idItem) {
      console.log(item);
      item.classList.add("hide");
      $cartItems.removeChild(item);
      cartItemCount--;
      localStorage.removeItem(idItem);
      //console.log(cartItemCount);
      //console.log(localStorage);
      return;
     } else {
      return;
    }
  });

  console.log(cartItemCount);
  if(cartItemCount === 0) {
    const $emptyInfo = document.createElement("p");
    $emptyInfo.classList.add("empty");
    $emptyInfo.textContent = "Your cart is empty";

    $cartItems.appendChild($emptyInfo);
    $checkoutBtn.classList.add("hide");  
    $productNumber.classList.add("hide");
  }
  return; 
}

// Gallery - DESKTOP

const $galleryPicturesDesktop = d.querySelectorAll(".gallery-pictures .picture");
const $productActualPicture = d.querySelector(".product-actual_picture");
const $picGallery = d.querySelectorAll(".gallery-pictures .picture");
const $picThumbnail = d.querySelectorAll(".gallery-pic");

//Modal
const $galleryDesktopModal = d.querySelector(".gallery-desktop_modal");

const $slideDesktop = d.querySelectorAll(".slide-desktop");
const $prevBtnDesktop = d.querySelectorAll(".slide-desktop .prev-btn");
const $nextBtnDesktop = d.querySelectorAll(".slide-desktop .next-btn");
const $galleryPicturesModal = d.querySelectorAll(".gallery-pictures_modal .picture");
const $galleryPictures = d.querySelectorAll(".gallery-pic_modal");
const $closeBtnModal = d.querySelector(".close-btn_modal");

let countDesktop = 1;

$picGallery.forEach((picture, i) => {
  picture.addEventListener("click", (e) => {
    if(e) {
      for(let i = 0; i < $galleryPicturesModal.length; i++) {

        $galleryPicturesModal[i].classList.remove("actual");
        $slideDesktop[i].classList.add("hide");
        $galleryPictures[i].classList.remove("actual");
        $picGallery[i].classList.remove("actual");
        $galleryPicturesDesktop[i].classList.remove("actual");
        $picThumbnail[i].classList.remove("actual");          
      }

      countDesktop = i;
      $galleryPicturesModal[countDesktop].classList.add("actual");
      $slideDesktop[countDesktop].classList.remove("hide");
      $galleryPictures[countDesktop].classList.add("actual");
      $picGallery[countDesktop].classList.add("actual");
      $galleryPicturesDesktop[countDesktop].classList.add("actual");
      $picThumbnail[countDesktop].classList.add("actual");

      $productActualPicture.src = `./images/image-product-${countDesktop+1}.jpg`
      countDesktop++;
    }
    $galleryDesktopModal.classList.remove("hide");
    $overlay.classList.remove("hide");
  })
});

$nextBtnDesktop.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if(e) {

        for(let i = 0; i < $galleryPicturesModal.length; i++) {
          $galleryPicturesModal[i].classList.remove("actual");
          $slideDesktop[i].classList.add("hide");
          $galleryPictures[i].classList.remove("actual");
          $picGallery[i].classList.remove("actual");
          $galleryPicturesDesktop[i].classList.remove("actual");
          $picThumbnail[i].classList.remove("actual");           
        }

      if(countDesktop === 4) {
        $galleryPicturesModal[0].classList.add("actual");
        $slideDesktop[0].classList.remove("hide");
        $galleryPictures[0].classList.add("actual");
        $picGallery[0].classList.add("actual");
        $galleryPicturesDesktop[0].classList.add("actual");
        $picThumbnail[0].classList.add("actual");   

        countDesktop = 1; 
        $productActualPicture.src = `./images/image-product-1.jpg`;
        return;  
      }

      $galleryPicturesModal[countDesktop].classList.add("actual");
      $slideDesktop[countDesktop].classList.remove("hide");
      $galleryPictures[countDesktop].classList.add("actual");
      $picGallery[countDesktop].classList.add("actual");
      $galleryPicturesDesktop[countDesktop].classList.add("actual");
      $picThumbnail[countDesktop].classList.add("actual");

      $productActualPicture.src = `./images/image-product-${countDesktop+1}.jpg`   
      countDesktop++; 
    }
  })
})

$prevBtnDesktop.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if(e) {

        for(let i = 0; i < $galleryPicturesModal.length; i++) {

          $galleryPicturesModal[i].classList.remove("actual");
          $slideDesktop[i].classList.add("hide");
          $galleryPictures[i].classList.remove("actual");
          $picGallery[i].classList.remove("actual");
          $galleryPicturesDesktop[i].classList.remove("actual");
          $picThumbnail[i].classList.remove("actual");             
        }

      if(countDesktop === 0) {
        $galleryPicturesModal[3].classList.add("actual");
        $slideDesktop[3].classList.remove("hide");
        $galleryPictures[3].classList.add("actual");
        $picGallery[3].classList.add("actual");
        $galleryPicturesDesktop[3].classList.add("actual");
        $picThumbnail[3].classList.add("actual");

        countDesktop = 3; 
        $productActualPicture.src = `./images/image-product-${countDesktop+1}.jpg`
        return;  
      }
      
      countDesktop--;
      $galleryPicturesModal[countDesktop].classList.add("actual");
      $slideDesktop[countDesktop].classList.remove("hide");
      $galleryPictures[countDesktop].classList.add("actual");
      $picGallery[countDesktop].classList.add("actual");
      $galleryPicturesDesktop[countDesktop].classList.add("actual");
      $picThumbnail[countDesktop].classList.add("actual");   

      $productActualPicture.src = `./images/image-product-${countDesktop+1}.jpg`    
    }
  })
})

// Close Modal 
$closeBtnModal.addEventListener("click", (e) => {
  $galleryDesktopModal.classList.add("hide");
  $overlay.classList.add("hide");
})

$closeBtnModal.addEventListener("mousemove", (e) => {
  $closeBtnModal.src = "./images/icon-close_hover.svg";
})

$closeBtnModal.addEventListener("mouseout", (e) => {
  $closeBtnModal.src = "./images/icon-close.svg";
})



// Load Cart

function loadCart() {
  const data = {...localStorage};
  const products = Object.entries(data);

  if(products.length === 0) {
    return;
  } else {
    products.forEach(product => {
    let productInfo = JSON.parse(product[1]);
    cartCount = productInfo.sku;
    cartCount++;

    updateCart(productInfo);
  })

  }
}

d.addEventListener("DOMContentLoaded", loadCart);
