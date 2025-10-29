// Enhanced contact form submission with client-side handling for demo purposes

(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const messages = form.querySelector('.messages');

    const show = (type, text) => {
        if (!messages) return;
        messages.innerHTML =
            `<div class="alert alert-${type} alert-dismissable">
         <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
         ${text}
       </div>`;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email.includes('@') || !message) {
            show('danger', 'Please complete all fields with a valid email.');
            return;
        }

        btn?.setAttribute('disabled', 'true');
        const original = btn?.textContent;
        if (btn) btn.textContent = 'Sending…';

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok && data?.type !== 'error') {
                show('success', 'Message sent! Redirecting…');
                form.reset();
                setTimeout(() => (window.location.href = 'thank-you.html'), 1500);
            } else {
                show('danger', data?.message || 'Sorry, something went wrong.');
            }
        } catch (err) {
            show('danger', 'Network error. Please try again.');
        } finally {
            if (btn) {
                btn.removeAttribute('disabled');
                btn.textContent = original || 'Send Message';
            }
        }
    });
})();
