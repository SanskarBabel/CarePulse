"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from '@/lib/validation';

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section aria-labelledby="patient-info-heading">
          <h3 id="patient-info-heading" className="mb-9 text-xl font-semibold text-white">
            Start Your Healthcare Journey
          </h3>
          
          <p className="text-dark-600 mb-6">
            Enter your basic information to begin scheduling appointments with our certified healthcare providers.
          </p>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Legal Name"
            placeholder="Enter your full name as it appears on ID"
            iconSrc="/assets/icons/user.svg"
            iconAlt="User profile icon"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="your.email@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="Email address icon"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
          />
        </section>

        <SubmitButton isLoading={isLoading}>
          Begin Registration Process
        </SubmitButton>
      </form>
    </Form>
  );
};