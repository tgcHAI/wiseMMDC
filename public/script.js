/**
 * ====================================
 * Wise MMDC Interactive Enhancements - Group 13
 * MO-IT120 - Web Systems and Technology
 * 
 * Group Members:
 * - John Paul P. (Project Lead & Frontend Development)
 * - Reinard R. (Documentation & Quality Assurance)
 * - JHAERSN C. (UI/UX Design & Bootstrap Integration)
 * - Jubiler P. (JavaScript Development & Interactive Features)
 * ====================================
 */

/**
 * Main Application Controller
 * Handles initialization and coordination of all interactive features
 */
class WiseMMDCApp {
  constructor() {
    this.isInitialized = false;
    this.features = new Map();
    this.cachedElements = new Map();
  }

  /**
   * Initialize the application when DOM is ready
   */
  init() {
    if (this.isInitialized) return;
    
    try {
      this.initializeInteractiveFeatures();
      this.isInitialized = true;
      console.log('🎓 Wise MMDC App initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize Wise MMDC App:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Initialize all interactive features in proper order
   */
  initializeInteractiveFeatures() {
    const features = [
      { name: 'welcomeMessage', fn: () => this.addWelcomeMessage() },
      { name: 'articleCards', fn: () => this.enhanceArticleCards() },
      { name: 'scrollToTop', fn: () => this.addScrollToTopButton() },
      { name: 'navigation', fn: () => this.addNavigationHighlight() },
      { name: 'blogRedirect', fn: () => this.addBlogComingSoonRedirect() },
      { name: 'formValidation', fn: () => this.addFormInputValidation() },
      { name: 'dynamicGreeting', fn: () => this.addDynamicGreeting() },
      { name: 'readingProgress', fn: () => this.addReadingProgress() },
      { name: 'keyboardShortcuts', fn: () => this.addKeyboardShortcuts() }
    ];

    features.forEach(feature => {
      try {
        feature.fn();
        this.features.set(feature.name, true);
        console.log(`✅ ${feature.name} initialized`);
      } catch (error) {
        console.error(`❌ Failed to initialize ${feature.name}:`, error);
        this.features.set(feature.name, false);
      }
    });
  }

  /**
   * Handle initialization errors gracefully
   * @param {Error} error - The error that occurred during initialization
   */
  handleInitializationError(error) {
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-warning';
    errorDiv.innerHTML = `
      <strong>Notice:</strong> Some interactive features may not be available. 
      Please refresh the page if you experience issues.
    `;
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      max-width: 300px;
    `;
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  /**
   * Cache frequently used DOM elements for better performance
   * @param {string} selector - CSS selector for the element
   * @param {string} key - Key to store the element under
   * @returns {Element|null} - The cached element
   */
  cacheElement(selector, key) {
    if (!this.cachedElements.has(key)) {
      const element = document.querySelector(selector);
      if (element) {
        this.cachedElements.set(key, element);
      }
    }
    return this.cachedElements.get(key) || null;
  }

  /**
   * Feature 1: Dynamic Welcome Message
   * Creates a personalized welcome notification based on time of day
   */
  addWelcomeMessage() {
    const hero = this.cacheElement('.hero__content', 'heroContent');
    if (!hero) return;

    try {
      // Create welcome notification element
      const welcomeBox = document.createElement('div');
      welcomeBox.id = 'welcome-notification';
      welcomeBox.setAttribute('role', 'alert');
      welcomeBox.setAttribute('aria-live', 'polite');
      welcomeBox.style.cssText = `
        background: rgba(249, 178, 51, 0.9);
        color: #333;
        padding: 15px 25px;
        border-radius: 8px;
        margin-top: 20px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: fadeInSlide 1s ease-out;
        cursor: pointer;
      `;
      
      // Generate time-based greeting
      const greeting = this.getTimeBasedGreeting();
      welcomeBox.innerHTML = `${greeting}! Welcome to Wise MMDC 🎓 <small>(Click to dismiss)</small>`;
      
      // Add click event for dismissal
      welcomeBox.addEventListener('click', () => this.dismissWelcomeMessage(welcomeBox));
      
      hero.appendChild(welcomeBox);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => this.dismissWelcomeMessage(welcomeBox), 5000);
      
    } catch (error) {
      console.error('Error creating welcome message:', error);
    }
  }

  /**
   * Get appropriate greeting based on current time
   * @returns {string} - Time-appropriate greeting
   */
  getTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  /**
   * Dismiss welcome message with animation
   * @param {HTMLElement} welcomeBox - The welcome message element
   */
  dismissWelcomeMessage(welcomeBox) {
    if (!welcomeBox || !welcomeBox.parentElement) return;
    
    welcomeBox.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
      if (welcomeBox.parentElement) {
        welcomeBox.remove();
      }
    }, 500);
  }

  /**
   * Feature 2: Enhanced Article Cards
   * Adds animations and interactive effects to article cards
   */
  enhanceArticleCards() {
    const articleCards = document.querySelectorAll('.article-card');
    if (!articleCards.length) return;
    
    try {
      articleCards.forEach((card, index) => {
        // Add entrance animation with staggered delay
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 150);
        
        // Add interactive hover effects
        this.addCardHoverEffects(card);
        
        // Click functionality removed - cards are now non-clickable
      });
      
      // Update article count
      this.updateArticleCount();
      
    } catch (error) {
      console.error('Error enhancing article cards:', error);
    }
  }

  /**
   * Add hover effects to article cards
   * @param {HTMLElement} card - The article card element
   */
  addCardHoverEffects(card) {
    card.addEventListener('mouseenter', function() {
      const excerpt = this.querySelector('.article-card__excerpt');
      if (excerpt) {
        excerpt.style.color = '#1B4F91';
        excerpt.style.transition = 'color 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const excerpt = this.querySelector('.article-card__excerpt');
      if (excerpt) {
        excerpt.style.color = '#333';
      }
    });
  }


  /**
   * Update article count display
   */
  updateArticleCount() {
    const blogSection = document.querySelector('.blog');
    if (!blogSection) return;
    
    const articleCount = document.querySelectorAll('.article-card').length;
    const blogTitle = document.querySelector('.blog__title');
    
    if (blogTitle && !blogTitle.querySelector('.count-badge')) {
      const countBadge = document.createElement('span');
      countBadge.className = 'count-badge';
      countBadge.style.cssText = `
        display: inline-block;
        background: #F9B233;
        color: #333;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8em;
        margin-left: 15px;
        font-weight: 600;
      `;
      countBadge.textContent = `${articleCount} Article${articleCount !== 1 ? 's' : ''}`;
      blogTitle.appendChild(countBadge);
    }
  }

  /**
   * Feature 3: Scroll to Top Button
   * Creates a floating scroll-to-top button with smooth scrolling
   */
  addScrollToTopButton() {
    try {
      // Create scroll button
      const scrollBtn = document.createElement('button');
      scrollBtn.id = 'scroll-to-top';
      scrollBtn.innerHTML = '↑';
      scrollBtn.setAttribute('aria-label', 'Scroll to top of page');
      scrollBtn.setAttribute('title', 'Scroll to top');
      scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #1B4F91;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
      `;
      
      document.body.appendChild(scrollBtn);
      
      // Show/hide based on scroll position
      window.addEventListener('scroll', () => this.handleScrollButtonVisibility(scrollBtn));
      
      // Smooth scroll to top
      scrollBtn.addEventListener('click', () => this.smoothScrollToTop());
      
      // Add hover effects
      this.addScrollButtonHoverEffects(scrollBtn);
      
    } catch (error) {
      console.error('Error creating scroll to top button:', error);
    }
  }

  /**
   * Handle scroll button visibility based on scroll position
   * @param {HTMLElement} scrollBtn - The scroll button element
   */
  handleScrollButtonVisibility(scrollBtn) {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  }

  /**
   * Smooth scroll to top of page
   */
  smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  /**
   * Add hover effects to scroll button
   * @param {HTMLElement} scrollBtn - The scroll button element
   */
  addScrollButtonHoverEffects(scrollBtn) {
    scrollBtn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.backgroundColor = '#143a6b';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.backgroundColor = '#1B4F91';
    });
  }

