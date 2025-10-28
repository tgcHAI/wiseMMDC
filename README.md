# Wise MMDC - Student Expense Comparison

## Project Description

**Status:** Milestone 2 - Interactive Website (Submission)

This project is a web application designed for the **MO-IT120 - Web Systems and Technology** course. Its primary goal is to help Filipino students compare the monthly expenses of a traditional, on-campus learning setup versus an online learning setup, like the one at MMDC.

The application provides an **interactive calculator** where students can input their income and typical expenses for both scenarios to see a direct comparison of their remaining balance in real-time.

This tool aims to help students make more informed financial decisions about their education path.

**🌐 Live Website:** [Click here to visit the live site](https://j0eychnpulpey.github.io/wiseMMDC-Final/index.html)

---

## Team Members - Group 13

### 👥 Team Overview
- **John Paul P.** - Project Lead & Frontend Development
- **Jhaersn C.** - UI/UX Design & Bootstrap Integration
- **Jubiler P.** - JavaScript Development & Interactive Features
- **Reinard R.** - Documentation & Quality Assurance

### 🎯 Individual Contributions

#### John Paul P. (Project Lead)
- **Role:** Project coordination and frontend architecture
- **Contributions:**
  - Designed overall project structure and file organization
  - Implemented responsive navigation and header components
  - Created the hero section and landing page layout
  - Managed project timeline and milestone coordination
  - Ensured Bootstrap integration across all pages

#### Jhaersn C. (UI/UX Designer)
- **Role:** Visual design and user experience
- **Contributions:**
  - Designed color scheme based on Wise MMDC logo
  - Created responsive layouts using Bootstrap grid system
  - Implemented CSS animations and hover effects
  - Designed article cards and blog section layout
  - Ensured mobile-first responsive design principles

#### Jubiler P. (JavaScript Developer)
- **Role:** Interactive functionality and user interactions
- **Contributions:**
  - Developed real-time expense calculation system
  - Implemented dynamic form field creation/deletion
  - Created study mode selection functionality
  - Built sample data loading features
  - Added interactive enhancements (greetings, scroll-to-top, etc.)

#### Reinard R. (Documentation & QA)
- **Role:** Documentation and quality assurance
- **Contributions:**
  - Created comprehensive README documentation
  - Wrote detailed project descriptions and feature lists
  - Implemented privacy compliance features
  - Conducted cross-browser testing
  - Ensured code quality and best practices

---

## Features

### 🏠 Homepage
- Modern landing page with hero section featuring the project image
- Introduces the expense comparison tool with call-to-action buttons
- Blog section with three article cards showcasing student finance topics
  - **⚠️ WARNING:** Article cards display titles and descriptions only (no full articles)
  - **Note:** Full blog articles are NOT included in this website
  - Created for demonstration purposes to meet course criteria and requirements
  - Only the core functionality (calculator) is fully implemented
- Fully responsive design using Bootstrap grid system

### 📊 Interactive Expense Calculator
An interactive page where users can:
- **Select Study Mode**: Choose between Traditional Student or Online Student to load specific sample data
- **Input Monthly Income**: Enter allowance and part-time job earnings
- **Traditional Student Expenses**: Transportation, meals, school supplies, social activities
- **Online Student Expenses**: Internet plan, café costs, digital tools/software
- **Dynamic Fields**: Add custom expense categories with editable labels
- **Real-time Calculations**: Instant updates of totals as you type
- **Load Sample Data**: Quick-fill button to see example comparisons

### 📈 Comparison Summary
- Side-by-side cards showing Traditional vs. Online student breakdown
- Clear display of income, expenses, and remaining balance
- Color-coded values for easy reading
- Responsive layout that stacks on mobile devices

### ℹ️ About Page
- Project information and objectives
- Meet the Team section with detailed team member roles
- Technologies used and project milestones
- Mentor feedback implementation showcase
- Privacy & Data Protection information

---

## Technologies Used

### Milestone 1 (Foundation)
- **HTML5** - Structure and semantic markup
- **CSS3** - Custom styling, layout, and responsive design
- **BEM Methodology** - CSS naming convention for maintainability

### Milestone 2 (Enhancement)
- **Bootstrap 5.3.2** - Responsive framework with:
  - Grid system for responsive layouts
  - Navbar component with mobile hamburger menu
  - Form controls and input styling
  - Button components and utility classes
- **JavaScript** - Interactive features including:
  - Real-time expense calculations
  - Dynamic form field creation and deletion
  - Study mode selection functionality
  - DOM manipulation and event handling
  - Number formatting with comma separators

---

## Project Structure

```
WiseMMDC/
├── html/
│   ├── index.html          # Homepage with hero and blog
│   ├── calculator.html     # Interactive expense calculator
│   └── about.html          # About page with team info
├── css/
│   └── style.css           # Custom styles + Bootstrap integration
├── images/
│   ├── Wise MMDC Logo.png  # Main logo
│   ├── indeximage02.png    # Hero section image
│   ├── 1.png              # Blog article cover 1
│   ├── 2.png              # Blog article cover 2
│   └── 3.png              # Blog article cover 3
├── script.js              # JavaScript functionality (legacy)
└── README.md              # This file
```
Note: Due to an issue with the root directory in Github Pages, I decided not to create any more folders because it did not work. The website did not display "Index.html" as expected; instead, it showed the Readme.md file.
---

## Key Features Added in Milestone 2

✅ **Bootstrap Integration**
- Responsive navigation bar with mobile menu
- Bootstrap grid system across all pages
- Form controls with proper styling
- Button components with consistent styling

✅ **JavaScript Interactivity**
- Real-time expense calculations
- Dynamic form fields (add/remove custom expenses)
- Editable expense labels
- Study mode selection (Traditional/Online)
- Sample data loading functionality
- Number formatting (₱1,000.00 format)

✅ **Enhanced User Experience**
- Blue gradient background for calculator page
- Hover effects on interactive elements
- Smooth animations and transitions
- Mobile-responsive design at all breakpoints

✅ **Privacy Compliance**
- No data collection or storage
- Client-side only calculations
- Compliant with RA 10173 (Data Privacy Act of 2012)


---

## Responsive Design

The website is fully responsive and optimized for:
- 📱 **Mobile devices** (< 768px)
- 📱 **Tablets** (768px - 992px)
- 💻 **Desktops** (> 992px)

---

## How to Use

1. **Visit the Homepage** - Learn about the tool and explore blog articles
2. **Go to Calculator** - Click "Start Comparing" or use the navigation menu
3. **Select Study Mode** (Optional) - Click Traditional or Online student card to load sample data
4. **Enter Your Income** - Input your monthly allowance and part-time job earnings
5. **Enter Your Expenses** - Fill in expenses for both traditional and online scenarios
6. **Add Custom Expenses** - Use the "+ Add Custom Expense" button for additional categories
7. **Compare Results** - View the summary cards showing your remaining balance for each option

---

## Course Information

- **Course:** MO-IT120 - Web Systems and Technology
- **Institution:** MMDC (Mapúa Malayan Digital College)
- **Group:** Group 13
- **Year:** 2025

---

## 📊 Project Planning & Management


### 📋 Feature Development Checklist

#### ✅ Milestone 1 - Static Website (Completed)
- [x] Project structure setup
- [x] HTML semantic markup
- [x] CSS styling with BEM methodology
- [x] Responsive design implementation
- [x] Cross-browser compatibility testing
- [x] GitHub Pages deployment

#### ✅ Milestone 2 - Interactive Website (Completed)
- [x] Bootstrap 5.3.2 integration
- [x] Responsive navigation with mobile menu
- [x] Interactive expense calculator
- [x] Real-time calculation system
- [x] Dynamic form field management
- [x] Study mode selection feature
- [x] Sample data loading functionality
- [x] Enhanced user experience features
- [x] Privacy compliance implementation


### 🚨 Contingency Planning

#### Risk Management Strategies

**Technical Risks:**
- **Browser Compatibility Issues**
  - *Mitigation:* Cross-browser testing on Chrome, Firefox, Safari, Edge
  - *Fallback:* Progressive enhancement approach
  - *Contingency:* CSS vendor prefixes and polyfills

- **JavaScript Functionality Failures**
  - *Mitigation:* Graceful degradation for core features
  - *Fallback:* Server-side calculations as backup
  - *Contingency:* Error handling and user notifications

- **Responsive Design Breakpoints**
  - *Mitigation:* Mobile-first approach with Bootstrap
  - *Fallback:* Flexible grid system
  - *Contingency:* Additional CSS media queries

**Project Management Risks:**
- **Team Member Availability**
  - *Mitigation:* Distributed responsibilities and documentation
  - *Fallback:* Cross-training on all components
  - *Contingency:* Flexible timeline adjustments

- **Scope Creep**
  - *Mitigation:* Clear feature requirements and milestones
  - *Fallback:* Priority-based feature implementation
  - *Contingency:* Version control and rollback capabilities

- **Technical Debt**
  - *Mitigation:* Code reviews and best practices
  - *Fallback:* Refactoring sessions
  - *Contingency:* Modular architecture for easy updates

#### Quality Assurance Process
1. **Code Review:** All changes reviewed by team members
2. **Testing:** Manual testing across different devices and browsers
3. **Documentation:** Updated documentation for all changes
4. **Version Control:** Git branching strategy for feature development
5. **Deployment:** Staged deployment with rollback capability

---


---

## Project Milestones

### ✅ Milestone 1 - Static Website
- Created static HTML structure
- Implemented custom CSS styling with BEM methodology
- Added responsive design for mobile, tablet, and desktop
- Deployed to GitHub Pages

### ✅ Milestone 2 - Interactive Website
- Integrated Bootstrap 5.3.2 framework
- Implemented responsive navbar with mobile menu
- Applied Bootstrap grid system for layouts
- Enhanced forms with Bootstrap form controls
- Added JavaScript interactivity and DOM manipulation
- Created dynamic expense calculator with real-time calculations
- Implemented study mode selection feature


---

## Privacy & Data Protection

🔒 **Your Privacy Matters**

This website does **NOT** collect, store, or transmit any personal information from its users. All calculations are performed locally in your browser. No data is sent to any server or third party.

Compliant with **RA 10173 (Data Privacy Act of 2012)**.

---

## Live Site

You can view the live version of our project deployed on GitHub Pages here:

[🌐 Live Demo](https://j0eychnpulpey.github.io/wiseMMDC-Final/index.html)

---

## Important Notes

⚠️ **WARNING - Blog Articles:** The blog section on the homepage displays article cards with titles and descriptions ONLY. **Full blog articles are NOT included in this website.** The cards serve as placeholder examples to demonstrate layout and design capabilities for course criteria and requirements. Only the core functionality (expense calculator) is fully implemented.

🎓 **Educational Purpose:** This is a student project created for academic purposes as part of the MO-IT120 - Web Systems and Technology course at MMDC.

---

## License

This project is created for educational purposes as part of the MO-IT120 course at MMDC.

---

**© 2025 Wise MMDC - Group 13. Helping Filipino students make informed financial decisions.**
