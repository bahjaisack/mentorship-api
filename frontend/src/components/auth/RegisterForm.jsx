import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "../../lib/api/apiClient";
import { extractErrorMessages } from "../../util/errorUtils";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post(
        `/auth/register`,
        userData
      );
      console.log("response data", response);
      return response.data;
    },
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error) => {
        console.error('error', error)
      setError(extractErrorMessages(error))
    
    },
  });

  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.password ||
      !formValues.confirmPassword
    ) {
      setError("all fields are required");
      return;
    }
    if (formValues.password !== formValues.confirmPassword) {
      setError("password do not match");
      return;
    }
    registerMutation.mutate({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Create an account</CardTitle>
        <CardDescription className="text-xl text-center">
          Enter your details to register
        </CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-0">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Full Name</div>
              <Input
                name="name"
                placeholder="john doe"
                required
                 value={formValues.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
              <Input
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
              <Input
                name="password"
                type={"password"}
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="******"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">
                Confirm Password
              </div>
              <Input
                name="confirmPassword"
                type={"password"}
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                placeholder="******"
                required
              />
            </div>
          </CardContent>
          <div className="py-4 px-4">
            <Button type="submit" className={"w-full cursor-pointer"}>
              {registerMutation.isPending ? (
                <span className="flex -items-center gap-2">
                  <LoaderCircle />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </div>

          <CardFooter className="flex justify-center pt-0">
            <div className="text-center text-sm">
              Already have an account ?{" "}
              <a
                onClick={() => navigate("/login")}
                className="text-primary hover: underline cursor-pointer"
              >
                Sign in
              </a>
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
};

export default RegisterForm;
