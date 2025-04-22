document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const strengthMeter = document.getElementById('strength-meter');
    const strengthText = document.getElementById('strength-text');
    const passwordFeedback = document.getElementById('password-feedback');
    const crackTime = document.getElementById('crack-time');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    let isPasswordVisible = false;
    
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        
        if (isPasswordVisible) {
            passwordInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    });
    
    // Check password strength on input
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        updateStrengthMeter(strength.score, strength.feedback);
        updateCrackTime(strength.crackTime);
    });
    
    // Calculate password strength
    function calculatePasswordStrength(password) {
        let score = 0;
        const feedback = {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false,
            common: false
        };
        
        // Length check (max 4 points)
        if (password.length > 0) score += Math.min(4, Math.floor(password.length / 3));
        feedback.length = password.length >= 12;
        
        // Character variety checks
        if (/[A-Z]/.test(password)) {
            score += 1;
            feedback.uppercase = true;
        }
        if (/[a-z]/.test(password)) {
            score += 1;
            feedback.lowercase = true;
        }
        if (/[0-9]/.test(password)) {
            score += 1;
            feedback.number = true;
        }
        if (/[^A-Za-z0-9]/.test(password)) {
            score += 1;
            feedback.special = true;
        }
        
        // Common password check
        const commonPasswords = ['password', '123456', 'qwerty', 'letmein', 'welcome', 'admin'];
        feedback.common = !commonPasswords.some(common => password.toLowerCase().includes(common));
        if (feedback.common) score += 2;
        
        // Calculate crack time (very simplified)
        const entropy = calculateEntropy(password);
        let crackTimeSeconds;
        
        if (entropy < 28) crackTimeSeconds = Math.pow(2, entropy) / 1000000000; // 1 billion guesses/sec
        else if (entropy < 60) crackTimeSeconds = Math.pow(2, entropy) / 1000000000;
        else crackTimeSeconds = Infinity;
        
        const crackTime = formatCrackTime(crackTimeSeconds);
        
        // Normalize score to 0-100
        score = Math.min(100, Math.max(0, score * 10));
        
        return { score, feedback, crackTime };
    }
    
    // Calculate password entropy (bits)
    function calculateEntropy(password) {
        let poolSize = 0;
        
        if (/[a-z]/.test(password)) poolSize += 26;
        if (/[A-Z]/.test(password)) poolSize += 26;
        if (/[0-9]/.test(password)) poolSize += 10;
        if (/[^A-Za-z0-9]/.test(password)) poolSize += 32; // approx special chars
        
        return Math.log2(Math.pow(poolSize, password.length));
    }
    
    // Format crack time to human readable
    function formatCrackTime(seconds) {
        if (seconds === Infinity) return 'Centuries';
        if (seconds < 1) return 'Instantly';
        if (seconds < 60) return `${Math.round(seconds)} second${seconds === 1 ? '' : 's'}`;
        
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.round(minutes)} minute${minutes === 1 ? '' : 's'}`;
        
        const hours = minutes / 60;
        if (hours < 24) return `${Math.round(hours)} hour${hours === 1 ? '' : 's'}`;
        
        const days = hours / 24;
        if (days < 365) return `${Math.round(days)} day${days === 1 ? '' : 's'}`;
        
        const years = days / 365;
        if (years < 100) return `${Math.round(years)} year${years === 1 ? '' : 's'}`;
        
        return 'Centuries';
    }
    
    // Update strength meter and text
    function updateStrengthMeter(score, feedback) {
        strengthMeter.style.width = `${score}%`;
        
        if (score < 20) {
            strengthMeter.className = 'h-2.5 rounded-full bg-red-500';
            strengthText.textContent = 'Very Weak';
            strengthText.className = 'font-bold text-red-500';
        } else if (score < 40) {
            strengthMeter.className = 'h-2.5 rounded-full bg-orange-500';
            strengthText.textContent = 'Weak';
            strengthText.className = 'font-bold text-orange-500';
        } else if (score < 70) {
            strengthMeter.className = 'h-2.5 rounded-full bg-yellow-500';
            strengthText.textContent = 'Moderate';
            strengthText.className = 'font-bold text-yellow-500';
        } else if (score < 90) {
            strengthMeter.className = 'h-2.5 rounded-full bg-blue-500';
            strengthText.textContent = 'Strong';
            strengthText.className = 'font-bold text-blue-500';
        } else {
            strengthMeter.className = 'h-2.5 rounded-full bg-green-500';
            strengthText.textContent = 'Very Strong';
            strengthText.className = 'font-bold text-green-500';
        }
        
        // Update feedback list
        const feedbackItems = [
            { condition: feedback.length, text: 'At least 12 characters long' },
            { condition: feedback.uppercase && feedback.lowercase, text: 'Contains uppercase and lowercase letters' },
            { condition: feedback.number && feedback.special, text: 'Includes numbers and special characters' },
            { condition: feedback.common, text: 'Not based on common words or personal info' }
        ];
        
        passwordFeedback.innerHTML = feedbackItems.map(item => `
            <li class="flex items-start">
                <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${item.condition ? 'text-green-500' : 'text-red-500'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.condition ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}"></path>
                </svg>
                <span>${item.text}</span>
            </li>
        `).join('');
    }
    
    // Update crack time display
    function updateCrackTime(time) {
        crackTime.textContent = time;
    }
});