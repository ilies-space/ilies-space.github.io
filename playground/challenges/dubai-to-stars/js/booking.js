// Booking functionality for Dubai to the Stars

class SpaceBooking {
    constructor() {
        this.form = document.querySelector('.booking-form');
        this.destinationSelect = document.getElementById('destination');
        this.departureInput = document.getElementById('departure');
        this.classSelect = document.getElementById('class');
        
        this.pricing = {
            iss: {
                economy: 500000,
                luxury: 750000,
                vip: 1000000
            },
            lunar: {
                economy: 1000000,
                luxury: 1500000,
                vip: 2000000
            },
            mars: {
                economy: 2000000,
                luxury: 3000000,
                vip: 4000000
            }
        };
        
        this.initializeEventListeners();
        this.setupDatePicker();
    }
    
    initializeEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        if (this.destinationSelect) {
            this.destinationSelect.addEventListener('change', () => this.updatePricing());
        }
        
        if (this.classSelect) {
            this.classSelect.addEventListener('change', () => this.updatePricing());
        }
    }
    
    setupDatePicker() {
        if (this.departureInput) {
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            this.departureInput.min = today;
            
            // Set maximum date to 1 year from today
            const maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() + 1);
            this.departureInput.max = maxDate.toISOString().split('T')[0];
        }
    }
    
    updatePricing() {
        const destination = this.destinationSelect.value;
        const seatClass = this.classSelect.value;
        
        if (destination && seatClass) {
            const price = this.pricing[destination][seatClass];
            this.showPrice(price);
        }
    }
    
    showPrice(price) {
        let priceDisplay = document.querySelector('.price-display');
        if (!priceDisplay) {
            priceDisplay = document.createElement('div');
            priceDisplay.className = 'price-display';
            this.form.insertBefore(priceDisplay, this.form.querySelector('button'));
        }
        
        priceDisplay.innerHTML = `
            <div class="price-info">
                <h3>Estimated Price</h3>
                <p class="price">$${price.toLocaleString()}</p>
                <p class="price-note">* Final price may vary based on availability and special offers</p>
            </div>
        `;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const destination = this.destinationSelect.value;
        const departure = this.departureInput.value;
        const seatClass = this.classSelect.value;
        
        if (!destination || !departure || !seatClass) {
            this.showError('Please fill in all fields');
            return;
        }
        
        // Demo booking confirmation
        const price = this.pricing[destination][seatClass];
        this.showConfirmation({
            destination: this.destinationSelect.options[this.destinationSelect.selectedIndex].text,
            departure,
            seatClass,
            price
        });
    }
    
    showError(message) {
        let errorDisplay = document.querySelector('.error-message');
        if (!errorDisplay) {
            errorDisplay = document.createElement('div');
            errorDisplay.className = 'error-message';
            this.form.insertBefore(errorDisplay, this.form.querySelector('button'));
        }
        
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'block';
        
        setTimeout(() => {
            errorDisplay.style.display = 'none';
        }, 3000);
    }
    
    showConfirmation(booking) {
        const confirmation = document.createElement('div');
        confirmation.className = 'booking-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <h3>Booking Confirmed!</h3>
                <div class="booking-details">
                    <p><strong>Destination:</strong> ${booking.destination}</p>
                    <p><strong>Departure:</strong> ${new Date(booking.departure).toLocaleDateString()}</p>
                    <p><strong>Class:</strong> ${booking.seatClass}</p>
                    <p><strong>Price:</strong> $${booking.price.toLocaleString()}</p>
                </div>
                <p class="confirmation-note">This is a demo confirmation. In a real booking, you would receive a confirmation email.</p>
                <button class="btn-close-confirmation">Close</button>
            </div>
        `;
        
        document.body.appendChild(confirmation);
        
        // Add close button functionality
        const closeButton = confirmation.querySelector('.btn-close-confirmation');
        closeButton.addEventListener('click', () => {
            confirmation.remove();
            this.form.reset();
        });
    }
}

// Initialize the booking system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SpaceBooking();
}); 