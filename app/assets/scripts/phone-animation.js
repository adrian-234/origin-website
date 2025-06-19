function handleSticky(entry, parentRect) {
    const rect = entry.target.getBoundingClientRect();
    const stickyPoint = window.innerHeight / 2;
    
    const isInView = rect.top <= stickyPoint && rect.bottom >= stickyPoint;
    const isInSection = rect.bottom <= parentRect.bottom;

    if (isInView && isInSection) {
        entry.target.classList.add('revealed');
    } else if (!isInView) {
        entry.target.classList.remove('revealed');
    }
}

function createStickyObserver() {
    const projects = document.querySelector('.projects');
    const phones = document.querySelectorAll('.phone:not(:first-of-type)');

    const observer = new IntersectionObserver((entries) => {
        const parentRect = projects.getBoundingClientRect();
        entries.forEach(entry => handleSticky(entry, parentRect));
    }, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
    });

    phones.forEach(phone => observer.observe(phone));
}

// Initialize when DOM is loaded and on scroll
document.addEventListener('DOMContentLoaded', createStickyObserver);