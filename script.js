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
                // --- CARD STRUCTURE UPDATED ---
                grid.innerHTML += `
                    <div class="menu-card flex flex-col relative">
                        
                        <a href="#" class="favorite-btn absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-transform hover:scale-110" aria-label="Add ${product.name} to favorites">
                             <svg class="w-6 h-6 text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </a>

                        <a href="product.html?id=${product.id}" class="group flex-grow flex flex-col">
                            <img src="${product.imageSrc}" alt="${product.name}" class="w-full h-48 object-cover">
                            <div class="p-5 flex-grow flex flex-col">
                                <h4 class="font-display text-xl mb-2 group-hover:text-[#D92323] transition-colors">${product.name}</h4>
                                <p class="text-gray-600 mb-4 text-sm flex-grow">${product.shortDescription}</p>
                            </div>
                        </a>

                        <div class="p-5 pt-0 flex items-center justify-between">
                            <p class="font-bold text-lg text-[#D92323]">£${product.price}</p> 
                            
                            <a href="#" class="add-to-cart-btn bg-[#D92323] text-white p-2 rounded-full hover:bg-red-700 transition duration-300" aria-label="Add ${product.name} to cart">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H7.99998" stroke="white" stroke-linejoin="round"></path> <path d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="10" cy="20" r="1" stroke="white" stroke-linejoin="round"></circle> <circle cx="17.5" cy="20" r="1" stroke="white" stroke-linejoin="round"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
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
            document.title = `${product.name} | Seoul Kebab`;
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
    
    // --- Part 4: Add Click Handlers for Card Buttons ---
    document.body.addEventListener('click', function(event) {
        // Handle 'Add to Cart' button clicks
        if (event.target.closest('.add-to-cart-btn')) {
            event.preventDefault();
            console.log('Add to cart clicked!');
            const icon = event.target.closest('.add-to-cart-btn');
            icon.classList.add('bg-green-500');
            setTimeout(() => {
                icon.classList.remove('bg-green-500');
            }, 500);
        }
        
        // NEW: Handle 'Favorite' button clicks
        else if (event.target.closest('.favorite-btn')) {
            event.preventDefault();
            console.log('Favorite clicked!');
            const button = event.target.closest('.favorite-btn');
            const svg = button.querySelector('svg');
            
            // Toggle the 'favorited' state
            svg.classList.toggle('text-red-500');
            svg.classList.toggle('fill-red-500');
            svg.classList.toggle('text-gray-600');
        }
    });
});