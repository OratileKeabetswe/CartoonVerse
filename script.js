document.addEventListener('DOMContentLoaded', function() {
})
    // ========== COMMON FUNCTIONALITY ==========
    
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const header = document.querySelector('.site-header');
    if (header) {
        header.insertBefore(mobileMenuBtn, header.querySelector('.logo'));
        
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('show-mobile');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== CHANNELS PAGE ==========
     if (document.querySelector('.channel-tabs-section')) {
        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const channelContents = document.querySelectorAll('.channel-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                channelContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // ========== EPISODES PAGE ==========
    if (document.querySelector('.episode-guide')) {
        // Sample episode data
        const shows = {
            'adventure-time': {
                title: 'Adventure Time',
                seasons: {
                    1: [
                        { number: '1', title: 'Slumber Party Panic', date: '2010-04-05' },
                        { number: '2', title: 'Trouble in Lumpy Space', date: '2010-04-05' }
                    ],
                    2: [
                        { number: '1', title: 'It Came from the Nightosphere', date: '2010-10-11' },
                        { number: '2', title: 'The Eyes', date: '2010-10-18' }
                    ]
                }
            },
            'spongebob': {
                title: 'Spongebob Squarepants',
                seasons: {
                    1: [
                        { number: '1', title: 'Help Wanted', date: '1999-05-01' },
                        { number: '2', title: 'Reef Blower', date: '1999-05-01' }
                    ],
                    2: [
                        { number: '1', title: 'Your Shoe\'s Untied', date: '2000-10-06' },
                        { number: '2', title: 'Squid\'s Day Off', date: '2000-10-06' }
                    ]
                }
            },
            'avatar': {
                title: 'Avatar: The Last Airbender',
                seasons: {
                    1: [
                        { number: '1', title: 'The Boy in the Iceberg', date: '2005-02-21' },
                        { number: '2', title: 'The Avatar Returns', date: '2005-02-21' }
                    ],
                    2: [
                        { number: '1', title: 'The Avatar State', date: '2006-03-17' },
                        { number: '2', title: 'The Cave of Two Lovers', date: '2006-03-24' }
                    ]
                }
            }
        };
        
        const showSelect = document.getElementById('show-select');
        const seasonSelector = document.querySelector('.season-selector');
        const seasonBtns = document.querySelector('.season-btns');
        const episodeList = document.querySelector('.episode-list');
        
        if (showSelect) {
            showSelect.addEventListener('change', function() {
                const showId = this.value;
                
                if (!showId) {
                    seasonSelector.style.display = 'none';
                    episodeList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-tv"></i>
                            <p>Select a show to browse episodes</p>
                        </div>
                    `;
                    return;
                }
                
                // Show season selector
                seasonSelector.style.display = 'block';
                
                // Populate season buttons
                seasonBtns.innerHTML = '';
                const seasons = shows[showId].seasons;
                
                for (const seasonNum in seasons) {
                    const btn = document.createElement('button');
                    btn.className = 'season-btn';
                    btn.textContent = `Season ${seasonNum}`;
                    btn.dataset.season = seasonNum;
                    
                    btn.addEventListener('click', function() {
                        document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
                        this.classList.add('active');
                        displayEpisodes(showId, seasonNum);
                    });
                    
                    seasonBtns.appendChild(btn);
                }
                
                // Activate first season
                const firstSeasonBtn = seasonBtns.querySelector('.season-btn');
                if (firstSeasonBtn) {
                    firstSeasonBtn.classList.add('active');
                    displayEpisodes(showId, firstSeasonBtn.dataset.season);
                }
            });
        }
        
        function displayEpisodes(showId, seasonNum) {
            const episodes = shows[showId].seasons[seasonNum];
            let html = '';
            
            episodes.forEach(ep => {
                html += `
                    <div class="episode-item">
                        <span class="episode-number">${ep.number}</span>
                        <span class="episode-title">${ep.title}</span>
                        <span class="episode-date">${formatDate(ep.date)}</span>
                    </div>
                `;
            });
            
            episodeList.innerHTML = html;
        }
        
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }
    }
    
    // ========== FEEDBACK PAGE ==========
    if (document.getElementById('feedbackForm')) {
        const feedbackForm = document.getElementById('feedbackForm');
        const thankYouMessage = document.getElementById('thankYou');
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const message = document.getElementById('message').value;
            if (!message.trim()) {
                alert('Please enter your feedback message');
                return;
            }
            
            // Hide form and show thank you message
            feedbackForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
            
            // In a real app, you would send the data to a server here
            const formData = {
                type: document.getElementById('feedbackType').value,
                message: message,
                contact: document.getElementById('contact').value || 'Not provided'
            };
            
            console.log('Feedback submitted:', formData);
        });
    }
    
    // ========== SUPPORT PAGE ==========
    if (document.querySelector('.support-section')) {
        const shareBtns = document.querySelectorAll('.share-btn');
        
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.classList.contains('twitter') ? 'twitter' :
                               this.classList.contains('facebook') ? 'facebook' : 'reddit';
                               
                let url = '';
                const pageUrl = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out CartoonVerse - the ultimate cartoon fan site!');
                
                switch (platform) {
                    case 'twitter':
                        url = `https://twitter.com/intent/tweet?text=${text}&url=${pageUrl}`;
                        break;
                    case 'facebook':
                        url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                        break;
                    case 'reddit':
                        url = `https://www.reddit.com/submit?url=${pageUrl}&title=${text}`;
                        break;
                }
                
                window.open(url, '_blank', 'width=600,height=400');
            });
        });
    }
    
    // ========== ANIMATIONS ==========
    // Add fade-in animation to elements with the 'animate' class
    const animateElements = document.querySelectorAll('.animate');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check animation on scroll
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);