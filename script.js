document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Part 2: Dynamic Menu Generation on the Main Page ---
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer && typeof products !== 'undefined') {
        const categories = products.reduce((acc, product) => {
            (acc[product.category] = acc[product.category] || []).push(product);
            return acc;
        }, {});

        for (const category in categories) {
            const section = document.createElement('div');
            section.className = 'mb-12';

            const title = document.createElement('h3');
            title.className = 'text-2xl font-display mb-6 border-b-2 border-[#D92323] pb-2';
            title.textContent = category;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
            
            categories[category].forEach(product => {
                // IMPORTANT: The menu items are now links to the product page
                grid.innerHTML += `
                    <a href="product.html?id=${product.id}" class="menu-card group">
                        <img src="${product.imageSrc}" alt="${product.name}" class="w-full h-48 object-cover">
                        <div class="p-5 flex-grow flex flex-col">
                            <h4 class="font-display text-xl mb-2 group-hover:text-[#D92323] transition-colors">${product.name}</h4>
                            <p class="text-gray-600 mb-4 text-sm flex-grow">${product.shortDescription}</p>
                            <p class="font-bold text-lg text-[#D92323] mt-auto">£${product.price}</p>
                        </div>
                    </a>
                `;
            });
            section.appendChild(grid);
            menuContainer.appendChild(section);
        }
    }

    // --- Part 3: Dynamic Product Detail Page Generation ---
    const productDetailContainer = document.getElementById('product-detail-container');
    if (productDetailContainer && typeof products !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        const product = products.find(p => p.id === productId);

        if (product) {
            // Update the page title
            document.title = `${product.name} | Seoul Kebab`;

            // Populate the product detail container
            productDetailContainer.innerHTML = `
                <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div>
                        <img src="${product.imageSrc}" alt="${product.name}" class="w-full rounded-lg shadow-lg">
                    </div>
                    <div>
                        <h1 class="font-display text-3xl md:text-4xl mb-2">${product.name}</h1>
                        <p class="font-bold text-2xl text-[#D92323] mb-4">£${product.price}</p>
                        <p class="text-gray-700 mb-6">${product.longDescription}</p>
                        
                        <div class="border-t pt-4">
                            <h3 class="font-display text-lg mb-2">Details</h3>
                            <p class="text-sm text-gray-600"><strong>Calories:</strong> ${product.calories}</p>
                            <p class="text-sm text-gray-600"><strong>Allergens:</strong> ${product.allergens.join(', ')}</p>
                        </div>
                         <button class="mt-6 w-full bg-[#D92323] text-white font-bold py-3 px-5 rounded-full hover:bg-red-700 transition duration-300">
                            Add to Order
                        </button>
                    </div>
                </div>
            `;
        } else {
            productDetailContainer.innerHTML = '<p class="text-center text-red-500">Sorry, this product could not be found. Please return to the menu.</p>';
        }
    }
});