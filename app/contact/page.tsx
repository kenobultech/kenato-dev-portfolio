"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MainLayout from "../components/MainLayout";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";

// ---------------- Types ----------------
type SubmissionStatus = "idle" | "loading" | "success" | "error";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  botCheck: string;
}

// ---------------- Reusable Contact Info Card ----------------
interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
  iconBgClass?: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  icon,
  title,
  content,
  link,
  iconBgClass = "bg-gray-700",
}) => {
  const CardContent = (
    <div className="flex items-center space-x-2 w-full">
      <div className={`p-3 rounded-full text-white shrink-0 ${iconBgClass}`}>
        {icon}
      </div>
      {/*
        --- THE FIX IS HERE ---
        Added `min-w-0` to allow the flex item to shrink,
        enabling proper text wrapping for long content like emails.
      */}
      <div className="flex-grow pr-3">
        <h3 className="text-sm font-semibold text-gray-300 truncate">
          {title}
        </h3>
        <p className="text-md text-white font-medium break-words">
          {content}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#282828] p-3 rounded-2xl shadow-lg flex w-full transition duration-300 hover:ring-2 hover:ring-blue-500">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full"
        >
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </div>
  );
};


// ---------------- Reusable Input Field ----------------
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  handleChange,
  ...props
}) => (
  <div className="flex flex-col space-y-2">
    <input
      className={`bg-[#282828] text-white p-4 rounded-xl focus:ring-2 outline-none transition duration-150 ${
        error ? "ring-red-500 ring-2" : "ring-gray-700 focus:ring-blue-500"
      }`}
      placeholder={label}
      onChange={handleChange}
      {...props}
    />
    {error && <p className="text-red-400 text-sm ml-2">{error}</p>}
  </div>
);

// ---------------- Main Page ----------------
const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    botCheck: "",
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (formData.botCheck) return { honeypot: "Bot detected" };
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if ("honeypot" in validationErrors) return;
    if (Object.keys(validationErrors).length > 0)
      return toast.error("Please correct the form errors before submitting.");

    setStatus("loading");
    const submitToastId = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", { id: submitToastId });
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
          botCheck: "",
        });
      } else {
        toast.error("Failed to send message.", { id: submitToastId });
        setStatus("error");
      }
    } catch {
      toast.error("Network error. Please try again later.", {
        id: submitToastId,
      });
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  const WHATSAPP_NUMBER = "25479624561";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Kenneth`;

  const WhatsAppIcon = () => (
    <Image
      src="/images/whatsapp.svg"
      alt="WhatsApp"
      width={24}
      height={24}
      className="invert"
    />
  );

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col space-y-8"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          Contact  Me
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Form) */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="bg-[#202020] rounded-3xl p-6 md:p-10 shadow-lg w-full max-w-[85%]">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <InputField
                  label="Name"
                  name="name"
                  required
                  value={formData.name}
                  error={errors.name}
                  handleChange={handleChange}
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  handleChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  handleChange={handleChange}
                />
                <InputField
                  label="Consultation about business"
                  name="subject"
                  value={formData.subject}
                  handleChange={handleChange}
                />

                <div className="flex flex-col space-y-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Message"
                    className={`bg-[#282828] text-white p-4 rounded-xl h-32 focus:ring-2 outline-none transition duration-150 ${
                      errors.message
                        ? "ring-red-500 ring-2"
                        : "ring-gray-700 focus:ring-blue-500"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm ml-2">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="botCheck"
                  value={formData.botCheck}
                  onChange={handleChange}
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`py-4 rounded-xl text-xl text-white font-semibold transition-all shadow-xl ${
                    status === "loading"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-600/50"
                  }`}
                >
                  {status === "loading" ? "Sending..." : "Submit Button"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 flex flex-col space-y-8">
            <ContactInfoCard
              icon={<Phone size={24} />}
              title="Phone"
              content="+254 796 242 561"
            />

            <ContactInfoCard
              icon={<WhatsAppIcon />}
              title="WhatsApp Chat"
              content="0796 242 561"
              link={WHATSAPP_LINK}
              iconBgClass="bg-green-600"
            />

            <ContactInfoCard
              icon={<Mail size={24} />}
              title="Email"
              content="kenobul.tech@gmail.com"
            />

            <ContactInfoCard
              icon={<MapPin size={24} />}
              title="Location"
              content="Mathare, Nairobi, Kenya"
            />

            <ContactInfoCard
              icon={<Clock size={24} />}
              title="Assistance Hours"
              content="Sun – Fri: 9am – 6pm"
            />
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full relative h-96 rounded-3xl overflow-hidden shadow-2xl mt-8"
        >
          <Image
            src="/images/map.png"
            alt="Location Map"
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default ContactPage;