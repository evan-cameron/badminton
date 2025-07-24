# EmailJS Setup Guide

To enable direct email sending from your web form without opening a mail app, follow these steps to set up EmailJS:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (something like `service_1abc234`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Settings:
- **Template Name**: `Badminton Schedule Preferences`
- **Template ID**: `template_schedule`

### Email Template Content:

**To Email**: `{{to_email}}`

**Subject**: `{{subject}}`

**Content**:
```
New badminton scheduling preferences received:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Time Preferences (in order of preference):
{{preferences_formatted}}

Additional Comments:
{{comments}}

Submitted on: {{submission_date}}

---
This email was sent automatically from the Badminton Scheduling Form.
```

4. Save the template and note the **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** in your EmailJS dashboard
2. Find your **Public Key** (starts with something like `user_...` or a random string)
3. Copy this key

## Step 5: Update Your Code

Replace the placeholder values in your `script.js` file:

1. **Line ~318**: Replace `'service_badminton'` with your actual Service ID
2. **Line ~319**: Replace `'template_schedule'` with your actual Template ID  
3. **Line ~321**: Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key
4. **Line ~424**: Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key

### Example:
```javascript
// Replace these lines in script.js:
const response = await emailjs.send(
    'service_1abc234',     // Your Service ID
    'template_schedule',   // Your Template ID
    templateParams,
    'user_xyz789abc'      // Your Public Key
);

// And in the initialization:
emailjs.init('user_xyz789abc'); // Your Public Key
```

## Step 6: Test Your Form

1. Open your `index.html` file in a web browser
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the test message

## Troubleshooting

### Common Issues:

1. **"EmailJS not loaded" error**:
   - Check your internet connection
   - Verify the EmailJS script is loading in the browser console

2. **Email not being sent**:
   - Verify all IDs and keys are correct
   - Check EmailJS dashboard for usage limits
   - Look for errors in browser console

3. **Template variables not showing**:
   - Double-check template variable names match the templateParams object
   - Ensure template is saved and published

### Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- Basic support

### Testing:
- Use your own email address for initial testing
- Check spam folders if emails don't arrive
- Monitor the EmailJS dashboard for delivery status

## Security Note

The public key is safe to include in client-side code. However, for production use, consider:
- Setting up domain restrictions in EmailJS dashboard
- Implementing rate limiting
- Adding form validation to prevent spam

## Alternative: Formspree (Simpler Setup)

If EmailJS seems complex, consider Formspree as an alternative:

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Get your form endpoint URL
4. Replace the EmailJS code with a simple fetch request to Formspree

Let me know if you need help with any of these steps!
