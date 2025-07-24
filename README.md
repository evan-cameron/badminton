# Badminton Schedule Preference Form

A responsive web form for collecting scheduling preferences from group members for weekly badminton sessions.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Up to 4 Preferences**: Users can select up to 4 time slots
- **Drag & Drop Ranking**: Preferences can be reordered by dragging
- **Auto-calculated End Times**: Automatically calculates end time (2 hours after start)
- **Form Validation**: Ensures required fields are filled
- **Email Integration**: Multiple options for sending form data to email

## Files Structure

```
/badminton/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

### 1. Basic Setup
1. Download all files to a folder on your web server
2. Open `index.html` in a web browser to test locally
3. Customize the email recipient (see Email Setup below)

### 2. Email Setup Options

The form currently uses the `mailto:` method which opens the user's default email client. For production use, choose one of these alternatives:

#### Option A: EmailJS (Recommended - Free tier available)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. In `script.js`, update the `submitToEmail` method to use EmailJS:
   ```javascript
   // Replace the mailto method with:
   return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
   ```
4. Include EmailJS script in `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

#### Option B: Formspree (Easy setup)
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form and get your form ID
3. In `script.js`, replace the `submitToEmail` method to use the `submitWithFormspree` function
4. Update the form action URL with your Formspree endpoint

#### Option C: Custom Backend
1. Create a backend API endpoint to handle form submissions
2. Use the `submitToBackend` function in `script.js`
3. Update the API endpoint URL

### 3. Customization

#### Change Email Recipient
In `script.js`, find this line and update the email address:
```javascript
const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

#### Modify Time Options
In `index.html`, update the time options in the select elements:
```html
<option value="06:00">6:00 AM</option>
<!-- Add or remove time slots as needed -->
```

#### Update Title and Branding
1. Change the title in `index.html`
2. Update the header text and colors in `styles.css`
3. Modify the gradient colors in the CSS variables

#### Add More Days
To include additional days (like specific dates), modify the day select options in `index.html`.

## Usage Instructions for Form Users

1. **Fill in Personal Information**: Name and email are required
2. **Select Time Preferences**: 
   - Choose day of the week
   - Select start time (end time auto-calculates to 2 hours later)
   - Add up to 4 different time slots
3. **Rank Preferences**: Drag and drop to reorder preferences by importance
4. **Add Comments**: Optional field for additional notes
5. **Submit**: Click submit to send preferences via email

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Desktop: 768px and above
- Tablet: 768px and below
- Mobile: 480px and below

## Troubleshooting

### Form Not Submitting
1. Check browser console for JavaScript errors
2. Verify email service configuration
3. Test with a simple mailto link first

### Styling Issues
1. Clear browser cache
2. Check CSS file is loading properly
3. Verify file paths are correct

### Mobile Display Problems
1. Ensure viewport meta tag is present
2. Test on actual devices, not just browser dev tools
3. Check for CSS conflicts

## Future Enhancements

Possible additions for future versions:
- Calendar date picker for specific dates
- Time zone selection
- Recurring event options
- Admin dashboard for viewing responses
- SMS notifications
- Integration with calendar systems

## License

This project is open source and available under the MIT License.
# badminton
