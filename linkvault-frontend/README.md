# LinkVault — Frontend

React + Tailwind CSS frontend for the LinkVault bookmark manager.

---

## Requirements

- Node.js v22.17.1
- npm

---

## Key Libraries

| Library | Version | Purpose |
|---|---|---|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering |
| react-router-dom | ^7.4.1 | Client-side routing |
| axios | ^1.8.4 | HTTP requests to Django API |
| tailwindcss | ^3.4.17 | Utility-first CSS styling |
| vite | ^6.2.0 | Build tool and dev server |

---

## Setup

**1. Navigate to the frontend folder**

    cd linkvault-frontend

**2. Install dependencies**

    npm install

**3. Configure API URL**

Open `src/api/axios.js` and make sure the base URL points to your Django backend:

    baseURL: 'http://127.0.0.1:8000/api'

**4. Start the development server**

    npm run dev

App runs at `http://localhost:5173`

> Make sure the Django backend is running before starting the frontend.

---

## Pages & Features

### Login Page — `/login`
- Username and password input fields
- Submits credentials to `/api/auth/login/`
- On success, stores JWT access and refresh tokens in localStorage
- Redirects to Dashboard on successful login
- Shows error message on invalid credentials
- Link to Signup page

### Signup Page — `/signup`
- Username and password input fields
- Submits to `/api/auth/signup/`
- Redirects to Login page after successful registration
- Shows error if username is already taken

### Dashboard Page — `/`
- Protected route — redirects to Login if not authenticated
- **Sidebar** showing all Collections and Tags for filtering
- Clicking a Collection filters links belonging to that folder
- Clicking a Tag filters links with that label
- **Quick Capture Bar** — paste any URL and press Enter to instantly save it
- **Search Bar** — filters links in real time by title, URL, or note
- **+ Add Link Button** — opens a modal to save a new link with full details
- **Link Cards** showing title, URL, note, tags, and collection
- **Mark Read / Unread** button on each link card
- **Delete** button on each link card
- **Logout** button in the navbar

### Add Link Modal
- URL field (required)
- Title field (optional)
- Note field (optional)
- Collection dropdown — assign link to a folder
- Tag selector — click tags to toggle them on/off
- Save and Cancel buttons
