// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const searchInput = document.querySelector('.search-input');
const movieCards = document.querySelectorAll('.movie-card');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
}

// Search Autocomplete
if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
        // Simulate search API call
        console.log('Searching for:', e.target.value);
    }, 300));
}

// Movie Card Interactions
movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.movie-overlay')?.style?.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.movie-overlay')?.style?.opacity = '0';
    });
    
    card.addEventListener('click', () => {
        window.location.href = 'movie-details.html?id=' + card.dataset.id;
    });
});

// Modal Functionality
if (modal) {
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Form Validation
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Email validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }

        // Password validation
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            simulateLogin();
        }
    });
}

// Signup Form Validation
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const email = document.getElementById('signup-email');
        const password = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('confirm-password');

        // Reset previous errors
        clearErrors();

        // Email validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        // Password validation
        if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        }

        // Confirm password validation
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            const spinner = signupForm.querySelector('.spinner');
            spinner.classList.remove('hidden');
            
            // Simulate signup process
            setTimeout(() => {
                spinner.classList.add('hidden');
                // Store user data temporarily
                localStorage.setItem('tempEmail', email.value);
                localStorage.setItem('tempPassword', password.value);
                window.location.href = 'signup-plan.html'; // Next step in signup flow
            }, 1500);
        }
    });
}

// Helper function to clear all error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });
}

// Helper Functions
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('input-error');
}

function simulateLogin() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('hidden');
    
    setTimeout(() => {
        spinner.classList.add('hidden');
        window.location.href = 'index.html';
    }, 1500);
}

// Payment Form Submission
const paymentForm = document.querySelector('#payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const spinner = document.createElement('div');
        spinner.className = 'spinner mx-auto my-4';
        paymentForm.appendChild(spinner);
        spinner.style.display = 'block';

        // Simulate payment processing
        setTimeout(() => {
            window.location.href = 'signup-confirmation.html';
        }, 2000);
    });
}

// Watchlist Functionality
function toggleWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const index = watchlist.indexOf(movieId);
    
    if (index === -1) {
        watchlist.push(movieId);
    } else {
        watchlist.splice(index, 1);
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    updateWatchlistBadge();
}

function updateWatchlistBadge() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const badge = document.getElementById('watchlist-badge');
    if (badge) {
        badge.textContent = watchlist.length;
        badge.style.display = watchlist.length ? 'flex' : 'none';
    }
}

// Watchlist Modal Functions
function renderWatchlistModal() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const container = document.getElementById('watchlist-items');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (watchlist.length === 0) {
        container.innerHTML = '<p class="text-gray-400">Your watchlist is empty</p>';
        return;
    }

    watchlist.forEach(movieId => {
        const movie = mockMovies.find(m => m.id == movieId);
        if (movie) {
            const item = document.createElement('div');
            item.className = 'flex items-center space-x-4 p-2 hover:bg-gray-800 rounded cursor-pointer';
            item.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h3 class="font-medium">${movie.title}</h3>
                    <p class="text-gray-400 text-sm">${movie.year}</p>
                </div>
            `;
            item.addEventListener('click', () => {
                window.location.href = `movie-details.html?id=${movieId}`;
            });
            container.appendChild(item);
        }
    });
}

function setupWatchlistModal() {
    const watchlistBtn = document.querySelector('[href="#"] .fa-bookmark')?.closest('a');
    const modal = document.querySelector('.watchlist-modal');
    const closeBtn = document.querySelector('.close-watchlist');
    
    if (watchlistBtn && modal) {
        watchlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderWatchlistModal();
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Focus the close button when modal opens
            setTimeout(() => {
                document.querySelector('.close-watchlist')?.focus();
            }, 100);
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Close modal when clicking outside or pressing Escape
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('open')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        // Return focus to the watchlist button that opened the modal
        document.querySelector('[href="#"] .fa-bookmark')?.closest('a')?.focus();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateWatchlistBadge();
    
    // Add event listeners to all "Add to Watchlist" buttons
    document.querySelectorAll('.watchlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const movieId = this.dataset.movieId;
            toggleWatchlist(movieId);
            this.classList.toggle('added');
            this.querySelector('i').classList.toggle('fa-plus');
            this.querySelector('i').classList.toggle('fa-check');
        });
    });

    // Check if user is logged in (simulated)
    if (localStorage.getItem('netflixUser')) {
        document.querySelectorAll('.auth-only').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.guest-only').forEach(el => {
            el.style.display = 'none';
        });
    }

    setupWatchlistModal();
});
