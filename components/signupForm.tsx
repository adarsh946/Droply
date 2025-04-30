"use client";

import { createSignupSchema } from "@/schema/signupSchema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const SignupForm = () => {
  const [verifying, setIsverifying] = useState(false);
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
  const onSubmit = async () => {
    if (isLoaded) return;
  };

  const handleOnSubmit = async () => {};
};

export default SignupForm;
