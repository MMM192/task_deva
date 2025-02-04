import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackButtonHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();

      const confirmation1 = window.confirm("Are you sure you want to go back?");
      if (!confirmation1) return;

      const confirmation2 = window.confirm("Please confirm again!");
      if (!confirmation2) return;

      const confirmation3 = window.confirm("Final confirmation! Proceed?");
      if (!confirmation3) return;

      navigate(-1); // Navigate to the previous page
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return null;
};

export default BackButtonHandler;
