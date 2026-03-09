import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Youtube } from 'lucide-react';
import './Contact.css';
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const Contact = () => {

const form = useRef();

const sendEmail = (e) => {
e.preventDefault();

```
emailjs.sendForm(
  "service_o1ox9pf",
  "template_kmm4qrd",
  form.current,
  "Lvb5CwdJpN1MnJO__"
).then(
  () => {
    alert("Message sent successfully!");
  },
  () => {
    alert("Failed to send message.");
  }
);

e.target.reset();
```

};

return ( <section className="contact-section section" id="contact"> <div className="container">

```
    <div className="section-header">
      <motion.h2 
        className="gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Ready to start your dance journey? We'd love to hear from you.
      </motion.p>
    </div>

    <div className="contact-container">

      {/* CONTACT INFO */}
      <motion.div 
        className="contact-info"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >

        <h3>Contact Information</h3>

        <div className="info-item">
          <MapPin className="info-icon" />
          <div>
            <h4 className="text-white">Location</h4>
            <p className="text-gray-200">Jammikunta</p>
          </div>
        </div>

        <div className="info-item">
          <Phone className="info-icon" />
          <div>
            <h4 className="text-white">Phone</h4>
            <p className="text-gray-200">9573551643</p>
            <p className="text-gray-200">9573831643</p>
          </div>
        </div>

        <div className="info-item">
          <Mail className="info-icon" />
          <div>
            <h4 className="text-white">Email</h4>
            <p className="text-gray-200">prasangidancestudio@gmail.com</p>
          </div>
        </div>

        <div className="info-item mt-4">
          <Instagram className="info-icon" />
          <div>
            <h4 className="text-white">Instagram</h4>
            <p><a href="https://www.instagram.com/prasangidancestudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition-colors">@prasangidancestudio</a></p>
          </div>
        </div>

        <div className="info-item">
          <Youtube className="info-icon" />
          <div>
            <h4 className="text-white">YouTube</h4>
            <p><a href="https://www.youtube.com/@PrasangiDanceStudio" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">@PrasangiDanceStudio</a></p>
          </div>
        </div>

      </motion.div>


      {/* CONTACT FORM */}
      <motion.div 
        className="contact-form-wrapper"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >

        <form ref={form} className="contact-form" onSubmit={sendEmail}>

          <div className="form-group">
            <label className="text-white font-medium drop-shadow-sm">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium drop-shadow-sm">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium drop-shadow-sm">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Class Inquiry"
            />
          </div>

          <div className="form-group">
            <label className="text-white font-medium drop-shadow-sm">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us how we can help..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Send Message
          </button>

        </form>

      </motion.div>

    </div>

    {/* GOOGLE MAP */}
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps?q=Prasangi+Dance+Studio+and+Fitness+Center,+Jammikunta&output=embed"
        width="100%"
        height="350"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </div>

  </div>
</section>


);
};

export default Contact;
