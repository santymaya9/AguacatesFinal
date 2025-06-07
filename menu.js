// Menu sticky con funcionalidad de navegación suave
document.addEventListener('DOMContentLoaded', function () {
    const menuSticky = document.getElementById('menu-sticky');
    const menuToggle = document.getElementById('menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const menuLinks = document.querySelectorAll('.menu-link');

    let isMenuVisible = false;
    let lastScrollTop = 0;

    // Función para mostrar/ocultar menu basado en scroll
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 200;

        // Mostrar menu después del header
        if (scrollTop > headerHeight) {
            if (!isMenuVisible) {
                menuSticky.classList.add('visible');
                isMenuVisible = true;
            }
        } else {
            if (isMenuVisible) {
                menuSticky.classList.remove('visible');
                isMenuVisible = false;
            }
        }

        lastScrollTop = scrollTop;
    }

    // Función para manejar click en menu móvil
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        menuItems.classList.toggle('active');
    }

    // Función para navegación suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80; // Offset para el menu sticky
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Función para destacar el enlace activo
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section, footer');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover clase active de todos los enlaces
                menuLinks.forEach(link => link.classList.remove('active'));

                // Agregar clase active al enlace correspondiente
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', function () {
        handleScroll();
        highlightActiveSection();
    });

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Manejar clicks en los enlaces del menu
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            // Cerrar menu móvil si está abierto
            if (menuItems.classList.contains('active')) {
                toggleMobileMenu();
            }

            // Navegar suavemente
            smoothScroll(target);
        });
    });

    // Cerrar menu móvil al hacer click fuera
    document.addEventListener('click', function (e) {
        if (!menuSticky.contains(e.target) && menuItems.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Cerrar menu móvil al redimensionar ventana
    window.addEventListener('resize', function () {
        if (window.innerWidth > 800 && menuItems.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Inicializar
    handleScroll();
    highlightActiveSection();
});
