import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage({ url }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(url);
  });
}

export default NotFoundPage;
