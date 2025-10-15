// Enhanced contact form submission with client-side handling for demo purposes

(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var btn = form.querySelector('button[type="submit"]');
    var messages = form.querySelector('.messages');

    function showAlert(type, text) {
        if (!messages) return;
        messages.innerHTML = '<div class="alert alert-' + type + ' alert-dismissable">'
            + '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
            + text + '</div>';
    }

    function validateForm() {
        var name = form.querySelector('input[name="name"]').value.trim();
        var email = form.querySelector('input[name="email"]').value.trim();
        var message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name) {
            showAlert('danger', 'Please enter your full name.');
            return false;
        }

        if (!email || !email.includes('@')) {
            showAlert('danger', 'Please enter a valid email address.');
            return false;
        }

        if (!message) {
            showAlert('danger', 'Please enter a message.');
            return false;
        }

        return true;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (btn) {
            btn.disabled = true;
            btn.dataset.originalText = btn.textContent;
            btn.textContent = 'Sending...';
        }

        // Simulate form processing with a delay
        setTimeout(function () {
            // For demo purposes, always show success and redirect
            showAlert('success', 'Message sent successfully! Redirecting...');
            form.reset();

            // Redirect to thank you page after 2 seconds
            setTimeout(function () {
                window.location.href = 'thank-you.html';
            }, 2000);

            if (btn) {
                btn.disabled = false;
                btn.textContent = btn.dataset.originalText || 'Send Message';
            }
        }, 1500); // Simulate processing time
    });
})();
}) ();