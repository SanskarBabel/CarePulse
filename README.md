# CarePulse

**CarePulse** is a modern, scalable healthcare management platform designed to streamline medical appointment scheduling, patient registration, and healthcare provider management. Built with Next.js, TypeScript, and Appwrite backend services, CarePulse emphasizes security, performance, and accessibility for healthcare applications.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

CarePulse provides a secure, HIPAA-compliant platform for patients to book appointments online with healthcare providers. It offers a user-friendly registration flow, patient data management, and administrative access to streamline healthcare workflows.

The platform focuses on:

- **Patient-centric design:** Easy registration and profile management
- **Secure appointment booking:** Real-time availability and scheduling
- **Healthcare provider management:** Admin tools for managing providers and appointments
- **Compliance and accessibility:** WCAG 2.1 AA support and data privacy
- **Performance:** Fast loading with optimized React and Next.js best practices

Explore the live demo: [https://care-pulse-peach.vercel.app](https://care-pulse-peach.vercel.app)

---

## Features

- Patient registration and profile management
- Secure and encrypted healthcare appointment booking
- Real-time schedule availability and slot management
- Multi-role authentication and authorization (patient, admin, provider)
- HIPAA-compliant data handling and user consent
- Responsive UI with accessibility best practices
- Rich form validation with Zod and React Hook Form
- Error boundaries, loading states, and graceful error handling
- SEO optimized with dynamic metadata and structured data
- CMS-ready architecture for future content expansion

---

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Appwrite (authentication, database, storage)
- **Form Validation:** Zod, React Hook Form
- **UI Components:** Radix UI, Lucide React icons
- **State Management:** React Context and Hooks
- **Testing:** Jest, React Testing Library
- **Monitoring:** Sentry (error tracking)
- **Build & Deployment:** Vercel Platform

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn package manager
- Appwrite backend instance and credentials

### Installation

1. Clone the repository:  
   git clone https://github.com/SanskarBabel/CarePulse.git
   cd CarePulse

2. Install dependencies:  
   npm install

3. Create a `.env.local` file in the root with the following variables:  
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://[your-appwrite-endpoint]
   NEXT_PUBLIC_APPWRITE_PROJECT=[your-project-id]
   NEXT_PUBLIC_API_KEY=[your-api-key]
   NEXT_PUBLIC_DATABASE_ID=[your-database-id]
   NEXT_PUBLIC_PATIENT_COLLECTION_ID=[your-patient-collection-id]
   NEXT_PUBLIC_DOCTOR_COLLECTION_ID=[your-doctor-collection-id]
   NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=[your-appointment-collection-id]
   NEXT_PUBLIC_BUCKET_ID=[your-storage-bucket-id]

4. Run development server:  
   npm run dev

Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## Folder Structure

/app # Next.js app directory with pages and API routes
/components # React UI components and form elements
/constants # Constants such as country lists, config values
/lib # Utilities, validation schemas, Appwrite config
/public # Static assets (images, icons, manifest, robots.txt)
/types # TypeScript global types and interfaces
/.vscode # VS Code workspace settings
/package.json # npm dependencies and scripts
/next.config.mjs # Next.js config file for optimized builds
/tailwind.config.ts # Tailwind CSS configuration
/README.md # Project overview and instructions

---

## Development

### Scripts

- `npm run dev` — Start development server
- `npm run build` — Build production optimized version
- `npm start` — Run the built production server
- `npm run lint` — Run ESLint static analysis
- `npm run lint:fix` — Fix lint errors automatically
- `npm run test` — Run tests using Jest

### Recommended IDE Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript

### Environment Variables

Ensure all required environment variables for Appwrite are set correctly for smooth backend interaction.

---

## Deployment

CarePulse is optimized for deployment on Vercel with server-side rendering (SSR) and Incremental Static Regeneration (ISR).

1. Push to GitHub repository.
2. Connect your repo in Vercel dashboard.
3. Configure environment variables in Vercel project settings.
4. Deploy and monitor with built-in logs and error monitoring.

---

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request with clear descriptions and tests if applicable.

- Follow code style and lint rules.
- Write meaningful commit messages.
- Ensure no sensitive data is committed.
- Document new features clearly.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

For support or inquiries, open an issue or contact the maintainer at:

- GitHub: [SanskarBabel](https://github.com/SanskarBabel)

---