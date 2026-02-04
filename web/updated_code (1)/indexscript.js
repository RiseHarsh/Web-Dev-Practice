window.onload = function() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productContainer = document.getElementById('product-container');
    const salesBanner = document.getElementById('sales-banner');

    function displayProducts(filteredProducts) {
        productContainer.innerHTML = '';
        filteredProducts.forEach(product => {
            const productHTML = `
                <div class="card">
                    <img src="${product.imageUrls[0]}" loading="lazy" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p>₹${product.price} (${product.discount}% off)</p>
                        <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });
    }

    displayProducts(products);

    // Show/Hide Sales Banner
    if (localStorage.getItem('salesBannerEnabled') === 'true') {
        salesBanner.style.display = 'block';
    }
};
document.addEventListener("DOMContentLoaded", function () {
    let logo = document.getElementById("admin-logo");
    let clickCount = 0;
    let timer;

    logo.addEventListener("dblclick", function () {
        window.location.href = "login.html"; // Admin login page
    });
});
