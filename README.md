# MediFast Cameroon - Health Booking Care Application

A comprehensive healthcare booking platform designed specifically for Cameroon to streamline hospital visits with efficient booking and emergency services.

## 🚀 Features

- **Symptom Checker**: Self-assessment tool to evaluate symptoms and receive preliminary guidance
- **Hospital Locator**: Find nearby hospitals and healthcare facilities with directions
- **Appointment Booking**: Schedule medical appointments online with your preferred doctor
- **Appointment Management**: View, manage, and track your upcoming appointments
- **Emergency Services**: Quick access to emergency contacts and services
- **Doctor Directory**: Browse and select from available healthcare professionals
- **Pharmacy Finder**: Locate nearby pharmacies with contact information
- **Multi-language Support**: Available in English and French for broader accessibility
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Mode**: User preference-based theme selection
- **Simple Mode**: Simplified interface for easier navigation

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Shadcn UI + Radix UI primitives
- **State Management**: React Context API + TanStack Query
- **Routing**: React Router DOM
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Date Handling**: date-fns
- **Theming**: next-themes

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for backend services)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd health-booking-care-10
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env.local` file (never commit actual credentials to version control):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
⚠️ **Security Warning**: Never commit actual API keys or sensitive credentials to version control. Always use environment variables and ensure your `.env` files are listed in `.gitignore`.

4. Start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:8080`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run lint` - Check code for linting errors
- `npm run preview` - Preview production build locally

## ☁️ Deployment

### Deploy to Vercel

The easiest way to deploy this application is to use [Vercel](https://vercel.com), a popular hosting platform for static sites and serverless functions.

#### Prerequisites
- A Vercel account ([sign up here](https://vercel.com/signup))
- The Vercel CLI installed globally: `npm i -g vercel` (optional)

#### Deployment Options

**Option 1: Deploy from GitHub**
1. Push your code to a GitHub repository
2. Sign in to [Vercel](https://vercel.com/dashboard)
3. Click "New Project" and import your repository
4. Vercel will automatically detect the Vite configuration and deploy your site

**Option 2: Deploy with Vercel CLI**
1. Install the Vercel CLI: `npm i -g vercel`
2. Run the following command in your project directory:
```bash
vercel
```
3. Follow the prompts to link your project and deploy

**Option 3: Deploy from Vercel Dashboard**
1. Visit [Vercel Import](https://vercel.com/import/git)
2. Choose your Git provider and repository
3. Configure your project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm run dev`
4. Deploy your project

#### Environment Variables
This application uses Supabase for backend services. To deploy securely:

1. **Never expose credentials in source code**
2. **Configure environment variables in Vercel Dashboard**:
   - Navigate to your project in the Vercel Dashboard
   - Go to Settings → Environment Variables
   - Add these variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
3. **Protect your credentials**: Always store sensitive data in environment variables, never in the codebase
4. **Local development**: Use `.env.local` file which is ignored by git (update your `.gitignore` if needed)

⚠️ **Security Note**: The application is designed to load sensitive configuration from environment variables. Ensure these are configured correctly in your deployment environment and never commit actual credentials to the repository.

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Shadcn UI components
│   └── ...
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Route-level components
├── services/          # API/service integrations
└── types/             # TypeScript type definitions
```

## 💡 Key Features Implementation

### Multi-language Support
The application supports both English and French with easy language switching through the app context.

### Responsive Design
Optimized for all device sizes with a mobile-first approach and dedicated bottom navigation for smartphones.

### Accessibility
Built with accessibility in mind, following WCAG guidelines with proper semantic HTML and ARIA attributes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

MediFast Cameroon - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/health-booking-care](https://github.com/yourusername/health-booking-care)

---

Made with ❤️ for better healthcare in Cameroon
