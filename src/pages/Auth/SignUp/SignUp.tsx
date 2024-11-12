import AuthForm from "../../../components/AuthForm/AuthForm";
import { FormFieldsData } from "../../../data/SignUpData";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="sign-up">
      <AuthForm
        logo="/images/Logo.png"
        title="Sign Up"
        text="Fill in the following fields to create an account."
        data={FormFieldsData}
        button="SIGN UP"
        questionText="Do you have an account? "
        questionUrl="/auth/signin"
        questionUrlText="Sign in"
        img={true}
      />
    </div>
  );
};

export default SignUp;
