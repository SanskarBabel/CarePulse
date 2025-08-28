import { z } from "zod";

// Enhanced validation with better error messages and security
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email must be less than 254 characters")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+\d{10,15}$/, "Please enter a valid international phone number starting with +")
});

export const PatientFormValidation = z.object({
  // Personal Information
  name: UserFormValidation.shape.name,
  email: UserFormValidation.shape.email,  
  phone: UserFormValidation.shape.phone,
  birthDate: z.coerce
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Please enter a valid date"
    })
    .min(new Date("1900-01-01"), "Please enter a valid birth year")
    .max(new Date(), "Birth date cannot be in the future"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender"
  }),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(500, "Address must be less than 500 characters")
    .trim(),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(100, "Occupation must be less than 100 characters")
    .trim(),
    
  // Emergency Contact
  emergencyContactName: z
    .string()
    .min(2, "Emergency contact name must be at least 2 characters")
    .max(100, "Emergency contact name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .trim(),
  emergencyContactNumber: z
    .string()
    .regex(/^\+\d{10,15}$/, "Please enter a valid emergency contact number"),
    
  // Medical Information
  primaryPhysician: z
    .string({
      required_error: "Please select a primary care physician"
    })
    .min(1, "Please select a primary care physician"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance provider name must be at least 2 characters")
    .max(100, "Insurance provider name must be less than 100 characters")
    .trim(),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be less than 50 characters")
    .regex(/^[A-Za-z0-9\-]+$/, "Policy number can only contain letters, numbers, and hyphens")
    .trim(),
    
  // Optional Medical Fields
  allergies: z.string().max(1000, "Allergies description must be less than 1000 characters").optional(),
  currentMedication: z.string().max(1000, "Current medications must be less than 1000 characters").optional(),
  familyMedicalHistory: z.string().max(2000, "Family medical history must be less than 2000 characters").optional(),
  pastMedicalHistory: z.string().max(2000, "Past medical history must be less than 2000 characters").optional(),
  
  // Identification
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  
  // Consent (Required)
  treatmentConsent: z
    .boolean({
      required_error: "Treatment consent is required to proceed"
    })
    .refine((value) => value === true, {
      message: "You must consent to treatment to proceed with registration",
    }),
  disclosureConsent: z
    .boolean({
      required_error: "Information disclosure consent is required"
    })
    .refine((value) => value === true, {
      message: "You must consent to information disclosure to proceed",
    }),
  privacyConsent: z
    .boolean({
      required_error: "Privacy policy consent is required"
    })
    .refine((value) => value === true, {
      message: "You must acknowledge our privacy policy to proceed",
    }),
});

// Add security validation for appointments
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z
    .string({
      required_error: "Please select a healthcare provider"
    })
    .min(1, "Please select a healthcare provider"),
  schedule: z.coerce
    .date({
      required_error: "Please select an appointment date and time",
      invalid_type_error: "Please enter a valid date and time"
    })
    .min(new Date(), "Appointment must be scheduled for a future date"),
  reason: z
    .string({
      required_error: "Please provide a reason for your appointment"
    })
    .min(10, "Please provide at least 10 characters describing your appointment reason")
    .max(500, "Appointment reason must be less than 500 characters")
    .trim(),
  note: z
    .string()
    .max(1000, "Additional notes must be less than 1000 characters")
    .optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(1, "Please select a healthcare provider"),
  schedule: z.coerce.date(),
  reason: z.string().max(500, "Reason must be less than 500 characters").optional(),
  note: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(1, "Healthcare provider is required"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string({
      required_error: "Cancellation reason is required"
    })
    .min(10, "Please provide at least 10 characters explaining the cancellation")
    .max(500, "Cancellation reason must be less than 500 characters")
    .trim(),
});

// Schema selector with enhanced validation
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

// Add utility function for data sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .trim();
};