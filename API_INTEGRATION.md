# API Integration Map

Set `NEXT_PUBLIC_API_URL` to the backend `/api` base and set `NEXT_PUBLIC_DEMO_MODE=false`. Responses may be either the documented value or `{ success, message, data }`. Bearer JWTs are attached automatically by `lib/api.ts`.

| Frontend | Method and endpoint | Purpose |
|---|---|---|
| Home, browse, provider inventory, admin gear | `GET /gear` | Gear list and client-side filters |
| Gear details | `GET /gear/:id` | Listing, provider and specifications |
| Login | `POST /auth/login` | Returns `{ user, token }` |
| Registration | `POST /auth/register` | Creates role-selected account |
| Checkout | `POST /rentals` | Places date-based rental request |
| Customer dashboard | `GET /rentals` | Customer rental history |
| Payment history | `GET /payments` | Customer transactions |
| Stripe payment page | `POST /payments/create` | Backend creates Checkout Session and returns `{ url }` |
| Review form | `POST /reviews` | Review for returned rental |
| Provider dashboard | `GET /provider/gear` | Provider inventory (change `getGear` mapping if distinct) |
| Add gear | `POST /provider/gear` | Creates a listing |
| Provider orders | `GET /provider/orders` | Incoming rentals |
| Provider order actions | `PATCH /provider/orders/:id` | Status transition |
| Admin dashboard/users | `GET /admin/users` | User list and statistics |
| Admin user action | `PATCH /admin/users/:id` | Suspend or activate user |
| Admin rental moderation | `GET /admin/rentals` | All rental orders |

The backend owns price calculation, availability checks, Stripe secret keys, Checkout Session creation, and webhook-driven `PAID` updates. The frontend only redirects to a backend-generated HTTPS Stripe Checkout URL and renders success/cancel results.

## Expected error format

```json
{ "message": "Readable error", "errors": { "field": "Field-specific error" } }
```

Network/API errors appear as toasts or inline form alerts. Route-level failures are handled by `app/error.tsx`.
