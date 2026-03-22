# CORS Configuration Required

## Problem
Browser blocks requests from `localhost:3000` (Next.js) to `127.0.0.1:8000` (Django) due to CORS policy.

## Solution
Add CORS headers to your Django backend.

### 1. Install django-cors-headers
```bash
pip install django-cors-headers
```

### 2. Update Django settings.py

Add to INSTALLED_APPS:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]
```

Add to MIDDLEWARE (must be before CommonMiddleware):
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]
```

Add CORS configuration:
```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# OR for development (less secure):
CORS_ALLOW_ALL_ORIGINS = True

# Allow credentials if needed
CORS_ALLOW_CREDENTIALS = True

# Allow these headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 3. Restart Django server
```bash
python manage.py runserver
```

### 4. Test
Open browser console at http://localhost:3000 and check:
- No CORS errors
- API requests succeed
- Data loads properly

## Verify CORS is working
```bash
# Should include Access-Control-Allow-Origin header
curl -I http://127.0.0.1:8000/api/v1/attractions/
```
