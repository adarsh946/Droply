"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createSignupSchema } from "@/schema/signupSchema";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const SignupForm = () => {
  const router = useRouter();

  const [verificationCode, setVerificationCode] = useState("");
  const [verifying, setIsverifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const { signUp, isLoaded, setActive } = useSignUp();

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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(false);
    setAuthError(null);

    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("verification incomplete", result);
        setVerificationError("verification is not able to complete");
      }
    } catch (error: any) {
      console.error("sign- up error", error);
      setVerificationError(
        error.errors[0]?.message || "error occured during signup process"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // if(verifying){
  //   return ()
  // }

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Register
        </CardTitle>
        <CardDescription className="text-center text-md">
          you need to signup to get access in the app
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <div className=" flex flex-col py-3">
              <Label className="text-lg">Email</Label>
              <Input type="email" placeholder="Enter your Email" />
            </div>
            <div className="py-3">
              <Label className="text-lg">Password</Label>
              <Input type="text" placeholder="Enter your password" />
            </div>
            <div className="py-3">
              <Label className="text-lg">Confirm Password</Label>
              <Input type="text" placeholder="confirm your password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant={"default"}
          className="bg-black text-white min-w-[400px] cursor-pointer"
        >
          SignUp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
