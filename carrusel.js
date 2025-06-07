// Carrusel de imágenes con animaciones suaves
const imagenes = [
    'imgs/galeria_fotos2.jpg',
    'imgs/galeria_fotos4.jpg',
    'imgs/galeria_fotos5.jpg',
    'imgs/galeria_fotos6.jpg',
    'imgs/galeria_fotos7.jpg',
    'imgs/galeria_fotos8.jpg',
    'imgs/galeria_fotos9.jpg',
    'imgs/galeria_fotos10.jpg',
    'imgs/galeria_fotos11.jpg',
    'imgs/galeria_fotos12.jpg',
    'imgs/galeria_fotos13.jpg',
    'imgs/galeria_fotos14.jpg',
    'imgs/galeria_fotos15.jpg',
    'imgs/galeria_fotos16.jpg',
    'imgs/galeria_fotos17.jpg',
    'imgs/galeria_fotos18.jpg',
    'imgs/galeria_fotos19.jpg',
    'imgs/galeria_fotos20.jpg',
    'imgs/galeria_fotos21.jpg',
    'imgs/galeria_fotos22.jpg',
    'imgs/galeria_fotos23.jpg',
    'imgs/galeria_fotos24.jpg',
    'imgs/galeria_fotos25.jpg',
    'imgs/galeria_fotos26.jpg',
    'imgs/galeria_fotos27.jpg',
    'imgs/galeria_fotos28.jpg',
    'imgs/galeria_fotos29.jpg',
    'imgs/galeria_fotos30.jpg',
    'imgs/galeria_fotos31.jpg',
    'imgs/galeria_fotos32.jpg',
    'imgs/galeria_fotos33.jpg',
    'imgs/galeria_fotos.jpg'
];

const galeriaGrid = document.getElementById('galeria-grid');
const loadingIndicator = document.getElementById('loading-indicator');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');

let indice = 0;
const porPagina = 8;
let isAnimating = false;

// Función para mostrar el indicador de carga
function showLoading() {
    loadingIndicator.classList.add('visible');
    galeriaGrid.classList.add('loading');
    galeriaGrid.classList.remove('loaded');
}

// Función para ocultar el indicador de carga
function hideLoading() {
    loadingIndicator.classList.remove('visible');
    galeriaGrid.classList.remove('loading');
    galeriaGrid.classList.add('loaded');
}

// Función para precargar imágenes
function preloadImages(imageUrls) {
    return Promise.all(
        imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        })
    );
}

// Función para renderizar la galería con animaciones
async function renderGaleria() {
    if (isAnimating) return;

    isAnimating = true;
    showLoading();

    // Deshabilitar botones durante la animación
    prevBtn.disabled = true;
    nextBtn.disabled = true;

    try {
        // Obtener las URLs de las imágenes actuales
        const imagenesActuales = [];
        for (let i = 0; i < porPagina; i++) {
            const idx = (indice + i) % imagenes.length;
            imagenesActuales.push(imagenes[idx]);
        }

        // Precargar las imágenes
        await preloadImages(imagenesActuales);

        // Limpiar el grid
        galeriaGrid.innerHTML = '';

        // Crear y agregar las imágenes con animación escalonada
        for (let i = 0; i < porPagina; i++) {
            const idx = (indice + i) % imagenes.length;
            const img = document.createElement('img');
            img.src = imagenes[idx];
            img.alt = `Imagen ${idx + 1}`;
            img.style.opacity = '0';
            galeriaGrid.appendChild(img);

            // Agregar animación escalonada
            setTimeout(() => {
                img.classList.add('slide-in');
                img.classList.add('loaded');
            }, i * 100); // Retraso de 100ms entre cada imagen
        }

        // Ocultar loading después de un breve retraso
        setTimeout(() => {
            hideLoading();
            isAnimating = false;
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }, 300);

    } catch (error) {
        console.error('Error cargando imágenes:', error);
        hideLoading();
        isAnimating = false;
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Función para navegar hacia atrás
function navigatePrev() {
    if (isAnimating) return;
    indice = (indice - porPagina + imagenes.length) % imagenes.length;
    renderGaleria();
}

// Función para navegar hacia adelante
function navigateNext() {
    if (isAnimating) return;
    indice = (indice + porPagina) % imagenes.length;
    renderGaleria();
}

// Event listeners con mejoras
prevBtn.addEventListener('click', navigatePrev);
nextBtn.addEventListener('click', navigateNext);

// Soporte para navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        navigatePrev();
    } else if (e.key === 'ArrowRight') {
        navigateNext();
    }
});

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderGaleria();
});
