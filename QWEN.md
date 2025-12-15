# Health Booking Care Application - QWEN Context

## Project Overview

This is a React-based health booking and care application named "MediFast Cameroon" (also called "MboaMed"). It's built using modern web technologies including React, TypeScript, Vite, Tailwind CSS, and Shadcn UI components. The application focuses on streamlining hospital visits in Cameroon by providing services such as symptom checking, hospital location, appointment booking, and emergency services.

### Key Technologies

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI + Shadcn UI
- **State Management**: React Context API + TanStack Query
- **Routing**: React Router DOM
- **Database Integration**: Supabase JS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Theming**: next-themes for dark/light mode

### Architecture

The application follows a component-based architecture with:
- A central AppContext for global state management
- Component directory structure with UI elements
- Page components for different sections
- Responsive design supporting both desktop and mobile layouts
- Dark mode support
- Multi-language support (English/French)

## Core Features

1. **Welcome/Onboarding**: Main landing page
2. **Symptom Checker**: Allow users to check symptoms
3. **Hospital Locator**: Find nearby hospitals
4. **Appointment Booking**: Schedule medical appointments
5. **Appointment Management**: View scheduled appointments
6. **Emergency Services**: Quick access to emergency contacts
7. **Profile Management**: User account information
8. **Pharmacy Finder**: Locate pharmacies
9. **Doctor Directory**: Browse available doctors
10. **Payment System**: Handle payments
11. **Simple Mode**: Simplified UI for easier navigation

## Building and Running

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn package manager

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint the code
npm run lint

# Preview production build locally
npm run preview
```

### Configuration

- Development server runs on port 8080
- Uses Vite for fast hot-module replacement (HMR)
- TypeScript path alias `@` points to `src` directory
- Tailwind CSS configured with custom theme variables
- Supports dark/light modes

### Environment Dependencies

The application appears to use Supabase for backend services, so you may need:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- Other environment variables defined in .env files (not present in current view)

## Development Conventions

- Modern functional React components with TypeScript
- Custom hooks for specific functionality
- Component organization by feature in the /src/components directory
- Page-level components in /src/pages directory
- Shared utilities in /src/lib directory
- UI component library in /src/components/ui following Shadcn patterns
- Context API for global state management
- Responsive design with Tailwind CSS
- Accessibility considerations with Radix UI primitives

## Key File Structure

- `/src/App.tsx` - Main application component with routing and providers
- `/src/contexts/AppContext.tsx` - Global state management
- `/src/components/AppLayout.tsx` - Main layout with navigation
- `/src/pages/Index.tsx` - Entry point for the main application view
- `/src/components/Header.tsx`, `/src/components/Navigation.tsx` - UI navigation
- `/src/components/ui/` - Collection of reusable UI components based on Shadcn
- `/src/lib/utils.ts` - Utility functions using `clsx` and `tailwind-merge`

## External Services & Libraries

- **Supabase**: Backend as a service for database and authentication
- **TanStack Query**: Server state management
- **React Hook Form**: Form handling with Zod validation
- **Lucide React**: Icon library
- **React Day Picker**: Date selection components
- **Embla Carousel**: Carousel functionality
- **Input OTP**: One-time password input components
- **Sonner**: Toast notifications
- **Cmdk**: Command palette functionality

## Styling Approach

- Tailwind CSS with custom configuration
- CSS variables for theming (supports light/dark modes)
- Typography plugin for rich text formatting
- Custom animations for smooth UI transitions
- Responsive breakpoints for all device sizes
- Custom color palette with green as primary color (reflecting healthcare theme)

## Special Notes

- The project supports both English and French languages
- Includes accessibility features with proper semantic HTML
- Designed with responsive layout for use on all device types
- Uses modern React patterns (hooks, context, functional components)
- Follows Shadcn UI component system for consistent UI elements
- Has a "simple mode" for easier navigation for certain users
- Includes a bottom navigation bar optimized for mobile use