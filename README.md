# Aralink Rental Management (React Native + Supabase-ready)

This project scaffolds a React Native (Expo + TypeScript) application for small-scale landlords, property managers, and tenants. Screens currently consume mock data and are wired through React Query and shared contexts so the Supabase + AWS S3 integrations can be swapped in later without changing component interfaces.

## Getting started

```bash
npm install
npm run start
```

### Platform targets

| Platform | Command | Notes |
| --- | --- | --- |
| Android | `npm run android` | Uses Expo’s native tooling; requires Android SDK/emulator. |
| iOS | `npm run ios` | Runs on iOS simulator via Xcode; Expo handles the native iOS project scaffolding. |
| Web | `npm run web` | Starts Expo in web mode. |

The codebase is written with Expo APIs and cross-platform React Native primitives, so no additional iOS-specific shims or files are needed beyond running the command above on macOS with Xcode installed.

The `start` script boots Expo (iOS, Android, or web). Because the project currently uses mock data, no backend credentials are required.

## Architecture

```
src/
├── assets/                # Static assets (Lottie animation placeholder)
├── components/            # Reusable UI primitives (buttons, cards, pills, inputs)
├── contexts/              # Global providers (auth mock + React Query client)
├── navigation/            # React Navigation stack definitions
├── screens/               # Role-based screens using mock data
├── services/              # API + storage abstractions (currently mocked)
├── types/                 # Shared TypeScript models
└── utils/                 # Mock data + formatting helpers
```

Key design principles:

1. **Replaceable data sources:** Every screen fetches data via `services/apiService.ts`, which exports async functions that currently wrap mock arrays. When Supabase is ready, replace the internals of these functions with calls such as `supabase.from('properties').select('*')` without changing the screen components.
2. **Upload abstraction:** `services/storageService.ts` simulates AWS S3 uploads. Swap in the AWS SDK (or Amplify) implementation later while preserving the same function signature so maintenance ticket forms keep working.
3. **Role-aware UI:** The dashboard renders different tiles/cards depending on `UserRole`. The `AuthContext` mocks authentication now, but exposes `login`, `logout`, and `signup` hooks that can call Supabase Auth in the future.
4. **React Query cache:** All entity lists (`properties`, `tenants`, `maintenance`, etc.) are fetched via React Query, so replacing the query functions automatically gains caching, refetching, and optimistic updates.

## Screen overview

| Screen | Description |
| ------ | ----------- |
| **Splash** | Plays `Animantes_Splash_screen.json` Lottie animation with gradient background before routing to Login. |
| **Login / Signup** | Fake authentication against `mockUsers`. Signup supports role selection (Tenant, Landlord, Property Manager). |
| **Dashboard** | Role-based quick actions + cards. Landlords/managers see properties, tenants, maintenance, and accounting tiles; tenants see rent status and maintenance request summaries. |
| **Properties** | List, add, and toggle property records via mocked API calls. |
| **Tenants** | List tenants, capture new tenant info, and visualize rent status pills. |
| **Maintenance** | Submit new maintenance tickets (with fake S3 upload) and advance ticket statuses. |
| **Accounting** | Manage invoices, view rent transactions, and highlight receipt-upload placeholder for future S3 usage. |
| **Applicants** | Track prospective renters and advance their application stages. |

## Supabase & AWS S3 integration plan

1. **Supabase Auth** – Replace the mock logic inside `AuthContext` with `supabase.auth.signInWithPassword`, `signUp`, and `signOut` calls. Store the returned session/user in context so existing consumers continue working.
2. **Supabase Database** – Update each fetch/save helper in `services/apiService.ts` with Supabase RPC/REST calls (e.g., `supabase.from('properties').insert(property)`). Keep the function names/signatures the same so no UI code changes.
3. **AWS S3 uploads** – Implement `uploadToS3` with the AWS SDK (or Supabase storage buckets if preferred). Return `{ url, key }` so maintenance tickets and accounting receipts can persist references in Supabase.

Until those integrations are in place, the mock services mimic network latency and allow the React Native screens to behave as if they were online.
