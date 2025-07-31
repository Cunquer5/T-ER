interface EmailData {
  to: string;
  subject: string;
  body: string;
  fromName: string;
  fromEmail: string;
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Method 1: Using EmailJS (requires setup)
    // You'll need to sign up at https://www.emailjs.com/
    // and get your service ID, template ID, and user ID
    
    // Method 2: Using a simple mailto link (works immediately)
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    
    // Open the default email client
    window.open(mailtoLink);
    
    // For now, we'll simulate success
    console.log("Email data:", emailData);
    console.log("Mailto link:", mailtoLink);
    
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};

// Alternative: Using EmailJS (requires setup)
export const sendEmailWithEmailJS = async (emailData: EmailData): Promise<boolean> => {
  try {
    // This requires EmailJS setup
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create a service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your credentials
    
    // Example implementation (uncomment after setup):
    /*
    const { init, send } = await import('@emailjs/browser');
    
    // Initialize EmailJS
    init('YOUR_USER_ID');
    
    const result = await send(
      'YOUR_SERVICE_ID', // Email service ID
      'YOUR_TEMPLATE_ID', // Email template ID
      {
        to_email: emailData.to,
        subject: emailData.subject,
        message: emailData.body,
        from_name: emailData.fromName,
        from_email: emailData.fromEmail,
      },
      'YOUR_USER_ID' // User ID
    );
    
    return result.status === 200;
    */
    
    // For now, fall back to mailto
    return sendEmail(emailData);
  } catch (error) {
    console.error("EmailJS sending failed:", error);
    return false;
  }
};

// Method 3: Using a backend API (recommended for production)
export const sendEmailWithAPI = async (emailData: EmailData): Promise<boolean> => {
  try {
    // This would call your backend API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });
    
    return response.ok;
  } catch (error) {
    console.error("API email sending failed:", error);
    return false;
  }
}; 