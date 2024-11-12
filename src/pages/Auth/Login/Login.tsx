import AuthForm from "../../../components/AuthForm/AuthForm";
import { FormFieldsData } from "../../../data/SignInData";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="login">
      <AuthForm
        logo="/images/Logo.png"
        title="Sign In"
        text="Enter your credentials to access your account"
        data={FormFieldsData}
        button="SIGN IN"
        questionText="Don’t have an account? "
        questionUrl="/auth/signup"
        questionUrlText="Create one"
        img={false}
      />
    </div>
  );
};

export default Login;