  /**
   * Feature 4: Active Navigation Highlight
   * Highlights the current page in navigation
   */
  addNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navLinks.length) return;
    
    try {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      navLinks.forEach(link => {
        // Update active state based on current page
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
          link.classList.add('nav__link--active');
        }
        
        // Add click effect
        link.addEventListener('click', function(e) {
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = 'scale(1)';
          }, 150);
        });
      });
      
    } catch (error) {
      console.error('Error adding navigation highlight:', error);
    }
  }

  /**
   * Feature: Blog Coming Soon Redirect
   * Intercepts clicks on Blog nav, shows toast, then redirects Home.
   */
  addBlogComingSoonRedirect() {
    const blogLink = document.querySelector('.nav-blog');
    if (!blogLink) return;

    blogLink.addEventListener('click', (e) => {
      e.preventDefault();

      // Create toast/notice
      const toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.textContent = 'Blog: Coming Soon';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1B4F91;
        color: #fff;
        padding: 10px 16px;
        border-radius: 6px;
        box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.2s ease;
      `;
      document.body.appendChild(toast);
      requestAnimationFrame(() => { toast.style.opacity = '1'; });

      // Auto-redirect back to Home after 1.2s
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
        window.location.href = 'index.html';
      }, 1200);
    });
  }

  /**
   * Feature 5: Form Input Validation
   * Adds validation for form inputs with user feedback
   */
  addFormInputValidation() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="text"]');
    if (!inputs.length) return;
    
    try {
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateInput(input));
        input.addEventListener('focus', () => this.clearValidation(input));
      });
    } catch (error) {
      console.error('Error adding form validation:', error);
    }
  }

  /**
   * Validate input field
   * @param {HTMLInputElement} input - The input element to validate
   */
  validateInput(input) {
    const value = input.value.trim();
    
    if (input.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showValidationMessage(input, 'Please enter a valid email address', false);
      } else {
        this.showValidationMessage(input, 'Valid email!', true);
      }
    }
  }

  /**
   * Show validation message
   * @param {HTMLInputElement} input - The input element
   * @param {string} message - The validation message
   * @param {boolean} isValid - Whether the input is valid
   */
  showValidationMessage(input, message, isValid) {
    this.clearValidation(input);
    
    const msg = document.createElement('span');
    msg.className = 'validation-message';
    msg.textContent = message;
    msg.style.cssText = `
      display: block;
      font-size: 0.85rem;
      margin-top: 5px;
      color: ${isValid ? '#28a745' : '#E31E24'};
      font-weight: 600;
    `;
    
    input.parentNode.appendChild(msg);
    
    if (!isValid) {
      input.style.borderColor = '#E31E24';
    } else {
      input.style.borderColor = '#28a745';
    }
  }

  /**
   * Clear validation message
   * @param {HTMLInputElement} input - The input element
   */
  clearValidation(input) {
    const existingMsg = input.parentNode.querySelector('.validation-message');
    if (existingMsg) {
      existingMsg.remove();
    }
    input.style.borderColor = '';
  }

  /**
   * Feature 6: Dynamic Time-based Greeting
   * Adds time-appropriate emoji to hero title
   */
  addDynamicGreeting() {
    const heroTitle = this.cacheElement('.hero__title', 'heroTitle');
    if (!heroTitle) return;
    
    try {
      const timeEmoji = this.getTimeEmoji();
      
      // Add emoji without modifying original text
      const emojiSpan = document.createElement('span');
      emojiSpan.textContent = ' ' + timeEmoji;
      emojiSpan.style.animation = 'pulse 2s infinite';
      emojiSpan.setAttribute('aria-hidden', 'true');
      heroTitle.appendChild(emojiSpan);
      
    } catch (error) {
      console.error('Error adding dynamic greeting:', error);
    }
  }

  /**
   * Get time-appropriate emoji
   * @returns {string} - Emoji based on current time
   */
  getTimeEmoji() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 0 && currentHour < 6) {
      return '🌙';
    } else if (currentHour >= 6 && currentHour < 12) {
      return '🌅';
    } else if (currentHour >= 12 && currentHour < 18) {
      return '☀️';
    } else {
      return '🌆';
    }
  }

  /**
   * Feature 7: Reading Progress Bar
   * Creates a progress bar showing reading progress
   */
  addReadingProgress() {
    const article = document.querySelector('.article');
    if (!article) return;
    
    try {
      // Create progress bar
      const progressBar = document.createElement('div');
      progressBar.id = 'reading-progress';
      progressBar.setAttribute('role', 'progressbar');
      progressBar.setAttribute('aria-label', 'Reading progress');
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #1B4F91, #F9B233, #E31E24);
        z-index: 9999;
        transition: width 0.1s ease;
      `;
      
      document.body.appendChild(progressBar);
      
      // Update progress on scroll
      window.addEventListener('scroll', () => this.updateReadingProgress(progressBar));
      
    } catch (error) {
      console.error('Error creating reading progress bar:', error);
    }
  }

  /**
   * Update reading progress bar
   * @param {HTMLElement} progressBar - The progress bar element
   */
  updateReadingProgress(progressBar) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = Math.min(progress, 100) + '%';
    progressBar.setAttribute('aria-valuenow', Math.min(progress, 100));
  }

  /**
   * Feature 8: Keyboard Shortcuts
   * Adds keyboard navigation support
   */
  addKeyboardShortcuts() {
    try {
      document.addEventListener('keydown', (e) => {
        // Alt + H: Go to homepage
        if (e.altKey && e.key === 'h') {
          e.preventDefault();
          window.location.href = 'index.html';
        }
        
        // Alt + C: Go to calculator
        if (e.altKey && e.key === 'c') {
          e.preventDefault();
          window.location.href = 'calculator.html';
        }
        
        // Alt + A: Go to about page
        if (e.altKey && e.key === 'a') {
          e.preventDefault();
          window.location.href = 'about.html';
        }
        
        // Escape: Close any open modals or dismiss notifications
        if (e.key === 'Escape') {
          const notification = document.getElementById('welcome-notification');
          if (notification) {
            this.dismissWelcomeMessage(notification);
          }
        }
      });
      
    } catch (error) {
      console.error('Error adding keyboard shortcuts:', error);
    }
  }
}

