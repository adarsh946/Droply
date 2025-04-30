"use client";

import { createSignupSchema } from "@/schema/signupSchema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const SignupForm = () => {
  const [verifying, setIsverifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { signUp, isLoaded } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createSignupSchema>>({
    resolver: zodResolver(createSignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof createSignupSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsverifying(true);
    } catch (error: any) {
      console.error("sign- up error", error);
      setAuthError(
        error.errors[0]?.message || "error occured during signup process"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnSubmit = async () => {};
};

export default SignupForm;
