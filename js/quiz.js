// Quiz Questions
const quizQuestions = [
    {
        question: "What is the most common method used in phishing attacks?",
        options: [
            "Phone calls",
            "Emails pretending to be from legitimate organizations",
            "Social media posts",
            "Text messages"
        ],
        correctAnswer: 1,
        explanation: "Phishing most commonly occurs through emails that appear to be from trusted sources, tricking users into revealing sensitive information."
    },
    {
        question: "Which of these is NOT a characteristic of a strong password?",
        options: [
            "At least 12 characters long",
            "Contains personal information like your birthdate",
            "Includes uppercase and lowercase letters",
            "Contains numbers and special characters"
        ],
        correctAnswer: 1,
        explanation: "Strong passwords should never contain personal information that can be easily guessed or found online."
    },
    {
        question: "What should you do if you receive an email asking for your password?",
        options: [
            "Reply with your password if the email looks official",
            "Forward the email to your IT department or report it as phishing",
            "Click any links in the email to verify its authenticity",
            "Ignore it but don't report it"
        ],
        correctAnswer: 1,
        explanation: "Legitimate organizations will never ask for your password via email. Always report such requests."
    },
    {
        question: "What does HTTPS in a website URL indicate?",
        options: [
            "The website is popular",
            "The connection between your browser and the website is encrypted",
            "The website is government-approved",
            "The website is free from malware"
        ],
        correctAnswer: 1,
        explanation: "HTTPS indicates that the communication between your browser and the website is encrypted, helping protect your data."
    },
    {
        question: "What is two-factor authentication (2FA)?",
        options: [
            "Using two different passwords",
            "A security process where users provide two different authentication factors",
            "Having two separate user accounts",
            "Verifying your identity twice with the same method"
        ],
        correctAnswer: 1,
        explanation: "2FA requires two different types of credentials (like a password + SMS code) for better security."
    },
    {
        question: "Which of these is a sign that your computer might be infected with malware?",
        options: [
            "It runs faster than usual",
            "Unusual pop-up windows appear frequently",
            "Your antivirus software reports everything is fine",
            "All your files are perfectly organized"
        ],
        correctAnswer: 1,
        explanation: "Frequent pop-ups, slow performance, and strange behavior can indicate malware infection."
    },
    {
        question: "Why should you be cautious when using public Wi-Fi?",
        options: [
            "Public Wi-Fi is always completely safe",
            "Others on the same network might intercept your data",
            "It makes your device battery drain faster",
            "Public Wi-Fi is always slower than private networks"
        ],
        correctAnswer: 1,
        explanation: "Public Wi-Fi often lacks encryption, making it possible for hackers to intercept your sensitive data."
    },
    {
        question: "What is ransomware?",
        options: [
            "Software that improves computer performance",
            "Malicious software that encrypts files and demands payment",
            "A type of computer virus that spreads through email",
            "A security tool that protects against phishing"
        ],
        correctAnswer: 1,
        explanation: "Ransomware encrypts your files and demands payment (ransom) to restore access."
    },
    {
        question: "How often should you update your software and apps?",
        options: [
            "Only when new features are added",
            "At least once a year",
            "As soon as updates are available",
            "Never, to avoid potential bugs"
        ],
        correctAnswer: 2,
        explanation: "Timely updates patch security vulnerabilities that hackers could exploit."
    },
    {
        question: "What is social engineering in cybersecurity?",
        options: [
            "Creating social media content about security",
            "Psychological manipulation to trick people into revealing information",
            "A type of computer programming",
            "Engineering social networks for better connectivity"
        ],
        correctAnswer: 1,
        explanation: "Social engineering manipulates people into breaking security procedures or giving away confidential information."
    }
];

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let timeLeft = 60;
let timer;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const questionCounter = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const scoreMessage = document.getElementById('score-message');
const feedbackElement = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');

// Start Quiz
startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    startTimer();
    showQuestion();
}

// Timer Function
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishQuiz();
        }
    }, 1000);
}

// Show Question
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestion + 1}/${quizQuestions.length}`;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = `text-left p-4 rounded-lg transition ${userAnswers[currentQuestion] === index ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`;
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    prevBtn.classList.toggle('opacity-50', currentQuestion === 0);
    prevBtn.classList.toggle('cursor-not-allowed', currentQuestion === 0);
    
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next';
}

// Select Option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    showQuestion();
}

// Previous Question
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

// Next Question
nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishQuiz();
    }
});

// Finish Quiz
function finishQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    // Calculate score
    score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    // Display results
    scoreElement.textContent = `${score}/${quizQuestions.length}`;
    
    // Score message
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) {
        scoreMessage.textContent = 'Excellent! You have strong cybersecurity awareness.';
    } else if (percentage >= 50) {
        scoreMessage.textContent = 'Good job! You know some basics but there\'s room for improvement.';
    } else {
        scoreMessage.textContent = 'Keep learning! Cybersecurity is important for everyone.';
    }
    
    // Feedback
    feedbackElement.innerHTML = '<h3 class="font-bold text-lg mb-3">Quiz Breakdown:</h3>';
    quizQuestions.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correctAnswer;
        feedbackElement.innerHTML += `
            <div class="mb-4 p-3 rounded ${isCorrect ? 'bg-green-900 bg-opacity-30' : 'bg-red-900 bg-opacity-30'}">
                <p class="font-semibold">Q${index + 1}: ${question.question}</p>
                <p>Your answer: ${question.options[userAnswers[index] !== null ? userAnswers[index] : 'Not answered']}</p>
                <p>Correct answer: ${question.options[question.correctAnswer]}</p>
                <p class="text-sm text-gray-300 mt-1">${question.explanation}</p>
            </div>
        `;
    });
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    timeLeft = 60;
    
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    timerElement.textContent = `Time: ${timeLeft}s`;
});