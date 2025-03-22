class DashboardPage {
    constructor() {
        this.initializeEventListeners();
        this.initializeAnimations();
        this.loadUserData();
        this.loadBookings();
        this.loadRecentActivity();
    }

    initializeEventListeners() {
        // Navigation links
        const navLinks = document.querySelectorAll('.dashboard-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });

        // Booking actions
        const bookingCards = document.querySelectorAll('.booking-card');
        bookingCards.forEach(card => {
            const viewBtn = card.querySelector('.btn-view');
            const cancelBtn = card.querySelector('.btn-cancel');

            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showBookingDetails(card.dataset.bookingId);
                });
            }

            if (cancelBtn) {
                cancelBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleBookingCancellation(card.dataset.bookingId);
                });
            }
        });

        // Overview card clicks
        const overviewCards = document.querySelectorAll('.overview-card');
        overviewCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleOverviewCardClick(card.dataset.type);
            });
        });
    }

    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe cards and sections
        document.querySelectorAll('.overview-card, .activity-item, .booking-card').forEach(el => {
            observer.observe(el);
        });
    }

    async loadUserData() {
        try {
            // Simulate API call to get user data
            const userData = {
                name: 'John Doe',
                role: 'Space Explorer',
                spaceMiles: 25000,
                profileImage: 'https://via.placeholder.com/150'
            };

            this.updateUserProfile(userData);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async loadBookings() {
        try {
            // Simulate API call to get bookings
            const bookings = [
                {
                    id: 1,
                    destination: 'International Space Station',
                    date: '2024-06-15',
                    duration: '7 days',
                    passengers: 2,
                    status: 'confirmed'
                },
                {
                    id: 2,
                    destination: 'Lunar Base',
                    date: '2024-08-20',
                    duration: '14 days',
                    passengers: 1,
                    status: 'pending'
                }
            ];

            this.updateBookingsGrid(bookings);
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }

    async loadRecentActivity() {
        try {
            // Simulate API call to get recent activity
            const activities = [
                {
                    type: 'booking',
                    title: 'New Booking Confirmed',
                    description: 'ISS Experience - 7 days',
                    time: '2 hours ago'
                },
                {
                    type: 'miles',
                    title: 'Space Miles Earned',
                    description: '+500 miles for completing profile',
                    time: '1 day ago'
                }
            ];

            this.updateActivityList(activities);
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    updateUserProfile(userData) {
        const profileImage = document.querySelector('.profile-image img');
        const userName = document.querySelector('.user-profile h3');
        const userRole = document.querySelector('.user-profile p');
        const spaceMiles = document.querySelector('.space-miles span');

        if (profileImage) profileImage.src = userData.profileImage;
        if (userName) userName.textContent = userData.name;
        if (userRole) userRole.textContent = userData.role;
        if (spaceMiles) spaceMiles.textContent = userData.spaceMiles.toLocaleString();
    }

    updateBookingsGrid(bookings) {
        const bookingsGrid = document.querySelector('.bookings-grid');
        if (!bookingsGrid) return;

        bookingsGrid.innerHTML = bookings.map(booking => `
            <div class="booking-card" data-booking-id="${booking.id}">
                <div class="booking-header">
                    <h3>${booking.destination}</h3>
                    <span class="booking-status ${booking.status}">${booking.status}</span>
                </div>
                <div class="booking-details">
                    <p><i class="fas fa-calendar"></i> ${booking.date}</p>
                    <p><i class="fas fa-clock"></i> ${booking.duration}</p>
                    <p><i class="fas fa-users"></i> ${booking.passengers} passenger(s)</p>
                </div>
                <div class="booking-actions">
                    <a href="#" class="btn-view">View Details</a>
                    <button class="btn-cancel">Cancel Booking</button>
                </div>
            </div>
        `).join('');

        // Reinitialize event listeners for new booking cards
        this.initializeEventListeners();
    }

    updateActivityList(activities) {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            booking: 'fa-rocket',
            miles: 'fa-star',
            profile: 'fa-user',
            payment: 'fa-credit-card'
        };
        return icons[type] || 'fa-info-circle';
    }

    handleNavigation(link) {
        // Remove active class from all links
        document.querySelectorAll('.dashboard-nav a').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        
        // Handle navigation logic here
        const section = link.getAttribute('href').substring(1);
        this.showSection(section);
    }

    showSection(section) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
        // Show selected section
        const selectedSection = document.querySelector(`#${section}`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    showBookingDetails(bookingId) {
        // Create and show modal with booking details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Booking Details</h2>
                <div class="booking-details-content">
                    <!-- Booking details will be loaded here -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking the close button or outside the modal
        modal.querySelector('.close').onclick = () => modal.remove();
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        };

        // Load booking details
        this.loadBookingDetails(bookingId, modal);
    }

    async loadBookingDetails(bookingId, modal) {
        try {
            // Simulate API call to get booking details
            const bookingDetails = {
                id: bookingId,
                destination: 'International Space Station',
                date: '2024-06-15',
                duration: '7 days',
                passengers: 2,
                status: 'confirmed',
                price: '$500,000',
                itinerary: [
                    'Day 1: Launch from Dubai Space Port',
                    'Day 2: Arrival at ISS',
                    'Days 3-6: Space Station Activities',
                    'Day 7: Return to Earth'
                ]
            };

            const content = modal.querySelector('.booking-details-content');
            content.innerHTML = `
                <div class="booking-info">
                    <h3>${bookingDetails.destination}</h3>
                    <p><strong>Date:</strong> ${bookingDetails.date}</p>
                    <p><strong>Duration:</strong> ${bookingDetails.duration}</p>
                    <p><strong>Passengers:</strong> ${bookingDetails.passengers}</p>
                    <p><strong>Status:</strong> <span class="booking-status ${bookingDetails.status}">${bookingDetails.status}</span></p>
                    <p><strong>Price:</strong> ${bookingDetails.price}</p>
                </div>
                <div class="itinerary">
                    <h3>Itinerary</h3>
                    <ul>
                        ${bookingDetails.itinerary.map(day => `<li>${day}</li>`).join('')}
                    </ul>
                </div>
            `;
        } catch (error) {
            console.error('Error loading booking details:', error);
            modal.querySelector('.booking-details-content').innerHTML = '<p>Error loading booking details.</p>';
        }
    }

    async handleBookingCancellation(bookingId) {
        if (!confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            // Simulate API call to cancel booking
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update UI
            const bookingCard = document.querySelector(`[data-booking-id="${bookingId}"]`);
            if (bookingCard) {
                bookingCard.remove();
            }

            // Show success message
            this.showNotification('Booking cancelled successfully');
        } catch (error) {
            console.error('Error cancelling booking:', error);
            this.showNotification('Error cancelling booking', 'error');
        }
    }

    handleOverviewCardClick(type) {
        // Handle overview card clicks based on type
        switch (type) {
            case 'upcoming':
                this.showSection('bookings');
                break;
            case 'past':
                this.showSection('past-trips');
                break;
            case 'miles':
                this.showSection('rewards');
                break;
            case 'offers':
                this.showSection('special-offers');
                break;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardPage();
}); 