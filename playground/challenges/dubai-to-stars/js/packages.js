// Packages page functionality

class PackagesPage {
    constructor() {
        this.packageCards = document.querySelectorAll('.package-card');
        this.offerCards = document.querySelectorAll('.offer-card');
        this.comparisonTable = document.querySelector('.comparison-table');
        
        this.initializeEventListeners();
        this.initializeAnimations();
    }
    
    initializeEventListeners() {
        // Package card hover effects
        this.packageCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 10px 30px rgba(0, 247, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
        
        // Offer card hover effects
        this.offerCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 30px rgba(0, 247, 255, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'none';
            });
        });
        
        // Book Now button click handlers
        document.querySelectorAll('.btn-book').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.package-card');
                const packageName = card.querySelector('h3').textContent;
                const price = card.querySelector('.price').textContent;
                this.showBookingModal(packageName, price);
            });
        });
        
        // Offer button click handlers
        document.querySelectorAll('.btn-offer').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.offer-card');
                const offerTitle = card.querySelector('h3').textContent;
                const offerDescription = card.querySelector('p').textContent;
                this.showOfferDetails(offerTitle, offerDescription);
            });
        });
    }
    
    initializeAnimations() {
        // Animate package cards on scroll
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
        
        this.packageCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
        
        // Animate comparison table on scroll
        if (this.comparisonTable) {
            this.comparisonTable.style.opacity = '0';
            this.comparisonTable.style.transform = 'translateY(20px)';
            this.comparisonTable.style.transition = 'all 0.5s ease-out';
            
            const tableObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            tableObserver.observe(this.comparisonTable);
        }
    }
    
    showBookingModal(packageName, price) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Book ${packageName}</h3>
                <p>Starting from ${price}</p>
                <div class="modal-form">
                    <div class="form-group">
                        <label for="modal-departure">Departure Date</label>
                        <input type="date" id="modal-departure" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label for="modal-passengers">Number of Passengers</label>
                        <input type="number" id="modal-passengers" min="1" max="4" value="1">
                    </div>
                    <div class="form-group">
                        <label for="modal-class">Seat Class</label>
                        <select id="modal-class">
                            <option value="economy">Economy</option>
                            <option value="luxury">Luxury</option>
                            <option value="vip">VIP Zero-Gravity</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancel</button>
                    <button class="btn-confirm">Confirm Booking</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for modal actions
        const cancelBtn = modal.querySelector('.btn-cancel');
        const confirmBtn = modal.querySelector('.btn-confirm');
        
        cancelBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        confirmBtn.addEventListener('click', () => {
            this.showBookingConfirmation(packageName);
        });
    }
    
    showOfferDetails(offerTitle, offerDescription) {
        const modal = document.createElement('div');
        modal.className = 'offer-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${offerTitle}</h3>
                <p>${offerDescription}</p>
                <div class="offer-terms">
                    <h4>Terms & Conditions</h4>
                    <ul>
                        <li>Offer subject to availability</li>
                        <li>Cannot be combined with other offers</li>
                        <li>Valid for new bookings only</li>
                    </ul>
                </div>
                <button class="btn-close">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
    }
    
    showBookingConfirmation(packageName) {
        const confirmation = document.createElement('div');
        confirmation.className = 'booking-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <h3>Booking Confirmed!</h3>
                <p>Your ${packageName} booking has been confirmed.</p>
                <p>You will receive a confirmation email shortly.</p>
                <button class="btn-close">Close</button>
            </div>
        `;
        
        document.body.appendChild(confirmation);
        
        const closeBtn = confirmation.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            confirmation.remove();
        });
    }
}

// Initialize the packages page when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PackagesPage();
}); 