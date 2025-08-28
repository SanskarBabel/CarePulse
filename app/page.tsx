import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";

export const metadata: Metadata = {
  title: "Book Healthcare Appointments Online - CarePulse Medical Scheduling",
  description: "Schedule medical appointments with certified healthcare providers. Fast, secure, and HIPAA-compliant online booking. Start your patient registration today.",
  keywords: [
    "book medical appointments online",
    "healthcare scheduling",
    "doctor appointment booking",
    "patient registration",
    "medical booking platform",
    "online doctor appointments"
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Book Healthcare Appointments Online - CarePulse",
    description: "Schedule medical appointments with certified healthcare providers. Fast, secure, and HIPAA-compliant online booking.",
    url: 'https://care-pulse-peach.vercel.app',
  },
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <header>
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="CarePulse Healthcare Management Platform Logo"
              className="mb-12 h-10 w-fit"
              priority
            />
          </header>

          <main>
            <div className="space-y-6 mb-12">
              <h1 className="header">Welcome to CarePulse Healthcare 👋</h1>
              <h2 className="text-dark-700 text-lg">Book Your Medical Appointment in Minutes</h2>
              <p className="text-dark-600">
                Connect with certified healthcare providers and schedule appointments online. 
                Our secure, HIPAA-compliant platform makes healthcare accessible and convenient.
              </p>
              
              {/* Key benefits for SEO and user understanding */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="text-center p-4">
                  <h3 className="font-semibold text-green-500">🔒 Secure & Private</h3>
                  <p className="text-sm text-dark-600">HIPAA-compliant data protection</p>
                </div>
                <div className="text-center p-4">
                  <h3 className="font-semibold text-green-500">⚡ Instant Booking</h3>
                  <p className="text-sm text-dark-600">Schedule appointments in seconds</p>
                </div>
                <div className="text-center p-4">
                  <h3 className="font-semibold text-green-500">👩‍⚕️ Certified Providers</h3>
                  <p className="text-sm text-dark-600">Licensed healthcare professionals</p>
                </div>
              </div>
            </div>

            <PatientForm />
          </main>

          <footer className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse Healthcare Management Platform
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Healthcare Provider Access
            </Link>
          </footer>
        </div>
      </section>

      <aside className="side-img max-w-[50%]" aria-label="Healthcare professionals providing quality care">
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="Healthcare professionals using CarePulse platform for patient care"
          className="side-img"
          loading="lazy"
        />
      </aside>
    </div>
  );
};

export default Home;