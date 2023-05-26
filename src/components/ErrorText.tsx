import { AlertCircle } from 'react-feather';

interface ErrorTextProps {
  text: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return (
    <div className="flex">
      <AlertCircle className=" text-red-600 mr-1" />

      <h1 className="text-red-600">{text}</h1>
    </div>
  );
};

export default ErrorText;
