import { activateUser } from "../../../../lib/actions/authActions";
import { verifyJwt } from "../../../../lib/jwt";
import { useNavigate } from 'react-router-dom';


interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage: React.FC<Props> = async ({ params }: Props) => {
  const navigate = useNavigate(); // Get the navigate function for routing

  const result = await activateUser(params.jwt);

  if (result === "success") {
    // Display success message for a brief moment
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

    // Route to https://www.tiffanbae.com.au
    navigate("https://www.tiffanbae.com.au");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" ? (
        <p className="text-red-500 text-2xl">Your account does not exist</p>
      ) : result === "alreadyActivated" ? (
        <p className="text-red-500 text-2xl">Your account is already activated</p>
      ) : result === "success" ? (
        <p className="text-green-500 text-2xl">
          Congratulations! Your account is now activated. Redirecting you shortly...
        </p>
      ) : (
        <p className="text-yellow-500 text-2xl">Oops! Something went wrong!</p>
      )}
    </div>
  );
};

export default ActivationPage;
