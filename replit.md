# Real Estate Platform - Darchoo

## Overview

This is a modern real estate platform called "Darchoo" built with React, TypeScript, and Express.js. The application allows users to browse, search, and view property listings across Iran. It features a responsive design with Persian/Farsi language support and right-to-left (RTL) layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with React and TypeScript using modern development practices:
- **Framework**: React 18+ with Vite for fast development and bundling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation (configured but not extensively used)
- **Language**: Persian/Farsi with RTL support

### Backend Architecture
The backend is a Node.js Express server with TypeScript:
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints for property management
- **Data Storage**: Currently uses in-memory storage with sample data
- **Development**: Vite integration for hot reload and development features
- **Build**: ESBuild for production bundling

### Data Storage
- **Current Implementation**: In-memory storage with sample property data
- **Database Ready**: Drizzle ORM configured with PostgreSQL schema
- **Migration System**: Drizzle-kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configured but not actively used)

## Key Components

### Property Management System
- **Property Listings**: Browse properties with filtering and search capabilities
- **Property Details**: Detailed view with image galleries and contact information
- **Featured Properties**: Highlighted properties by type (villa, apartment, land, commercial)
- **Categories**: Support for different property types including villa subtypes (beachfront, mountain, urban)

### Search and Filtering
- **Advanced Search**: Multi-criteria search with property type, location, price range, and size filters
- **URL-based State**: Search parameters stored in URL for bookmarkable searches
- **Real-time Filtering**: Dynamic property filtering based on user selections

### UI/UX Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Persian Localization**: Full RTL support with Persian fonts (Vazir)
- **Component Library**: Comprehensive UI components using Radix UI and Tailwind CSS
- **Interactive Elements**: Modals, dropdowns, carousels, and form components

## Data Flow

### Property Data Flow
1. **Data Source**: Sample property data stored in memory storage (`server/storage.ts`)
2. **API Layer**: Express routes handle property retrieval, search, and filtering
3. **Frontend Queries**: React Query manages data fetching and caching
4. **Component Rendering**: Properties displayed through reusable card components

### Search Flow
1. **User Input**: Search form captures user criteria
2. **URL Updates**: Search parameters reflected in browser URL
3. **API Request**: POST request to `/api/properties/search` with filters
4. **Results Display**: Filtered properties rendered with sorting options

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Type-safe database operations with schema-first approach
- **PostgreSQL**: Configured for production use via Neon Database
- **Database URL**: Environment variable `DATABASE_URL` required for database connection

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds

### Hosting and Assets
- **Unsplash**: External image hosting for property photos
- **Google Fonts**: Vazir font family for Persian text support
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend with hot reload
- **Type Checking**: `npm run check` validates TypeScript across the project
- **Database Migrations**: `npm run db:push` applies schema changes

### Production Build
- **Frontend Build**: Vite builds React application to `dist/public`
- **Backend Build**: ESBuild bundles Express server to `dist/index.js`
- **Unified Serving**: Express serves both API and static frontend files

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection
- **Node Environment**: Uses `NODE_ENV` to differentiate development and production modes
- **Asset Paths**: Configurable paths for attached assets and static files

### Scalability Considerations
- **Database Migration**: Ready to switch from in-memory to PostgreSQL storage
- **API Caching**: React Query provides client-side caching for API responses
- **Static Assets**: Prepared for CDN integration for image and asset delivery
- **Session Management**: PostgreSQL session store configured for user authentication