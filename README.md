# AgroMart — Agricultural Supply Chain Management System

AgroMart is a full-stack agricultural supply-chain management application for managing farmers, products, warehouses, vehicles, shipments, purchase orders, weather-related logistics, food spoilage, and operational provenance.

The system is designed around a clear separation between **authenticated application users** and **farmers**. Farmers are business records entered by staff and do not create accounts or log in.

## Overview

AgroMart provides:

- Secure authentication with Supabase Auth
- Role-based access control for `user`, `admin`, and `superadmin`
- Controlled Admin / Super Admin registration requests
- Farmer management as a separate business entity
- Product and inventory management
- Warehouse and vehicle management
- Purchase-order and order-item management
- Shipment and logistics tracking
- Weather-event tracking
- Food-spoilage monitoring
- Operational provenance events
- Super Admin audit history showing who performed changes
- Protected backend API gateway
- React/Vite frontend with an Express backend
- Supabase PostgreSQL database
- Railway-compatible production startup

## Architecture

```text
┌───────────────────────────────┐
│        React / Vite UI        │
│  Authentication + Dashboard   │
└───────────────┬───────────────┘
                │ HTTPS / Bearer JWT
                ▼
┌───────────────────────────────┐
│     Secure Express Gateway    │
│       secure-server.cjs       │
│                               │
│ • JWT validation              │
│ • Profile / role validation   │
│ • Admin authorization         │
│ • Super Admin authorization   │
│ • Audit logging               │
│ • Request forwarding          │
└───────────────┬───────────────┘
                │ internal HTTP
                ▼
┌───────────────────────────────┐
│       Application API         │
│          server.cjs          │
│                               │
│ • Business logic              │
│ • CRUD operations             │
│ • Provenance events           │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│     Supabase PostgreSQL       │
│                               │
│ profiles / farmers / products │
│ orders / shipments / etc.     │
└───────────────────────────────┘
```

## User and Role Model

### Authenticated users

Application operators are stored in Supabase Auth and have corresponding records in the `profiles` table.

Supported roles:

| Role | Access |
|---|---|
| `user` | Normal application operations permitted to authenticated users |
| `admin` | User-level access plus administrative CRUD and staff governance |
| `superadmin` | Full administrative access plus audit history and Super Admin governance |
| `pending` | Registration/request state; cannot access protected application operations |

### Farmers are NOT users

Farmers are operational/business records stored separately in the `farmer` table.

- Farmers do not register.
- Farmers do not log in.
- Farmers do not receive application roles.
- Staff manually enter farmer information when an order is received.

This separation is intentional and must be preserved.

## Registration and Approval Workflow

```text
User submits registration request
              │
              ▼
       Supabase Auth user
              │
              ▼
        profiles record
       role = pending
              │
              ▼
     Admin / Super Admin review
          │          │
       approve     reject/hold
          │
          ▼
     Assigned application role
          │
          ▼
      User can sign in
```

Administrative registration must never allow an unauthorised browser user to self-promote to `admin` or `superadmin`. Role changes must remain protected by backend authorization and database policies.

## Authorization Model

All `/api/*` requests are protected by the secure gateway.

The gateway:

1. Requires a Bearer access token.
2. Validates the token using Supabase Auth.
3. Loads the authenticated user's `profiles` record.
4. Rejects missing, pending, or unsupported profiles.
5. Enforces Admin/Super Admin route restrictions.
6. Forwards authenticated actor identity to the application API.
7. Records mutating requests in `system_audit_log` when the audit service client is configured.

### Super Admin audit history

Super Admins can view the audit history containing information such as:

- Actor/user ID
- Actor name
- Actor role
- HTTP action/method
- API endpoint
- Business entity
- Entity ID
- Sanitized request summary
- HTTP status code
- Timestamp

Normal Admin users must not be able to view the Super Admin audit history.

## Core Business Workflow

```text
Farmer
  │
  │ manual business entry
  ▼
Purchase Order
  │
  ├── Order Items ──► Products / quantities / prices
  │
  ▼
Inventory / Warehouse
  │
  ▼
Shipment
  │
  ├── Vehicle
  ├── Weather Event
  └── Spoilage monitoring
  │
  ▼
Delivery / operational tracking
  │
  ▼
Provenance + audit records
```

## Main Data Domains

