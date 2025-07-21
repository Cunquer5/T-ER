import { CartDrawer } from "@/components/CartDrawer";
import { useState } from "react";

export default function Cart() {
  const [open, setOpen] = useState(true);
  return <CartDrawer open={open} onClose={() => setOpen(false)} />;
}
