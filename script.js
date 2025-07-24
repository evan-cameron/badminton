class ScheduleFormManager {
    constructor() {
        this.preferenceCount = 1;
        this.maxPreferences = 4;
        this.form = document.getElementById('scheduleForm');
        this.preferencesContainer = document.getElementById('preferences-container');
        this.addPreferenceBtn = document.getElementById('add-preference');
        this.successMessage = document.getElementById('success-message');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateEndTime(1);
        this.makeSortable();
    }

    bindEvents() {
        // Add preference button
        this.addPreferenceBtn.addEventListener('click', () => this.addPreference());

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Form reset
        this.form.addEventListener('reset', () => this.handleReset());

        // Time change listeners for auto-calculating end time
        this.preferencesContainer.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('start_time_')) {
                const prefNum = e.target.name.split('_')[2];
                this.updateEndTime(prefNum);
            }
        });
    }

    addPreference() {
        if (this.preferenceCount >= this.maxPreferences) return;

        this.preferenceCount++;
        const preferenceHTML = this.createPreferenceHTML(this.preferenceCount);
        this.preferencesContainer.insertAdjacentHTML('beforeend', preferenceHTML);
        
        this.updateAddButton();
        this.makeSortable();
    }

    createPreferenceHTML(number) {
        const ordinals = ['', '1st', '2nd', '3rd', '4th'];
        return `
            <div class="preference-item" data-preference="${number}">
                <div class="preference-header">
                    <span class="preference-number">${ordinals[number]} Preference</span>
                    <button type="button" class="remove-preference" onclick="scheduleForm.removePreference(this)">×</button>
                </div>
                <div class="time-selection">
                    <div class="form-row">
                        <div class="form-col">
                            <label>Day of Week</label>
                            <select name="day_${number}" required>
                                <option value="">Select Day</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                        </div>
                        <div class="form-col">
                            <label>Start Time</label>
                            <select name="start_time_${number}" required>
                                <option value="">Select Time</option>
                                <option value="06:00">6:00 AM</option>
                                <option value="07:00">7:00 AM</option>
                                <option value="08:00">8:00 AM</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="17:00">5:00 PM</option>
                                <option value="18:00">6:00 PM</option>
                                <option value="19:00">7:00 PM</option>
                                <option value="20:00">8:00 PM</option>
                                <option value="21:00">9:00 PM</option>
                            </select>
                        </div>
                        <div class="form-col">
                            <label>End Time</label>
                            <input type="text" name="end_time_${number}" readonly placeholder="Auto-calculated">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    removePreference(button) {
        const preferenceItem = button.closest('.preference-item');
        preferenceItem.remove();
        this.preferenceCount--;
        this.updatePreferenceNumbers();
        this.updateAddButton();
        this.makeSortable();
    }

    updatePreferenceNumbers() {
        const ordinals = ['', '1st', '2nd', '3rd', '4th'];
        const preferences = this.preferencesContainer.querySelectorAll('.preference-item');
        
        preferences.forEach((item, index) => {
            const number = index + 1;
            item.dataset.preference = number;
            
            // Update preference number display
            const numberSpan = item.querySelector('.preference-number');
            numberSpan.textContent = `${ordinals[number]} Preference`;
            
            // Update form field names
            const day = item.querySelector('[name^="day_"]');
            const startTime = item.querySelector('[name^="start_time_"]');
            const endTime = item.querySelector('[name^="end_time_"]');
            
            if (day) day.name = `day_${number}`;
            if (startTime) startTime.name = `start_time_${number}`;
            if (endTime) endTime.name = `end_time_${number}`;
        });
    }

    updateEndTime(preferenceNumber) {
        const startTimeSelect = document.querySelector(`[name="start_time_${preferenceNumber}"]`);
        const endTimeInput = document.querySelector(`[name="end_time_${preferenceNumber}"]`);
        
        if (startTimeSelect && endTimeInput && startTimeSelect.value) {
            const startTime = startTimeSelect.value;
            const [hours, minutes] = startTime.split(':').map(Number);
            const endHours = (hours + 2) % 24;
            const endTimeFormatted = `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            // Convert to 12-hour format for display
            const endTime12Hour = this.convertTo12Hour(endTimeFormatted);
            endTimeInput.value = endTime12Hour;
        }
    }

    convertTo12Hour(time24) {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    updateAddButton() {
        this.addPreferenceBtn.disabled = this.preferenceCount >= this.maxPreferences;
        if (this.preferenceCount >= this.maxPreferences) {
            this.addPreferenceBtn.textContent = 'Maximum 4 preferences reached';
        } else {
            this.addPreferenceBtn.textContent = '+ Add Another Preference';
        }
    }

    makeSortable() {
        // Simple drag and drop functionality
        const preferences = this.preferencesContainer.querySelectorAll('.preference-item');
        
        preferences.forEach(item => {
            item.draggable = true;
            
            item.addEventListener('dragstart', (e) => {
                item.classList.add('dragging');
                e.dataTransfer.setData('text/plain', '');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
                this.updatePreferenceNumbers();
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                const dragging = this.preferencesContainer.querySelector('.dragging');
                const afterElement = this.getDragAfterElement(e.clientY);
                
                if (afterElement == null) {
                    this.preferencesContainer.appendChild(dragging);
                } else {
                    this.preferencesContainer.insertBefore(dragging, afterElement);
                }
            });
        });
    }

    getDragAfterElement(y) {
        const draggableElements = [...this.preferencesContainer.querySelectorAll('.preference-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    validateForm() {
        const formData = new FormData(this.form);
        const preferences = [];
        
        // Check if we have at least one preference
        let hasPreference = false;
        for (let i = 1; i <= this.preferenceCount; i++) {
            const day = formData.get(`day_${i}`);
            const startTime = formData.get(`start_time_${i}`);
            
            if (day && startTime) {
                hasPreference = true;
                preferences.push({
                    rank: i,
                    day: day,
                    startTime: startTime,
                    endTime: formData.get(`end_time_${i}`)
                });
            }
        }
        
        if (!hasPreference) {
            alert('Please select at least one time preference.');
            return false;
        }
        
        return true;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        // Add loading state
        this.form.classList.add('form-submitting');
        
        try {
            const formData = this.collectFormData();
            await this.submitToEmail(formData);
            this.showSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your preferences. Please try again.');
        } finally {
            this.form.classList.remove('form-submitting');
        }
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            comments: formData.get('comments'),
            preferences: []
        };
        
        // Collect preferences in order
        const preferences = this.preferencesContainer.querySelectorAll('.preference-item');
        preferences.forEach((item, index) => {
            const number = index + 1;
            const day = formData.get(`day_${number}`);
            const startTime = formData.get(`start_time_${number}`);
            const endTime = formData.get(`end_time_${number}`);
            
            if (day && startTime) {
                data.preferences.push({
                    rank: number,
                    day: this.capitalizeFirst(day),
                    startTime: startTime,
                    endTime: endTime
                });
            }
        });
        
        return data;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async submitToEmail(data) {
        // Create email content
        const subject = `Badminton Schedule Preferences - ${data.name}`;
        const body = this.createEmailBody(data);
        
        // Using EmailJS to send emails directly from the web app
        try {
            const templateParams = {
                to_email: 'ecameron@nscad.ca',
                from_name: data.name,
                from_email: data.email,
                subject: subject,
                message: body,
                phone: data.phone || 'Not provided',
                preferences_formatted: data.preferences.map(p => 
                    `${p.rank}. ${p.day} from ${this.convertTo12Hour(p.startTime)} to ${p.endTime}`
                ).join('\n'),
                comments: data.comments || 'None',
                submission_date: new Date().toLocaleString()
            };

            // Initialize EmailJS if not already done
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded. Please check your internet connection.');
            }

            // Send email using EmailJS
            const response = await emailjs.send(
                'service_9uk5zmq',   // Your EmailJS Service ID
                'template_schedule',  // Template ID - you'll need to create this
                templateParams,
                'YOUR_PUBLIC_KEY'    // Public Key - you'll get this from EmailJS
            );

            console.log('Email sent successfully:', response);
            return response;

        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Fallback to mailto if EmailJS fails
            console.log('Falling back to mailto...');
            const mailtoLink = `mailto:ecameron@nscad.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            
            throw error;
        }
    }

    createEmailBody(data) {
        let body = `New badminton scheduling preferences received:\n\n`;
        body += `Name: ${data.name}\n`;
        body += `Email: ${data.email}\n`;
        if (data.phone) {
            body += `Phone: ${data.phone}\n`;
        }
        body += `\nTime Preferences (in order of preference):\n\n`;
        
        data.preferences.forEach((pref, index) => {
            body += `${pref.rank}. ${pref.day} from ${this.convertTo12Hour(pref.startTime)} to ${pref.endTime}\n`;
        });
        
        if (data.comments) {
            body += `\nAdditional Comments:\n${data.comments}\n`;
        }
        
        body += `\nSubmitted on: ${new Date().toLocaleString()}\n`;
        
        return body;
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleReset() {
        // Reset to single preference
        this.preferenceCount = 1;
        
        // Remove all preferences except the first one
        const preferences = this.preferencesContainer.querySelectorAll('.preference-item');
        for (let i = 1; i < preferences.length; i++) {
            preferences[i].remove();
        }
        
        // Reset the first preference
        const firstPreference = this.preferencesContainer.querySelector('.preference-item');
        const selects = firstPreference.querySelectorAll('select');
        const inputs = firstPreference.querySelectorAll('input');
        
        selects.forEach(select => select.selectedIndex = 0);
        inputs.forEach(input => input.value = '');
        
        this.updateAddButton();
        this.successMessage.style.display = 'none';
        this.form.style.display = 'block';
    }
}

// Alternative email submission methods you can implement:

// Method 1: Using EmailJS (requires signup at emailjs.com)
async function submitWithEmailJS(data) {
    // You would need to include EmailJS script and configure it
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        preferences: data.preferences.map(p => 
            `${p.rank}. ${p.day} from ${scheduleForm.convertTo12Hour(p.startTime)} to ${p.endTime}`
        ).join('\n'),
        comments: data.comments,
        submission_date: new Date().toLocaleString()
    };
    
    // return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
}

// Method 2: Using Formspree (requires signup at formspree.io)
async function submitWithFormspree(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}

// Method 3: Using your own backend API
async function submitToBackend(data) {
    const response = await fetch('/api/submit-preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
}

// Global functions for HTML onclick handlers
function removePreference(button) {
    scheduleForm.removePreference(button);
}

// Initialize the form manager when the page loads
let scheduleForm;
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual EmailJS public key
    }
    
    scheduleForm = new ScheduleFormManager();
});
