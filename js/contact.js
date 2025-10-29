// Enhanced contact form submission with client-side handling for demo purposes

(function () {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const messages = form.querySelector(".messages");

    function show(type, text) {
        if (!messages) return;
        messages.innerHTML =
            '<div class="alert alert-' +
            type +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            text +
            "</div>";
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        if (btn) {
            btn.disabled = true;
            btn.dataset.originalText = btn.textContent;
            btn.textContent = "Sending...";
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.type === "success") {
                show("success", data.message || "Success!");
                form.reset();
                setTimeout(() => (window.location.href = "thank-you.html"), 1200);
            } else {
                show("danger", data.message || "Something went wrong.");
            }
        } catch (err) {
            show("danger", "Network error. Please try again.");
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = btn.dataset.originalText || "Send Message";
            }
        }
    });
})();
