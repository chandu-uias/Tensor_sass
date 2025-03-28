import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment Successful! 🎉");
    
    // Redirect user after 5 seconds
    const timer = setTimeout(() => {
      navigate("/"); // Change to your dashboard or home page
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful! 🎉</h1>
      <p className="text-lg mt-4">Thank you for your subscription.</p>
      <p>Redirecting to HomePage...</p>
    </div>
  );
};

export default Success;
