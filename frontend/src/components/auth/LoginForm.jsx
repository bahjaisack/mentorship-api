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
import { useMutation } from "@tanstack/react-query";
import { extractErrorMessages } from "../../util/errorUtils";
import api from "../../lib/api/apiClient";
import useAuthStore from "../../lib/store/authStore";

const LoginForm = () => {
  const navigate = useNavigate();

  const { pending } = useFormStatus();
  const [isLoading] = useState();
  const [error, setError] = useState(null);
  const { setAuth } = useAuthStore();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(`/auth/login`, credentials);
      console.log("response data", response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Full data from server:", data);
      if (data.token) {
        const user = data.user;
        const token = data.token;
        console.log("Extracted User:", user); // Check if this prints 'undefined'
        console.log("Extracted Token:", token);
        setAuth(user, token);
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.error("error", error);
      setError(extractErrorMessages(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!formValues.email || !formValues.password) {
      setError("all fields are required");
      return;
    }

    loginMutation.mutate({
      email: formValues.email,
      password: formValues.password,
    });
  };

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-0">
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Email</div>
              <Input
                name="email"
                placeholder="example@gmail.com"
                required
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-left">Password</div>
              <Input
                name="password"
                placeholder="******"
                type={"password"}
                required
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <div className="py-4 px-4">
            <Button type="submit" className={"w-full cursor-pointer"}>
              {isLoading ? (
                <span className="flex -items-center gap-2">
                  <LoaderCircle />
                  Login account...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </div>

          <CardFooter className="flex justify-center pt-0">
            <div className="text-center text-sm">
              Don't have an account ?{" "}
              <a
                onClick={() => navigate("/register")}
                className="text-primary hover: underline cursor-pointer"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
};

export default LoginForm;
