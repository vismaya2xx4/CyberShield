// Threat Data
const threats = [
    {
        id: 1,
        title: "Phishing",
        icon: "📧",
        description: "Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity.",
        examples: [
            "Emails pretending to be from your bank",
            "Fake login pages for social media",
            "Text messages with urgent requests"
        ],
        prevention: [
            "Verify sender email addresses",
            "Never click links in unsolicited emails",
            "Use multi-factor authentication"
        ],
        severity: "High"
    },
    {
        id: 2,
        title: "Ransomware",
        icon: "🔒",
        description: "Malicious software that encrypts files and demands payment for their release.",
        examples: [
            "WannaCry attack (2017)",
            "Encrypted documents with .locked extension",
            "Pop-up messages demanding Bitcoin"
        ],
        prevention: [
            "Regularly backup important files",
            "Keep software updated",
            "Don't open suspicious attachments"
        ],
        severity: "Critical"
    },
    {
        id: 3,
        title: "Social Engineering",
        icon: "👥",
        description: "Psychological manipulation to trick people into revealing confidential information.",
        examples: [
            "Phone calls pretending to be IT support",
            "Tailgating into secure buildings",
            "Dumpster diving for sensitive documents"
        ],
        prevention: [
            "Verify identities before sharing info",
            "Follow company security policies",
            "Shred sensitive documents"
        ],
        severity: "Medium"
    },
    {
        id: 4,
        title: "Brute Force Attacks",
        icon: "💥",
        description: "Trying countless password combinations to gain unauthorized access.",
        examples: [
            "Automated login attempts",
            "Credential stuffing attacks",
            "Password spraying across accounts"
        ],
        prevention: [
            "Use strong, unique passwords",
            "Implement account lockout policies",
            "Enable multi-factor authentication"
        ],
        severity: "High"
    },
    {
        id: 5,
        title: "Man-in-the-Middle",
        icon: "👂",
        description: "Secretly intercepting and possibly altering communications between two parties.",
        examples: [
            "Public Wi-Fi eavesdropping",
            "Fake cell towers (IMSI catchers)",
            "SSL stripping attacks"
        ],
        prevention: [
            "Use VPN on public networks",
            "Look for HTTPS in URLs",
            "Verify website certificates"
        ],
        severity: "High"
    },
    {
        id: 6,
        title: "Zero-Day Exploits",
        icon: "0️⃣",
        description: "Attacks targeting vulnerabilities before developers have released patches.",
        examples: [
            "Stuxnet worm",
            "Heartbleed vulnerability",
            "Pegasus spyware"
        ],
        prevention: [
            "Use next-gen antivirus solutions",
            "Apply security patches immediately",
            "Limit software installations"
        ],
        severity: "Critical"
    }
];

// DOM Elements
const threatsContainer = document.getElementById('threats-container');
const threatSearch = document.getElementById('threat-search');

// Display Threats
function displayThreats(threatsToDisplay) {
    threatsContainer.innerHTML = '';
    
    threatsToDisplay.forEach(threat => {
        const threatCard = document.createElement('div');
        threatCard.className = 'bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1';
        threatCard.innerHTML = `
            <div class="p-6">
                <div class="flex items-center mb-4">
                    <span class="text-3xl mr-4">${threat.icon}</span>
                    <h2 class="text-2xl font-bold">${threat.title}</h2>
                    <span class="ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                        threat.severity === 'Critical' ? 'bg-red-900 text-red-300' : 
                        threat.severity === 'High' ? 'bg-orange-900 text-orange-300' :
                        'bg-yellow-900 text-yellow-300'
                    }">${threat.severity}</span>
                </div>
                <p class="text-gray-300 mb-4">${threat.description}</p>
                
                <div class="mb-4">
                    <h3 class="font-semibold text-cyan-400 mb-2">Examples:</h3>
                    <ul class="list-disc pl-5 text-gray-400 space-y-1">
                        ${threat.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="mb-4">
                    <h3 class="font-semibold text-green-400 mb-2">Prevention:</h3>
                    <ul class="list-disc pl-5 text-gray-400 space-y-1">
                        ${threat.prevention.map(pre => `<li>${pre}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        threatsContainer.appendChild(threatCard);
    });
}

// Search Threats
threatSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredThreats = threats.filter(threat => 
        threat.title.toLowerCase().includes(searchTerm) ||
        threat.description.toLowerCase().includes(searchTerm) ||
        threat.examples.some(ex => ex.toLowerCase().includes(searchTerm)) ||
        threat.prevention.some(pre => pre.toLowerCase().includes(searchTerm))
    );
    displayThreats(filteredThreats);
});

// Initial display
displayThreats(threats);