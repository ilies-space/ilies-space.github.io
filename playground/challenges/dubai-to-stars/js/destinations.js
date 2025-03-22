// Destinations page functionality

class DestinationsPage {
    constructor() {
        this.destinationCards = document.querySelectorAll('.destination-card');
        this.detailCards = document.querySelectorAll('.detail-card');
        
        this.initializeEventListeners();
        this.initializeAnimations();
    }
    
    initializeEventListeners() {
        // Destination card hover effects
        this.destinationCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 247, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
        
        // Detail card hover effects
        this.detailCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 247, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
        
        // Explore button click handlers
        document.querySelectorAll('.btn-explore').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.destination-card');
                const destinationName = card.querySelector('h3').textContent;
                this.showDestinationDetails(destinationName);
            });
        });
    }
    
    initializeAnimations() {
        // Animate destination cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        this.destinationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
        
        // Animate detail cards on scroll
        this.detailCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
    }
    
    showDestinationDetails(destinationName) {
        const modal = document.createElement('div');
        modal.className = 'destination-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${destinationName}</h3>
                <div class="destination-info">
                    <div class="info-section">
                        <h4>Overview</h4>
                        <p>Experience the wonders of ${destinationName} with our exclusive travel packages.</p>
                    </div>
                    <div class="info-section">
                        <h4>Key Features</h4>
                        <ul>
                            <li>State-of-the-art facilities</li>
                            <li>Expert guidance</li>
                            <li>Safety protocols</li>
                            <li>Unique experiences</li>
                        </ul>
                    </div>
                    <div class="info-section">
                        <h4>Available Packages</h4>
                        <ul>
                            <li>Basic Tour</li>
                            <li>Extended Stay</li>
                            <li>Research Experience</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-view-packages">View Packages</button>
                    <button class="btn-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal actions
        const closeBtn = modal.querySelector('.btn-close');
        const viewPackagesBtn = modal.querySelector('.btn-view-packages');
        
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        viewPackagesBtn.addEventListener('click', () => {
            window.location.href = 'packages.html';
        });
    }
}

// Initialize the destinations page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DestinationsPage();
}); 