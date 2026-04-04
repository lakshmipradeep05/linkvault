# LinkVault — Backend

Django REST API for the LinkVault bookmark manager.

---

## Requirements

- Python 3.13.2
- pip

---

## Key Packages

| Package | Purpose |
|---|---|
| Django 6.0.3 | Core web framework |
| djangorestframework | REST API toolkit |
| djangorestframework-simplejwt | JWT authentication |
| django-cors-headers | Allow React frontend to call the API |

---

## 🚀 Setup

**1. Navigate to the backend folder**

    cd linkvault-backend

**2. Create and activate virtual environment**

    python -m venv venv

    # Windows
    venv\Scripts\activate

    # Mac/Linux
    source venv/bin/activate

**3. Install dependencies**

    pip install -r requirements.txt

**4. Run migrations**

    python manage.py migrate

**5. Create a superuser**

    python manage.py createsuperuser

**6. Start the server**

    python manage.py runserver

API runs at `http://127.0.0.1:8000`
Admin panel at `http://127.0.0.1:8000/admin`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/signup/` | Register a new user | No |
| POST | `/api/auth/login/` | Login and receive JWT tokens | No |
| POST | `/api/auth/refresh/` | Refresh access token | No |

**Signup request body:**

    {
        "username": "john",
        "password": "secret123"
    }

**Login response:**

    {
        "access": "<access_token>",
        "refresh": "<refresh_token>"
    }

---

### Links

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/links/` | Get all links for logged in user | Yes |
| POST | `/api/links/` | Create a new link | Yes |
| PATCH | `/api/links/:id/` | Update a link | Yes |
| DELETE | `/api/links/:id/` | Delete a link | Yes |

**Filtering:**
- By tag: `/api/links/?tag=1`
- By collection: `/api/links/?collection=1`

**Create link request body:**

    {
        "url": "https://example.com",
        "title": "Example",
        "note": "Optional note",
        "collection_id": 1,
        "tag_ids": [1, 2]
    }

---

### Tags

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tags/` | Get all tags for logged in user | Yes |
| POST | `/api/tags/` | Create a new tag | Yes |
| DELETE | `/api/tags/:id/` | Delete a tag | Yes |

**Create tag request body:**

    {
        "name": "python"
    }

---

### Collections

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/collections/` | Get all collections for logged in user | Yes |
| POST | `/api/collections/` | Create a new collection | Yes |
| DELETE | `/api/collections/:id/` | Delete a collection | Yes |

**Create collection request body:**

    {
        "name": "Work"
    }

---

## Authentication

All protected endpoints require a JWT access token in the request header:

    Authorization: Bearer <access_token>

Tokens are obtained from the `/api/auth/login/` endpoint.
Access tokens expire after **1 day**. Use the refresh token at `/api/auth/refresh/` to get a new one.

---
