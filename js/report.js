document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('report-form');
    const evidenceInput = document.getElementById('evidence');
    const fileList = document.getElementById('file-list');
    const anonymousCheckbox = document.getElementById('anonymous');

    // Handle file upload display
    evidenceInput.addEventListener('change', function() {
        fileList.innerHTML = '';
        if (this.files.length > 0) {
            const list = document.createElement('ul');
            Array.from(this.files).forEach(file => {
                const listItem = document.createElement('li');
                listItem.className = 'flex items-center py-1';
                listItem.innerHTML = `
                    <svg class="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    ${file.name} (${formatFileSize(file.size)})
                `;
                list.appendChild(listItem);
            });
            fileList.appendChild(list);
        }
    });

    // Anonymous checkbox logic
    anonymousCheckbox.addEventListener('change', function() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        
        if (this.checked) {
            nameInput.disabled = true;
            emailInput.disabled = true;
            nameInput.value = '';
            emailInput.value = '';
        } else {
            nameInput.disabled = false;
            emailInput.disabled = false;
        }
    });

    // Form submission
    reportForm.addEventListener('submit', function(e) {
        // You can add form validation here
        // e.preventDefault(); // Uncomment to test without submitting
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
        `;
    });

    // Helper function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});