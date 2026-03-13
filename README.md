# Wise MMDC - Student Expense Comparison

<img width="1615" height="786" alt="{343B75DC-B39F-48AC-81F6-0F69DC5A1879}" src="https://github.com/user-attachments/assets/d26ebf78-6f05-41b0-8235-ffd07f2bac6a" />

## Project Description

**Status:** Milestone 2 - Secure Web Application with Authentication and File Storage

This project is a web application designed for the **MO-IT149 - Web Technology Application** course. Its primary goal is to help Filipino students compare the monthly expenses of a traditional, on-campus learning setup versus an online learning setup, like the one at MMDC.

The application provides an **interactive calculator** where students can input their income and typical expenses for both scenarios to see a direct comparison of their remaining balance in real-time.

In addition to the calculator, the system was enhanced with **backend functionality**, including:

- **MongoDB database integration**
- **Google OAuth authentication**
- **Role-Based Access Control (RBAC)**
- **Secure file upload and storage**
- **API endpoints for data management**
- **Input validation and centralized error handling**

This tool aims to help students make more informed financial decisions about their education path.

**🌐 Live Website:** [Click here to visit the live site](https://j0eychnpulpey.github.io/wiseMMDC-Final/index.html)

---

## Team Members - Group 5

### 👥 Team Overview
- **Jhaersn Fen Castañeda** - Project Lead & Frontend Development
- **Chelsea Jin Collado** - UI/UX Design & Bootstrap Integration
- **Angela Mae Ortega** - JavaScript Development & Interactive Features
- **Monina Angela Patiño** - Documentation & Quality Assurance

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
- **💾 Local Storage**: Automatic data persistence - your inputs are saved and restored when you refresh the page

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

### Frontend Technologies
- **HTML5** – Semantic structure and markup
- **CSS3** – Custom styling and responsive design
- **Bootstrap 5.3.2** – Responsive UI framework
- **JavaScript (Vanilla JS)** – Interactive calculator and dynamic UI
- **Local Storage API** – Client-side data persistence

### Backend Technologies
- **Node.js** – JavaScript runtime environment
- **Express.js** – Web application framework
- **MongoDB Atlas** – Cloud NoSQL database
- **Mongoose** – MongoDB object modeling

### Authentication & Security
- **Google OAuth 2.0** – Secure user authentication
- **Passport.js** – OAuth authentication middleware
- **JWT (JSON Web Tokens)** – Secure API authentication
- **Helmet.js** – HTTP security headers
- **Express Validator** – Input validation

### File Storage
- **Multer** – File upload middleware
- **Supabase Storage** – Cloud file storage 
- **Local Storage Fallback** – Server-based file storage

### Development Tools
- **Git & GitHub** – Version control and collaboration
- **GitHub Pages** – Static site deployment
- **Postman** – API testing
- **dotenv** – Environment variable management
---

## Project Structure

```
WiseMMDC/
│
├── public/ # Frontend files
│ ├── index.html
│ ├── calculator.html
│ ├── about.html
│ └── uploads/ # Local uploaded files
│
├── models/ # Database models
│ ├── User.js
│ └── Calc.js
│
├── config/ # Configuration files
│ └── supabase.js
│
├── server.js # Main backend server
├── .env # Environment variables
├── package.json
└── README.md
---

## Key Features Added in Milestone 2

### 🔐 Authentication & User Management
- Google OAuth login system
- Session-based authentication
- JWT token authentication for APIs
- Role-Based Access Control (Admin / User)
- Protected routes for secure resources

### 📂 File Upload & Storage
- Secure file upload using Multer
- File type and size validation
- Local file storage fallback
- Optional Supabase cloud storage integration
- Admin access to all uploaded files
- Users can view their own uploaded files

### 🗄️ Database Integration
- MongoDB Atlas cloud database
- Mongoose schema modeling
- CRUD operations for calculations and uploaded files
- Database plan worksheet used to design collections and document structures

### 🛡️ Security Features
- Helmet middleware for secure HTTP headers
- Express-validator for request validation
- Centralized error handling middleware
- Environment variable protection using dotenv

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
8. **💾 Data Persistence** - Your data is automatically saved! Refresh the page anytime and your inputs will be restored

---

## Course Information

- **Course:** MO-IT149 - Web Technology Application
- **Institution:** MMDC (Mapúa Malayan Digital College)
- **Group:** Group 5
- **Year:** 2026

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
- [x] **💾 Local Storage Integration** - Automatic data persistence and restoration


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

### ✅ Milestone 1 - Functional Web App with CRUD and API Integration
- Implemented CRUD operations (Create, Read, Update, Delete) to manage application data.
- Integrated API endpoints using Express.js.
- Retrieved and displayed data dynamically from the backend.
- Ensured that data can be created, viewed, updated, and deleted correctly through the system.

### ✅ Milestone 2 - Secure Web App with Authentication and File Storage
- File Storage: Tested file uploads with valid/invalid types and verified secure storage and retrieval.
- User Authentication: Tested login with valid/invalid credentials and confirmed correct token issuance.
- Middleware & RBAC: Verified protected routes block unauthorized access and enforce role-based permissions.
- Error Handling: Simulated invalid inputs and confirmed proper error messages and HTTP status codes.
- Security: Verified Helmet.js headers and ensured inputs are validated and sanitized.


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

**© 2026 Wise MMDC - Group 5. Helping Filipino students make informed financial decisions.**

