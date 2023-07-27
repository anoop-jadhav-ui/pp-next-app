"use client";
import ControlledTextField from "@/components/atoms/ControlledTextField/ControlledTextField";
import { LoginForm, loginFormSchema } from "@/utils/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

enum FormState {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  CHECK_EMAIL = "check-email",
}

const AuthPage = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [view, setView] = useState<FormState>(FormState.SIGN_IN);
  const [isLoading, setLoading] = useState(false);

  const isSignUp = view === FormState.SIGN_UP;
  const isSignIn = view === FormState.SIGN_IN;
  const isCheckEmail = view === FormState.CHECK_EMAIL;

  const methods = useForm({
    defaultValues: loginFormSchema.cast({}),
    resolver: yupResolver(loginFormSchema),
  });

  const { handleSubmit, getValues } = methods;

  const handleSignIn = async ({ email, password }: LoginForm) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
    router.refresh();
  };

  const handleSignUp = async ({ email, password }: LoginForm) => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);

      if (isSignIn) {
        await handleSignIn({ email, password });
      } else if (isSignUp) {
        await handleSignUp({ email, password });
        setView(FormState.CHECK_EMAIL);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item textAlign="center" xs={12}>
              <Typography variant="h5">
                {isSignUp ? "Sign up" : "Sign in"}
              </Typography>
            </Grid>
            {!isCheckEmail && (
              <>
                <Grid item xs={12}>
                  <ControlledTextField
                    name="email"
                    label="Email Address"
                    placeholder="Your email address"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Your password"
                  />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    size="large"
                    loading={isLoading}
                    type="submit"
                  >
                    {isSignUp ? "Sign up" : "Sign in"}
                  </LoadingButton>
                </Grid>
              </>
            )}
            {isSignIn && (
              <Grid item xs={12}>
                <Grid item xs={12} textAlign="center">
                  <Typography variant="body1">
                    {"Don't have an account?"}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => setView(FormState.SIGN_UP)}
                  >
                    Sign up now
                  </Button>
                </Grid>
              </Grid>
            )}

            {isSignUp && (
              <Grid item xs={12} textAlign="center">
                <Typography variant="body1">
                  Already have an account?
                </Typography>
                <Button
                  variant="text"
                  onClick={() => setView(FormState.SIGN_IN)}
                >
                  Sign In now
                </Button>
              </Grid>
            )}
            {isCheckEmail && (
              <Grid item xs={12} textAlign="center">
                <Typography variant="body2">
                  Check{" "}
                  <Box component="span" fontWeight="bold" color="primary">
                    {getValues("email")}
                  </Box>{" "}
                  to continue signing up.
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default AuthPage;
