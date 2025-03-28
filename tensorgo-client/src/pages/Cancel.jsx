import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment Cancelled. ❌");

   
    const timer = setTimeout(() => {
      navigate("/plans"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled ❌</h1>
      <p className="text-lg mt-4">You have cancelled the payment process.</p>
      <p>Redirecting back to plans...</p>
    </div>
  );
};

export default Cancel;
