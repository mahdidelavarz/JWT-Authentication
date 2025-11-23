# 🔐 Next.js JWT Authentication System with OTP

A complete, production-ready authentication system built with Next.js 14, featuring JWT token management, OTP verification via SMS, and secure user management.

---

## 📋 Table of Contents

- [Overview](#overview)
- [How JWT Authentication Works](#how-jwt-authentication-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Development Notes](#development-notes)

---

## 🎯 Overview

This authentication system provides a secure, modern approach to user authentication using:

- **Phone-based authentication** with OTP (One-Time Password)
- **JWT tokens** for stateless authentication
- **Dual-token system** (Access Token + Refresh Token)
- **Automatic token refresh** mechanism
- **Protected routes** with middleware
- **Profile completion** flow

---

## 🔑 How JWT Authentication Works

### What is JWT?

**JWT (JSON Web Token)** is a compact, URL-safe means of representing claims between two parties. It consists of three parts:

1. **Header**: Contains token type and signing algorithm
2. **Payload**: Contains the claims (user data)
3. **Signature**: Ensures the token hasn't been tampered with

Example JWT structure:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiY3VzdG9tZXIifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Our Dual-Token Strategy

#### 1. **Access Token** (Short-lived - 15 minutes)
- Stored in **httpOnly cookie** (protected from XSS attacks)
- Used for authenticating API requests
- Cannot be accessed by JavaScript
- Automatically sent with every request

#### 2. **Refresh Token** (Long-lived - 7 days)
- Stored in **Zustand store** (persisted to localStorage)
- Used to obtain new access tokens
- Hashed and stored in database
- Can be revoked server-side

### Authentication Flow

```
┌─────────────┐
│   User      │
│ Enter Phone │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Send OTP SMS   │
│  (Kavenegar)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Verify OTP     │
│  Code (4 digit) │
└──────┬──────────┘
       │
       ▼
┌─────────────────────────┐
│  Generate Tokens        │
│  • Access (httpOnly)    │
│  • Refresh (Zustand)    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  User Authenticated     │
│  Access protected pages │
└─────────────────────────┘
```

### Auto-Refresh Mechanism

When an access token expires:

```
API Request → 401 Error → Interceptor Catches
    ↓
Check Refresh Token in Zustand
    ↓
Call /api/auth/refresh
    ↓
Generate New Access Token → Set in Cookie
    ↓
Retry Original Request → Success
```

---

## ✨ Features

- ✅ **Phone-based OTP authentication**
- ✅ **Dual JWT token system** (Access + Refresh)
- ✅ **Automatic token refresh** with retry queue
- ✅ **httpOnly cookies** for XSS protection
- ✅ **Protected routes** with middleware
- ✅ **Profile completion** flow
- ✅ **Session management** and logout
- ✅ **Login history** tracking
- ✅ **Rate limiting** on OTP requests
- ✅ **Type-safe** with TypeScript
- ✅ **Responsive UI** with Tailwind CSS
- ✅ **Toast notifications** for user feedback

---

## 🛠 Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Authentication & Security
- **jsonwebtoken** - JWT token generation/verification
- **bcryptjs** - Password hashing for refresh tokens

### State Management
- **Zustand** - Global state (refresh token storage)
- **React Query** - Server state management & caching

### HTTP & API
- **Axios** - HTTP client with interceptors
- **Next.js API Routes** - Backend endpoints

### Database
- **Supabase** - PostgreSQL database with real-time features

### SMS Service
- **Kavenegar** - Iranian SMS gateway for OTP delivery

### UI Components
- **Iconify** - Icon library
- **React Hot Toast** - Toast notifications
- **React Hook Form** - Form validation

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page (public)
│   ├── providers.tsx              # React Query provider
│   ├── login/
│   │   └── page.tsx              # Login page with OTP flow
│   ├── profile/
│   │   └── page.tsx              # Profile page (protected)
│   └── api/
│       ├── auth/
│       │   ├── send-otp/         # Send OTP via SMS
│       │   ├── verify-otp/       # Verify OTP & login
│       │   ├── refresh/          # Refresh access token
│       │   ├── logout/           # Logout & revoke tokens
│       │   └── me/               # Get current user
│       └── profile/
│           └── complete/         # Complete user profile
├── components/
│   ├── auth/
│   │   ├── OTPForm.tsx           # Phone number input
│   │   └── VerifyOTPForm.tsx     # OTP verification
│   ├── profile/
│   │   └── CompleteProfileForm.tsx
│   └── layout/
│       └── Header.tsx            # Navigation header
├── lib/
│   ├── supabase.ts               # Supabase client config
│   ├── jwt.ts                    # JWT utilities
│   ├── kavenegar.ts              # SMS service
│   └── api-client.ts             # Axios with auto-refresh
├── store/
│   └── auth.store.ts             # Zustand auth store
├── hooks/
│   ├── useAuth.ts                # Auth operations hook
│   └── useProtectedRoute.ts      # Route protection hook
├── types/
│   └── index.ts                  # TypeScript interfaces
└── middleware.ts                 # Edge middleware for protection
```

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Supabase account** with a project
- **Kavenegar account** with API key (Iranian SMS service)
- Basic knowledge of React and Next.js

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd next-jwt-auth-system
```

### 2. Install Dependencies

```bash
npm install
```

Required packages:
```bash
npm install zustand @tanstack/react-query axios jsonwebtoken bcryptjs @iconify/react react-hot-toast @supabase/supabase-js
npm install -D @types/jsonwebtoken @types/bcryptjs
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Kavenegar SMS Service
KAVENEGAR_API_KEY=your-kavenegar-api-key
KAVENEGAR_SENDER=your-sender-number

# JWT Secrets (Generate strong secrets!)
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters-long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

**⚠️ Important**: Generate strong secrets using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄 Database Setup

### Supabase Schema

Execute the following SQL in your Supabase SQL Editor:

#### 1. Users Table

```sql
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4(),
  email VARCHAR(255),
  phone_number TEXT UNIQUE,
  role VARCHAR(50) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  full_name VARCHAR,
  address TEXT,
  postal_code VARCHAR,
  profile_completed BOOLEAN DEFAULT false,
  birthday DATE,
  updated_at TIMESTAMPTZ,
  
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_phone_number_key UNIQUE (phone_number),
  CONSTRAINT users_role_check CHECK (role IN ('customer', 'admin')),
  CONSTRAINT valid_iranian_phone CHECK (
    phone_number ~ '^09[0-9]{9}$' OR phone_number IS NULL
  )
);

-- Indexes for performance
CREATE INDEX idx_users_email ON public.users (email);
CREATE INDEX idx_users_phone_number ON public.users (phone_number);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();
```

#### 2. Refresh Tokens Table

```sql
CREATE TABLE public.refresh_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT refresh_tokens_token_hash_key UNIQUE (token_hash),
  CONSTRAINT refresh_tokens_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_refresh_tokens_user_id ON public.refresh_tokens (user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON public.refresh_tokens (token_hash);
CREATE INDEX idx_refresh_tokens_expires_at ON public.refresh_tokens (expires_at);
CREATE INDEX idx_refresh_tokens_revoked ON public.refresh_tokens (revoked) 
  WHERE revoked = false;
```

#### 3. OTP Codes Table

```sql
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  phone_number VARCHAR(15) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified BOOLEAN DEFAULT false,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT otp_codes_pkey PRIMARY KEY (id)
);

-- Index for quick lookups
CREATE INDEX idx_phone_otp ON public.otp_codes (phone_number, verified, expires_at);
```

#### 4. Login Log Table

```sql
CREATE TABLE public.loginlog (
  id UUID NOT NULL DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL,
  login_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT loginlog_pkey PRIMARY KEY (id),
  CONSTRAINT loginlog_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for user login history
CREATE INDEX idx_login_log_user_id ON public.loginlog (user_id);
```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | `eyJhbGc...` |
| `KAVENEGAR_API_KEY` | Kavenegar API key | `xxx` |
| `KAVENEGAR_SENDER` | Your Kavenegar sender number | `1000xxx` |
| `JWT_ACCESS_SECRET` | Secret for access token (min 32 chars) | `abc123...` |
| `JWT_REFRESH_SECRET` | Secret for refresh token (min 32 chars) | `xyz789...` |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiration | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | `7d` |

---

## 📖 Usage

### Starting the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### Authentication Flow

#### 1. **Login/Signup** (`/login`)
- User enters Iranian phone number (09xxxxxxxxx)
- System generates 4-digit OTP
- OTP sent via Kavenegar SMS
- In development mode, OTP shown in toast notification

#### 2. **OTP Verification**
- User enters 4-digit code
- System verifies code (max 5 attempts)
- Valid for 2 minutes
- On success, generates JWT tokens

#### 3. **Profile Completion** (`/profile`)
- New users redirected to complete profile
- Required: Full name, Address
- Optional: Postal code, Birthday

#### 4. **Protected Access**
- Access token in httpOnly cookie
- Refresh token in Zustand/localStorage
- Automatic token refresh on expiry

#### 5. **Logout**
- Revokes all refresh tokens
- Clears cookies and local storage
- Redirects to login page

---

## 🌐 API Endpoints

### Authentication

#### POST `/api/auth/send-otp`
Send OTP to phone number

**Request:**
```json
{
  "phone_number": "09123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "کد تایید با موفقیت ارسال شد",
  "otpCode": "1234"  // Development only
}
```

#### POST `/api/auth/verify-otp`
Verify OTP and login/signup

**Request:**
```json
{
  "phone_number": "09123456789",
  "otp_code": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "ورود موفقیت‌آمیز",
  "user": { ... },
  "refreshToken": "eyJhbGc...",
  "requiresProfileCompletion": false
}
```

#### POST `/api/auth/refresh`
Refresh access token

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully"
}
```
*Sets new access token in httpOnly cookie*

#### GET `/api/auth/me`
Get current authenticated user

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "phone_number": "09123456789",
    "full_name": "John Doe",
    "address": "Tehran, Iran",
    "profile_completed": true,
    ...
  }
}
```

#### POST `/api/auth/logout`
Logout and revoke tokens

**Response:**
```json
{
  "success": true,
  "message": "خروج موفقیت‌آمیز"
}
```

### Profile

#### POST `/api/profile/complete`
Complete user profile

**Request:**
```json
{
  "full_name": "John Doe",
  "address": "Tehran, Iran",
  "postal_code": "1234567890",
  "birthday": "1990-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "message": "پروفایل با موفقیت تکمیل شد",
  "user": { ... }
}
```

---

## 🔒 Security Features

### 1. **XSS Protection**
- Access tokens in httpOnly cookies (not accessible via JavaScript)
- Content Security Policy headers
- Input sanitization

### 2. **CSRF Protection**
- SameSite cookie attribute
- Origin verification

### 3. **Token Security**
- Refresh tokens hashed with bcrypt
- Short-lived access tokens (15 min)
- Token rotation on refresh

### 4. **Rate Limiting**
- 1 OTP request per minute per phone
- Max 5 OTP verification attempts
- Login attempt logging

### 5. **Data Validation**
- Phone number format validation
- OTP code validation
- SQL injection prevention via Supabase

### 6. **Secure Storage**
- Refresh tokens hashed in database
- httpOnly cookies for access tokens
- No sensitive data in localStorage

---

## 🔧 Development Notes

### Testing OTP Without SMS

For development, OTP codes are displayed in toast notifications. To disable:

1. Remove `otpCode` from response in `app/api/auth/send-otp/route.ts`
2. Remove toast display in `components/auth/OTPForm.tsx`

### Custom Hooks

#### `useAuth()`
Provides authentication operations:
```typescript
const { user, isAuthenticated, logout, initializeUser } = useAuth();
```

#### `useProtectedRoute()`
Protects routes from unauthorized access:
```typescript
const { user, isLoading } = useProtectedRoute();
```

### Middleware

Edge middleware (`middleware.ts`) runs before page load:
- Validates access tokens
- Redirects unauthenticated users
- Prevents authenticated users from accessing login

### Automatic Token Refresh

Axios interceptor in `lib/api-client.ts`:
1. Catches 401 responses
2. Calls refresh endpoint
3. Retries failed requests
4. Queues concurrent requests

---

## 🚀 Production Deployment

### Pre-deployment Checklist

- [ ] Set strong JWT secrets (min 32 characters)
- [ ] Configure Supabase RLS policies
- [ ] Enable HTTPS only
- [ ] Remove development OTP toast
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging
- [ ] Test token refresh flow
- [ ] Verify SMS delivery

### Environment Variables (Production)

Ensure all environment variables are set in your hosting platform (Vercel, etc.):
- Use different JWT secrets for production
- Secure Supabase service role key
- Valid Kavenegar credentials

---

## 📝 License

MIT License - feel free to use this project for learning or production.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Contact: your-email@example.com

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Kavenegar for SMS services
- All open-source contributors

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**