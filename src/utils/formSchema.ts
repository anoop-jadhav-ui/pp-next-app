import * as yup from "yup";

interface LoginForm {
  email: string;
  password: string;
}

const loginFormSchema: yup.ObjectSchema<LoginForm> = yup.object().shape({
  email: yup
    .string()
    .required("Please enter email id.")
    .email("Incorrect email id.")
    .default(""),
  password: yup
    .string()
    .required("Please enter password.")
    .min(8, "Password must be at least 8 characters")
    .default(""),
});

export { loginFormSchema };
export type { LoginForm };

// .matches(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//   'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
// ),
