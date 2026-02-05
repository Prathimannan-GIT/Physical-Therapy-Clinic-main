// Configure Tailwind for class-based dark mode (Rule 4)
if (window.tailwind) {
    tailwind.config = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    teal: {
                        700: '#0f766e',
                        800: '#115e59',
                        900: '#134e4a',
                    },
                    orange: {
                        500: '#f97316',
                    }
                }
            }
        }
    };
}

const uiThemeStore = {
    dark: localStorage.getItem('dark') === 'true' ||
        (!('dark' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
    toggle() {
        this.dark = !this.dark;
        localStorage.setItem('dark', this.dark);
        this.apply();
    },
    apply() {
        if (this.dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    init() {
        // Initial apply
        this.apply();
    }
};

if (window.Alpine) {
    Alpine.store('theme', uiThemeStore);
} else {
    document.addEventListener('alpine:init', () => {
        Alpine.store('theme', uiThemeStore);
    });
}

const components = {
    header: (activePage) => `
        <div x-data="{ mobileMenu: false }">
            <header class="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-[70px]">
            <div class="w-full px-5 h-full flex items-center justify-between flex-nowrap">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-1.5 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1 shrink-0 max-w-[70%] overflow-hidden">
                    <div class="h-8 w-8 sm:h-10 sm:w-10 bg-teal-700 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110 shrink-0">
                        <i class="fas fa-bone rotate-45 text-xs sm:text-base"></i>
                    </div>
                    <span class="text-sm sm:text-lg xl:text-xl font-bold text-teal-700 dark:text-teal-400 font-outfit uppercase tracking-tight transition-colors truncate whitespace-nowrap">Bones <span class="text-orange-500">&</span> Balance</span>
                </a>

                <!-- Desktop Nav -->
                <nav class="hidden lg:flex items-center lg:gap-3 xl:gap-8 lg:ml-6 xl:ml-12 tracking-tight text-sm xl:text-base whitespace-nowrap">
                    <a href="index.html" class="nav-link px-1 ${activePage === 'home' ? 'active' : ''}">Home</a>
                    <a href="home2.html" class="nav-link px-1 ${activePage === 'home2' ? 'active' : ''}">Home 2</a>
                    
                    <!-- Services Dropdown -->
                    <div class="relative group" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="nav-link px-1 flex items-center gap-1.5 focus:outline-none focus:text-orange-500 ${activePage === 'services' ? 'active' : ''}">
                            Services <i class="fas fa-chevron-down text-[10px] transition-transform group-hover:rotate-180"></i>
                        </button>
                        <!-- Rule 26/27: Dropdown aligned directly below parent -->
                        <div x-show="open" 
                             x-transition:enter="transition ease-out duration-200"
                             x-transition:enter-start="opacity-0 translate-y-2"
                             x-transition:enter-end="opacity-100 translate-y-0"
                             class="absolute top-full left-0 w-64 bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 rounded-xl py-3 mt-0 transform origin-top-left z-[100]">
                            <a href="services.html" class="flex items-center gap-3 px-5 py-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 transition-colors">
                                <i class="fas fa-th-large text-teal-600 w-5"></i>
                                <span>All Services</span>
                            </a>
                            <a href="#" class="flex items-center gap-3 px-5 py-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 transition-colors">
                                <i class="fas fa-bone text-teal-600 w-5"></i>
                                <span>Orthopedic PT</span>
                            </a>
                            <a href="#" class="flex items-center gap-3 px-5 py-3 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-700 transition-colors">
                                <i class="fas fa-running text-teal-600 w-5"></i>
                                <span>Sports Rehab</span>
                            </a>
                        </div>
                    </div>

                    <a href="conditions.html" class="nav-link px-1 ${activePage === 'conditions' ? 'active' : ''}">Conditions</a>
                    <a href="programs.html" class="nav-link px-1 ${activePage === 'programs' ? 'active' : ''}">Programs</a>
                    <a href="about.html" class="nav-link px-1 ${activePage === 'about' ? 'active' : ''}">About</a>
                </nav>

                <!-- Actions -->
                <!-- Actions -->
                <div class="hidden lg:flex items-center lg:gap-1.5 xl:gap-4 shrink-0">
                    <button @click="$store.theme.toggle()" class="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/50 active:scale-95 transition-all duration-300 shadow-sm" aria-label="Toggle Theme">
                        <template x-if="!$store.theme.dark">
                            <i class="fas fa-moon"></i>
                        </template>
                        <template x-if="$store.theme.dark">
                            <i class="fas fa-sun text-orange-500"></i>
                        </template>
                    </button>
                    <a href="contact.html" class="btn btn-outline h-10 px-3 xl:px-4 text-sm xl:text-base focus:ring-2 focus:ring-teal-500 whitespace-nowrap">Book Now</a>
                    <a href="login.html" class="btn btn-primary h-10 px-3 xl:px-4 text-sm xl:text-base focus:ring-2 focus:ring-orange-500 whitespace-nowrap">Portal</a>
                </div>

                <!-- Mobile Toggle -->
                <div class="lg:hidden flex items-center shrink-0">
                    <button @click="mobileMenu = true" class="p-2 text-teal-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg h-10 w-10 flex items-center justify-center" aria-label="Open Menu">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </header>

        <!-- Mobile Menu (Moved outside header for solid background) -->
        <div x-show="mobileMenu" 
             x-transition:enter="transition ease-out duration-300" 
             x-transition:enter-start="-translate-x-full" 
             x-transition:enter-end="translate-x-0"
             x-transition:leave="transition ease-in duration-300"
             x-transition:leave-start="translate-x-0"
             x-transition:leave-end="-translate-x-full"
             class="fixed inset-0 z-[999] bg-slate-50 dark:bg-slate-900 lg:hidden"
             style="display: none;">
            <div class="p-6 flex flex-col h-full overflow-y-auto">
                <div class="flex items-center justify-between mb-10">
                    <div class="flex items-center gap-3">
                         <div class="h-10 w-10 bg-teal-700 rounded-xl flex items-center justify-center text-white">
                            <i class="fas fa-bone rotate-45"></i>
                         </div>
                         <span class="text-xl font-bold text-teal-700 dark:text-teal-400 font-outfit uppercase tracking-tight transition-colors">Bones <span class="text-orange-500">&</span> Balance</span>
                    </div>
                    <button @click="mobileMenu = false" class="p-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors">
                        <i class="fas fa-times text-3xl"></i>
                    </button>
                </div>
                <nav class="flex flex-col gap-6">
                    <!-- Mobile Theme Toggle -->
                    <div class="flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <span class="font-bold text-slate-900 dark:text-white">Appearance</span>
                        <button @click="$store.theme.toggle()" class="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-teal-700 dark:text-teal-300 font-bold text-sm shadow-sm transition-all active:scale-95">
                            <template x-if="!$store.theme.dark">
                                <span class="flex items-center gap-2"><i class="fas fa-moon"></i> Dark Mode</span>
                            </template>
                            <template x-if="$store.theme.dark">
                                <span class="flex items-center gap-2"><i class="fas fa-sun text-orange-500"></i> Light Mode</span>
                            </template>
                        </button>
                    </div>

                    <div class="space-y-3">
                        <a href="index.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'home' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">Home</a>
                        <a href="home2.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'home2' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">Home 2</a>
                        <a href="services.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'services' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">Services</a>
                        <a href="conditions.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'conditions' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">Conditions</a>
                        <a href="programs.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'programs' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">Programs</a>
                        <a href="about.html" class="block px-6 py-4 text-xl font-bold rounded-2xl transition-all ${activePage === 'about' ? 'mobile-nav-active shadow-lg shadow-teal-500/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">About Us</a>
                    </div>
                </nav>
                <div class="mt-auto pt-10 flex flex-col gap-4">
                    <a href="contact.html" class="btn btn-accent w-full text-center py-4 rounded-xl text-lg">Book Appointment</a>
                    <a href="login.html" class="btn btn-outline w-full text-center py-4 rounded-xl text-lg">Patient Portal</a>
                </div>
            </div>
        </div>
    `,
    footer: () => `
        <footer class="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <!-- Brand -->
                    <div class="flex flex-col gap-6">
                        <a href="index.html" class="flex items-center gap-2 group focus:outline-none">
                            <div class="h-10 w-10 bg-teal-700 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-110 group-focus:ring-4 group-focus:ring-teal-500/50">
                                <i class="fas fa-bone rotate-45"></i>
                            </div>
                            <span class="text-lg xl:text-xl font-bold text-teal-700 dark:text-teal-400 font-outfit uppercase tracking-tight transition-colors">Bones <span class="text-orange-500">&</span> Balance</span>
                        </a>
                        <p class="text-slate-400 leading-relaxed">Dedicated to restoring your mobility and enhancing your quality of life through expert physical therapy and personalized care plans.</p>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all duration-300" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>

                    <!-- Services -->
                    <div>
                        <h4 class="text-white font-bold mb-8 text-lg uppercase tracking-wider">Our Services</h4>
                        <ul class="flex flex-col gap-4">
                            <li><a href="services.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Orthopedic Therapy</a></li>
                            <li><a href="services.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Sports Injury Rehab</a></li>
                            <li><a href="services.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Post-Surgery Care</a></li>
                            <li><a href="services.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Neurological PT</a></li>
                        </ul>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-white font-bold mb-8 text-lg uppercase tracking-wider">Quick Links</h4>
                        <ul class="flex flex-col gap-4">
                            <li><a href="about.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> About Our Clinic</a></li>
                            <li><a href="conditions.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Conditions Treated</a></li>
                            <li><a href="programs.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Special Programs</a></li>
                            <li><a href="resources.html" class="hover:text-orange-500 focus:text-orange-500 focus:outline-none transition-colors flex items-center gap-2 group"><i class="fas fa-chevron-right text-[10px] text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></i> Patient Resources</a></li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="text-white font-bold mb-8 text-lg uppercase tracking-wider">Get In Touch</h4>
                        <ul class="flex flex-col gap-5">
                            <li class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                    <i class="fas fa-map-marker-alt text-orange-500"></i>
                                </div>
                                <span class="text-slate-400">123 Healing Way, Medical District, NY 10001</span>
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                    <i class="fas fa-phone-alt text-orange-500"></i>
                                </div>
                                <span class="text-slate-400">+1 (555) 123-4567</span>
                            </li>
                            <li class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                    <i class="fas fa-envelope text-orange-500"></i>
                                </div>
                                <span class="text-slate-400">care@bonesbalance.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                    <p>&copy; 2026 Bones & Balance Physical Therapy. All rights reserved.</p>
                    <div class="flex gap-8">
                        <a href="privacy.html" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="terms.html" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" class="hover:text-white transition-colors">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    `
};

function initPage(pageId) {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = components.header(pageId);
        // Ensure Alpine processes the newly injected header
        if (window.Alpine) {
            Alpine.initTree(headerPlaceholder);
        }
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = components.footer();
        // Ensure Alpine processes the newly injected footer
        if (window.Alpine) {
            Alpine.initTree(footerPlaceholder);
        }
    }

    // Initialize AOS
    setTimeout(() => {
        if (window.AOS) {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
    }, 200);
}
