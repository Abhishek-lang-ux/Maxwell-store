import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend baad mein connect karenge
    alert("Thank you for contacting Maxwell. We will get back to you soon.");

    e.target.reset();
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* HEADER */}
        <div className="contact-heading">
          <p className="small-title">GET IN TOUCH</p>

          <h2>
            We’re Here to
            <span> Help</span>
          </h2>

          <p>
            Have a question about our products, dealership opportunities,
            service or anything else? Get in touch with the Maxwell team.
          </p>
        </div>

        <div className="contact-content">

          {/* LEFT SIDE */}
          <div className="contact-info">

            <div className="contact-info-card">
              <div className="contact-icon">
                <Phone size={21} />
              </div>

              <div>
                <span>CALL US</span>
                <h3>+91 XXXXX XXXXX</h3>
                <p>
                  Monday – Saturday
                  <br />
                  10:00 AM – 6:00 PM
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <Mail size={21} />
              </div>

              <div>
                <span>EMAIL US</span>
                <h3>info@maxwellgroup.in</h3>
                <p>
                  Send us your enquiry and our team
                  will get back to you.
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <MessageCircle size={21} />
              </div>

              <div>
                <span>DEALER & BULK ENQUIRY</span>
                <h3>Business Enquiries</h3>
                <p>
                  Interested in becoming a Maxwell dealer
                  or distributor? Contact our team.
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon">
                <MapPin size={21} />
              </div>

              <div>
                <span>OUR LOCATION</span>
                <h3>Maxwell Home Appliances</h3>
                <p>
                  India
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="contact-form-wrapper">

            <div className="contact-form-header">
              <p className="small-title">SEND A MESSAGE</p>
              <h3>How can we help?</h3>
              <p>
                Fill in the details below and our team will contact you.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>

              <div className="contact-form-row">

                <label>
                  Full Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </label>

              </div>

              <div className="contact-form-row">

                <label>
                  Email Address
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Subject
                  <select name="subject" defaultValue="">
                    <option value="" disabled>
                      Select enquiry type
                    </option>
                    <option value="Product Enquiry">
                      Product Enquiry
                    </option>
                    <option value="Dealer Enquiry">
                      Dealer / Distributor Enquiry
                    </option>
                    <option value="Bulk Enquiry">
                      Bulk Order Enquiry
                    </option>
                    <option value="Service Enquiry">
                      Service Enquiry
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </label>

              </div>

              <label>
                Message
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </label>

              <button type="submit" className="contact-submit-btn">
                <span>Send Message</span>
                <ArrowRight size={18} />
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;