The backend currently works with business domains including:

- `district`
- `farmer`
- `product`
- `warehouse`
- `vehicle`
- `shipment`
- `weather_event`
- `purchase_order`
- `order_item`
- `food_spoilage`
- `provenance_event`
- `audit_price_change`
- `profiles`
- `system_audit_log`

The exact schema, constraints, indexes, functions, triggers, and Row Level Security policies are maintained in the connected Supabase project/database migrations.

## Project Structure

```text
Agromart-Supply-chain-Mangement-System/
├── src/                  # React application source
├── public/               # Static application assets/pages
├── scripts/              # Development/launcher scripts
├── server.cjs            # Core Express application API
├── secure-server.cjs     # Production authentication/API gateway
├── index.html            # Vite entry point
├── package.json          # Dependencies and npm scripts
├── package-lock.json     # Locked dependency versions
├── vite.config.*         # Vite configuration, if present
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── .gitignore            # Ignored local/generated files
└── README.md             # Project documentation
```

> `node_modules/`, `dist/`, and environment files are generated/local artifacts and should not be committed to the repository.

## Technology Stack

### Frontend

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion

### Backend

- Node.js 20+
- Express 5
- CORS
- Supabase JavaScript client

### Authentication and Database

- Supabase Auth
- Supabase PostgreSQL
- Row Level Security (RLS)
- Database triggers/functions where required by the schema

### Deployment

- Railway
- Production entry point: `secure-server.cjs`

## Environment Variables

Create a local `.env` file for development. **Never commit secrets.**

Typical server-side configuration:

```env
PORT=3000
INTERNAL_PORT=3001
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<supabase-publishable-or-anon-key>
SUPABASE_SERVICE_KEY=<server-only-secret-key>
```

For browser/Vite configuration, use only public/publishable Supabase configuration where required, for example:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<supabase-publishable-or-anon-key>
```

### Secret-handling rules

- Never put a Supabase service/secret key in frontend code.
- Never commit `.env` files.
- Never expose `SUPABASE_SERVICE_KEY` to the browser.
- Use Railway environment variables for production secrets.
- Rotate a secret immediately if it is accidentally committed or exposed.

## Installation

### Requirements

- Node.js 20 or newer
- npm
- A configured Supabase project

### Install dependencies

```bash
npm ci
```

For local development where dependencies have changed:

```bash
npm install
```

## Development

Start the secure development launcher:

```bash
npm run dev
```

Run the Vite frontend directly:

```bash
npm run dev:web
```

Run the API/gateway:

```bash
npm run api
```

## Production Build

Build the frontend:

```bash
npm run build
```

Start the production gateway:

```bash
npm start
```

The production gateway listens on Railway's `PORT` and starts the internal application server on `INTERNAL_PORT`.

## Railway Deployment

Railway should use the repository's production start script:

```bash
npm start
```

The application expects the following production configuration at minimum:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` or the configured publishable key
- `SUPABASE_SERVICE_KEY` for server-side audit/database operations where required
- `PORT` supplied by Railway

After deployment, verify:

1. The service starts without crashing.
2. The root route redirects to `/login`.
3. Authentication succeeds with a valid Supabase account.
4. An authenticated user can access permitted API operations.
5. Admin-only operations reject normal users.
6. Super Admin-only audit endpoints reject Admin users.
7. Database reads/writes succeed.
8. Mutating actions appear in `system_audit_log`.
9. Frontend production assets load correctly.

## API Security

The public production entry point is the secure gateway rather than exposing the internal application server directly.

The gateway validates:

```text
Authorization: Bearer <Supabase access token>
```

It then passes trusted actor metadata internally to the application server.

Do not bypass the gateway in production unless the authorization model is redesigned and independently verified.

## Testing Checklist

### Authentication

- [ ] New user registration creates the expected Supabase Auth user.
- [ ] The `profiles` record is created correctly.
- [ ] New administrative requests remain pending until approved.
- [ ] Valid users can log in.
- [ ] Invalid credentials are rejected.
- [ ] Expired/invalid access tokens are rejected.
- [ ] Users without a valid profile cannot access protected APIs.

### Role authorization

- [ ] Normal users cannot access Admin-only mutations.
- [ ] Admins can perform permitted administrative operations.
- [ ] Admins cannot view Super Admin audit history.
- [ ] Super Admins can view audit history.
- [ ] Users cannot modify their own role through an unprotected endpoint.

