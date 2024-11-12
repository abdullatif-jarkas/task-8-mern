type InputField = {
  type: "email" | "password";
  placeholder?: string;
};

type FormField = {
  title: string;
  inputs: InputField[];
};

export type FormFieldsDataType = FormField[];

export const FormFieldsData: FormFieldsDataType = [
  {
    title: "Email",
    inputs: [{ type: "email", placeholder: "Enter your email" }],
  },
  {
    title: "Password",
    inputs: [
      { type: "password", placeholder: "Enter your password" },
    ],
  },
];
