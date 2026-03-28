import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  userType: z.string().refine((val) => ['jobseeker', 'employer'].includes(val), {
    message: 'Please select a user type',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const jobPostSchema = z.object({
  profile: z.string().min(1, 'Job profile is required'),
  exp: z.number().min(0, 'Experience must be 0 or greater'),
  jobType: z.string().min(1, 'Job type is required'),
  companyName: z.string().min(1, 'Company name is required'),
  desc: z.string().min(10, 'Description must be at least 10 characters'),
  salary: z.number().min(0, 'Salary must be 0 or greater'),
  location: z.string().min(1, 'Location is required'),
  techs: z.array(z.string()).min(1, 'At least one technology is required'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type JobPostFormData = z.infer<typeof jobPostSchema>;
