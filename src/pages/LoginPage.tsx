import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  // Use the authentication hook to access login function
  const { login } = useAuth();

  // React Router's useNavigate hook to redirect after login
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
