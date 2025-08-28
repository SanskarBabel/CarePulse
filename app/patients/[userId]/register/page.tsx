import Image from "next/image";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

export const metadata: Metadata = {
  title: "Patient Registration - Complete Your Healthcare Profile | CarePulse",
  description: "Complete your patient registration with CarePulse. Provide medical history, insurance information, and emergency contacts for comprehensive healthcare management.",
  keywords: [
    "patient registration",
    "medical history form",
    "healthcare registration",
    "patient information",
    "medical records setup",
    "insurance registration"
  ],
  robots: {
    index: false, // Don't index patient-specific pages
    follow: true,
  },
};

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <header>
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="CarePulse Healthcare Platform"
              className="mb-12 h-10 w-fit"
            />
          </header>

          <main>
            <div className="mb-12 space-y-4">
              <h1 className="header">Complete Your Healthcare Profile 👋</h1>
              <p className="text-dark-700">
                Welcome {user?.name}! Please provide your medical information to ensure 
                the best possible care from our healthcare providers.
              </p>
            </div>

            <RegisterForm user={user} />
          </main>

          <footer className="text-14-regular mt-20 py-12">
            <p className="text-dark-600">
              © 2024 CarePulse - Secure Healthcare Management Platform
            </p>
          </footer>
        </div>
      </section>

      <aside className="side-img max-w-[390px]" aria-label="Medical registration and patient care">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="Patient completing medical registration on CarePulse platform"
          className="side-img"
          loading="lazy"
        />
      </aside>
    </div>
  );
};

export default Register;