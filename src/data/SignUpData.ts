
type InputField = {
  type: 'text' | 'email' | 'password' | 'file';
  placeholder?: string;
};

type FormField = {
  title: string;
  inputs: InputField[];
};

export type FormFieldsDataType = FormField[];

export const FormFieldsData: FormFieldsDataType = [
  {
    title: 'Name',
    inputs: [
      { type: 'text', placeholder: 'First Name' },
      { type: 'text', placeholder: 'Last Name' },
    ],
  },
  {
    title: 'Email',
    inputs: [{ type: 'email', placeholder: 'Enter your email' }],
  },
  {
    title: 'Password',
    inputs: [
      { type: 'password', placeholder: 'Enter password' },
      { type: 'password', placeholder: 'Re-enter your password' },
    ],
  },
];
