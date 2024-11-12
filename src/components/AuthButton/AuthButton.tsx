import "./AuthButton.css";

interface ButtonProps {
  title: string;
}

const AuthButton: React.FC<ButtonProps> = ({ title }) => {
  return (
    <button
      type="submit"
      className="auth-button"
      onClick={() => console.log("first")}
    >
      {title}
    </button>
  );
};

export default AuthButton;
