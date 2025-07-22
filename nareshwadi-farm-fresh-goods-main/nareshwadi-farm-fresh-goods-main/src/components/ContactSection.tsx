import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  return (
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
        <Card className="shadow-lg rounded-xl bg-gradient-to-br from-green-50 via-white to-leaf-green/20 border border-leaf-green/30">
          <CardHeader>
            <CardTitle className="text-leaf-green text-xl font-bold mb-2 drop-shadow">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-base font-semibold text-leaf-green block mb-2">First Name</label>
                <Input placeholder="Enter your first name" className="border-leaf-green/40 focus:border-leaf-green" />
              </div>
              <div>
                <label className="text-base font-semibold text-leaf-green block mb-2">Last Name</label>
                <Input placeholder="Enter your last name" className="border-leaf-green/40 focus:border-leaf-green" />
              </div>
            </div>
            <div>
              <label className="text-base font-semibold text-leaf-green block mb-2">Email</label>
              <Input placeholder="Enter your email address" className="border-leaf-green/40 focus:border-leaf-green" />
            </div>
            <div>
              <label className="text-base font-semibold text-leaf-green block mb-2">Message</label>
              <Textarea placeholder="Type your message here..." className="border-leaf-green/40 focus:border-leaf-green" />
            </div>
            <Button type="submit" className="w-full bg-leaf-green text-white font-bold py-3 rounded-lg shadow hover:bg-primary transition-colors duration-200">Send Message</Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-xl bg-gradient-to-br from-green-50 via-white to-leaf-green/20 border border-leaf-green/30">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-tr from-leaf-green to-primary rounded-full flex items-center justify-center shadow-md">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-leaf-green text-xl mb-1">Delivery Hours</h3>
                <p className="text-primary font-medium">Mon-Sat: <span className="font-bold">7 AM - 7 PM</span></p>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-leaf-green" />
                <span className="text-base font-medium text-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-leaf-green" />
                <span className="text-base font-medium text-foreground">contact@nareshwadi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-leaf-green" />
                <span className="text-base font-medium text-foreground">Nareshwadi Farm, Mumbai-Nashik Highway, Palghar, Maharashtra</span>
              </div>
            </div>
            <p className="text-base text-muted-foreground font-medium">
              Fresh produce delivered daily to <span className="text-leaf-green font-bold">Mumbai</span>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Areas */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-extrabold mb-6 text-leaf-green drop-shadow">Our Delivery Areas</h3>
        <div className="flex flex-wrap justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-leaf-green/10 via-white to-primary/10 border border-leaf-green/20 shadow">
          {["Kalyan", "Navi Mumbai", "Ghatkopar", "Andheri", "Bandra", "Borivali", "Powai", "Chembur", "Mulund", "Dadar"].map((area, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-leaf-green/80 text-white rounded-full text-base font-semibold shadow hover:bg-primary transition-colors duration-200 cursor-pointer"
            >
              {area}
            </span>
          ))}
        </div>
        <p className="text-base text-muted-foreground mt-6 font-medium">
          Send us an email anytime. We typically respond within <span className="text-leaf-green font-bold">24 hours</span>.
        </p>
      </div>
    </div>
  );
}