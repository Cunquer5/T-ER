import { CartDrawer } from "@/components/CartDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  return <CartDrawer open={open} onClose={handleClose} />;
}