### Farmers

- [ ] Staff can create a farmer record.
- [ ] Staff can update a farmer record.
- [ ] Staff can view farmer records.
- [ ] Farmer data is not treated as authentication data.
- [ ] Farmers do not need an account.

### Products and inventory

- [ ] Products can be created, updated, viewed, and deleted according to role permissions.
- [ ] Prices and stock quantities persist correctly.
- [ ] Invalid product input is rejected.

### Orders and logistics

- [ ] Purchase orders can be created and updated.
- [ ] Order items reference valid products.
- [ ] Shipments reference valid operational records.
- [ ] Vehicles and warehouses behave correctly.
- [ ] Weather/spoilage information is persisted correctly.

### Auditability

- [ ] Mutating API calls create audit entries.
- [ ] Audit entries identify the authenticated actor.
- [ ] Passwords/tokens/secrets are never written into audit summaries.
- [ ] Failed mutations do not appear as successful operations.

## Operational Provenance vs Security Audit

AgroMart contains two different concepts that should not be confused:

**Provenance events** describe business/operational events, such as a farmer or product being created or a shipment changing state.

**Security audit logs** describe authenticated application actions, including which user made a protected API request, which endpoint was called, and its result.

Both are valuable, but they serve different purposes.

## Error Handling

The backend returns JSON errors for API failures. Production debugging should use Railway logs and Supabase logs rather than exposing sensitive server details to users.

Do not return:

- service keys
- access/refresh tokens
- passwords
- internal stack traces
- database credentials

## Security Checklist

Before production release:

- [ ] `.env` is not committed.
- [ ] Supabase service/secret keys are server-only.
- [ ] RLS policies are enabled and verified for protected tables.
- [ ] Role changes are server/database-authorized.
- [ ] Admin and Super Admin routes are protected.
- [ ] Audit logging is enabled.
- [ ] Audit data does not contain secrets.
- [ ] CORS is configured appropriately for production.
- [ ] Production dependencies install successfully with `npm ci`.
- [ ] `npm run build` succeeds.
- [ ] Railway deployment starts successfully.
- [ ] No generated dependency directories are committed.

## Git Workflow

Use feature branches for changes rather than committing directly to `main`.

Recommended branch naming:

```text
feature/<short-description>
fix/<short-description>
hotfix/<short-description>
chore/<short-description>
```

Recommended workflow:

```text
git checkout -b feature/my-change
# make and test changes
git add .
git commit -m "feat: describe the change"
git push -u origin feature/my-change
# open Pull Request → review → CI → merge
```

## Recommended Commit Convention

Use clear conventional-style commit messages:

- `feat:` new functionality
- `fix:` bug fix
- `security:` security hardening
- `refactor:` code restructuring
- `docs:` documentation
- `test:` tests
- `chore:` maintenance

## Production Readiness Criteria

AgroMart should only be considered production-ready when all of the following are true:

1. Frontend production build succeeds.
2. Backend starts reliably on Railway.
3. Supabase database schema and RLS policies are verified.
4. Registration and login work end-to-end.
5. Admin and Super Admin authorization is verified independently.
6. Farmer records remain separate from authenticated users.
7. Core order/product/inventory/shipment workflows pass end-to-end testing.
8. Audit history reliably identifies the actor and operation.
9. Secrets are not exposed in source, frontend bundles, logs, or audit records.
10. CI checks pass before changes are merged to `main`.

## Troubleshooting

### Application fails to start on Railway

Check:

```bash
npm ci
npm start
```

Then verify Railway environment variables and the Node.js runtime version.

### Authentication fails

Verify:

- Supabase URL
- publishable/anon key
- Auth configuration
- user exists in Supabase Auth
- matching `profiles` row exists
- user role is valid and approved

### Database requests fail

Check:

- Supabase connection configuration
- RLS policies
- table names and relationships
- required columns/constraints
- server-side service key configuration where appropriate

## License

Add the project's chosen license here before public production distribution.

## Project Status

**Development / deployment hardening in progress.**

The repository contains the core application, authentication gateway, role-aware administration, audit infrastructure, and Railway production startup configuration. Production release should follow the verification checklist above rather than assuming deployment success from a successful Git push alone.
