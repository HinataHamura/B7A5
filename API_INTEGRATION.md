# API Integration Map

Set `NEXT_PUBLIC_API_URL` to the backend `/api` base and set `NEXT_PUBLIC_DEMO_MODE=false`. Responses may be either the documented value or `{ success, message, data }`. Bearer JWTs are attached automatically by `lib/api.ts`.

| Frontend | Method and endpoint | Purpose |
|---|---|---|
| Home, browse and admin gear | `GET /gear` | Gear list and search/filter data |
| Date availability filter | `GET /gear?startDate=&endDate=` | Excludes overlapping active rentals |
| Gear details | `GET /gear/:id` | Listing, provider and specifications |
| Login | `POST /auth/login` | Returns `{ user, token }` |
| Registration | `POST /auth/register` | Creates role-selected account |
| Checkout | `POST /rentals` | Places date-based rental request |
| Customer dashboard | `GET /rentals` | Customer rental history |
| Payment history | `GET /payments` | Customer transactions |
| Stripe payment page | `POST /payments/create` | Backend creates Checkout Session and returns `{ checkoutUrl, payment }` |
| Payment success page | `POST /payments/confirm` | Verifies the Stripe session and updates payment/order UI |
| Review form | `POST /reviews` | Review for returned rental |
| Provider dashboard | `GET /provider/gear` | Authenticated provider inventory |
| Add gear | `POST /provider/gear` | Creates a listing |
| Edit gear | `PUT /provider/gear/:id` | Updates owned listing, stock and availability |
| Delete gear | `DELETE /provider/gear/:id` | Removes an owned listing |
| Provider orders | `GET /provider/orders` | Incoming rentals |
| Provider order actions | `PATCH /provider/orders/:id` | Status transition |
| Admin dashboard/users | `GET /admin/users` | User list and statistics |
| Admin user action | `PATCH /admin/users/:id` | Suspend or activate user |
| Admin rental moderation | `GET /admin/rentals` | All rental orders |

The backend owns price calculation, overlapping-date availability checks, Stripe secret keys, Checkout Session creation, and webhook-driven `PAID` updates. The frontend redirects only to the backend-generated `checkoutUrl`, confirms the returned session as a fallback, and renders dedicated success/cancel results.

## Expected error format

```json
{ "message": "Readable error", "errors": { "field": "Field-specific error" } }
```

Network/API errors appear as toasts or inline form alerts. Route-level failures are handled by `app/error.tsx`.
