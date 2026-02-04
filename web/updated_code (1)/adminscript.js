document.addEventListener("DOMContentLoaded", async function () {
    console.log("Initializing Firebase...");

    const response = await fetch("env.json");
    const env = await response.json();

    const firebaseConfig = {
        apiKey: env.FIREBASE_API_KEY,
        authDomain: env.FIREBASE_AUTH_DOMAIN,
        projectId: env.FIREBASE_PROJECT_ID,
        storageBucket: env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
        appId: env.FIREBASE_APP_ID
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(user => {
        if (!user) {
            alert("You must be logged in to access the admin panel.");
            window.location.href = "index.html";
        }
    });

    // Logout
    window.logout = function () {
        auth.signOut().then(() => {
            window.location.href = "index.html";
        });
    };

    // Add Product
    document.getElementById('productForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('productTitle').value;
        const description = document.getElementById('productDescription').value;
        const price = document.getElementById('productPrice').value;
        const discount = document.getElementById('productDiscount').value;
        const stock = document.getElementById('productStock').value;
        const category = document.getElementById('productCategory').value;

        await db.collection("products").add({
            title, description, price, discount, stock, category, date: new Date().toISOString()
        });

        alert("✅ Product added successfully!");
        document.getElementById('productForm').reset();
        loadProducts();
    });

    // Load Products
    async function loadProducts() {
        const productsTable = document.getElementById('productsTable');
        productsTable.innerHTML = "";

        const snapshot = await db.collection("products").get();
        snapshot.forEach(doc => {
            const product = doc.data();
            const docId = doc.id;
            const stockBadge = product.stock === "Available" ? "✅ In Stock" : "❌ Out of Stock";

            productsTable.innerHTML += `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>${product.discount ? product.discount + "%" : "N/A"}</td>
                    <td>${stockBadge}</td>
                    <td><button onclick="editProduct('${docId}')">✏️ Edit</button></td>
                    <td><button onclick="deleteProduct('${docId}')">🗑 Delete</button></td>
                </tr>
            `;
        });
    }

    // Delete Product
    window.deleteProduct = async function (id) {
        if (confirm("Are you sure you want to delete this product?")) {
            await db.collection("products").doc(id).delete();
            alert("✅ Product deleted!");
            loadProducts();
        }
    };

    // Edit Product
    window.editProduct = async function (id) {
        const newTitle = prompt("Enter new product title:");
        if (newTitle) {
            await db.collection("products").doc(id).update({ title: newTitle });
            alert("✅ Product updated!");
            loadProducts();
        }
    };

    loadProducts();
});
function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Ensure "Existing Products" is shown by default
document.addEventListener("DOMContentLoaded", () => {
    showSection('existingProducts');
});

