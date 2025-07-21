import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact-section" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="font-script text-leaf-green">Get in</span> Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or want to learn more about organic farming? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    First Name
                  </label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Email Address
                </label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Phone Number
                </label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us about your inquiry, bulk orders, or any questions you have..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button variant="default" size="lg" className="w-full">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Visit Our Farm</h3>
                    <p className="text-muted-foreground">Nareshwadi Village, Pune District, Maharashtra 412345</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Come visit our organic farm and see how we grow our produce. 
                  Farm tours available on weekends by appointment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Call Us</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available Monday to Saturday, 8 AM to 6 PM for orders and inquiries.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-muted-foreground">info@nareshwadiproducts.com</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send us an email anytime. We typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Delivery Hours</h3>
                    <p className="text-muted-foreground">Mon-Sat: 7 AM - 7 PM</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fresh produce delivered daily within 25km radius of Nareshwadi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Our Delivery Areas</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Pune", "Pimpri-Chinchwad", "Talegaon", "Lonavala", "Khandala", 
              "Karjat", "Khopoli", "Panvel", "Navi Mumbai", "Kalyan"
            ].map((area, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};