// Create global app instance
const app = new WiseMMDCApp();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  // Load calculation history on page load (only on calculator page)
  if (window.location.pathname.endsWith('calculator.html')) {
    loadHistory();
  }
});

// --- Student Expense Calculator: Save & Load History ---
function saveCalculation(campusTotal, onlineTotal) {
  fetch('/api/calc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ campusTotal, onlineTotal })
  })
  .then(res => res.json())
  .then(() => loadHistory())
  .catch(err => console.error('Failed to save calculation:', err));
}

function loadHistory() {
  fetch('/api/calcs')
    .then(res => res.json())
    .then(calcs => {
      const historyDiv = document.getElementById('calc-history');
      if (!historyDiv) return;
      historyDiv.innerHTML = '';
      calcs.forEach(calc => {
        const card = document.createElement('div');
        card.className = 'card mb-2';
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">Campus: ₱${calc.campusTotal} | Online: ₱${calc.onlineTotal}</h5>
            <p class="card-text"><small class="text-muted">${new Date(calc.date).toLocaleString()}</small></p>
          </div>
        `;
        historyDiv.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load history:', err));
}

// ====================================
// CSS Animations (injected via JavaScript)
// ====================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;
document.head.appendChild(style);

// ====================================
// Console Welcome Message
// ====================================
console.log('%c🎓 Welcome to Wise MMDC!', 'font-size: 20px; font-weight: bold; color: #1B4F91;');
console.log('%cInteractive features loaded successfully!', 'font-size: 14px; color: #F9B233;');
console.log('This website helps Filipino students compare Traditional vs Online learning expenses.');
console.log('%cKeyboard Shortcuts:', 'font-weight: bold; color: #E31E24;');
console.log('Alt + H: Homepage | Alt + C: Calculator | Alt + A: About | Escape: Dismiss notifications');