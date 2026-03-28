# Wise MMDC – Student Expense Comparison

## 📋 Project Overview
**Wise MMDC** is a web application built for the **MO-IT149 Web Technology Application** course at Mapúa Malayan Digital College. It helps students compare the monthly costs of studying on-campus versus studying online.

At its core is a simple calculator where users enter their income and expenses to see a side-by-side breakdown of their remaining balance. This project demonstrates full-stack development by incorporating backend features like user authentication, database storage, and secure file uploads.

**The Team:** 
* Chelsea Jin Collado
* Angela Mae Ortega
* Monina Angela Patiño
* Fen Castañeda

---

## 🔗 Live Links
* **Live Frontend (GitHub Pages):** [https://j0eychnpulpey.github.io/wiseMMDC-Final/index.html](https://j0eychnpulpey.github.io/wiseMMDC-Final/index.html)
* **Deployed Backend (Render):** [https://wisemmdc.onrender.com](https://wisemmdc.onrender.com)

---

## ✨ Main Features
### 🧮 Expense Calculator
* Compare traditional vs. online student costs with real-time updates.
* Add custom expense categories to personalize your budget.
* Data persistence using Local Storage for quick comparisons.

### 🔐 Authentication & Security
* **Google OAuth 2.0:** Secure login using institutional or personal Google accounts.
* **Role-Based Access Control (RBAC):** Specific views and permissions for 'Admin' vs. 'User' roles.
* **JWT Protection:** API endpoints secured with JSON Web Tokens.
* **Security Headers:** Implemented using Helmet and Express Validator for input sanitization.

### 📁 File Management
* **Secure Uploads:** Users can upload documents (JPG, PNG, PDF, DOCX).
* **Cloud Storage:** Integrated with **Supabase Storage** for high availability.
* **Fallback System:** Automatic local file system storage if cloud services are unreachable.

---

## 🛠 Tech Stack
| Layer | Technologies |
| :---  | :--- |
| **Frontend** | HTML5, CSS3, Bootstrap 5, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Storage** | Supabase Storage (Cloud) / Local Disk |
| **Auth** | Passport.js, Google OAuth 2.0, JWT |
| **Deployment** | GitHub Pages (Frontend), Render (Backend) |

---

## 🚀 How to Use
1. **Access the Calculator:** Visit the live site and navigate to the calculator section.
2. **Input Data:** Enter your monthly income and fill in the expense fields for both "On-Campus" and "Online" modes.
3. **Compare:** Review the side-by-side summary to determine which setup is more cost-effective.
4. **Login:** Use the **Google Login** button to access your profile and the document upload dashboard.

> **Note:** This is a student project for academic purposes. Blog content and news items are placeholders for display only.

---

## 📜 Changelog
* **LOG-01** | Updated project status from Milestone 2 to Milestone 4.
* **LOG-02** | Enhanced project description with full-stack context and security features.
* **LOG-03** | Expanded Technologies Used section (Google Auth, CORS, Express Session).
* **LOG-04** | Detailed project structure documentation for all directories.
* **LOG-05** | Enhanced Key Features section with database and RBAC details.
* **LOG-06** | Expanded Project Milestones with accomplishments for all four phases.
* **LOG-07** | Added backend server information and port configurations.
* **LOG-08** | **Final Deployment** | Successfully deployed the Node.js backend to Render. Configured production environment variables and updated Google OAuth Redirect URIs for the live domain.

---

## ⚖️ Privacy
This project complies with the **Data Privacy Act of 2012 (RA 10173)**. User information and uploaded files are used strictly for academic demonstration and are handled with industry-standard security practices.
