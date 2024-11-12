import './AuthQuestion.css'

interface AuthQuestionProps {
  text: string;
  url: string;
  urlText: string;
}

const AuthQuestion: React.FC<AuthQuestionProps> = ({ text, url, urlText }) => {
  return (
    <div className="auth-question">
      <span>{text}</span>
      <a href={url}>{urlText}</a>
    </div>
  )
}

export default AuthQuestion