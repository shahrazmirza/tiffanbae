import React from "react";
import Navbar from "./Components/Navbar";
import Whatsapp from "./Components/Whatsapp";
import Hero from "./Components/Hero";
import { sendMail } from "../lib/mail";

export default async function Home() {
  return (
    <div className="mw-screen mh-screen overflow-hidden">
      <Navbar />
      <Whatsapp />
      <Hero />
    </div>
  );
}
