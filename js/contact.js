// Enhanced contact form submission with Fetch API + graceful fallback

(function(){
    var form = document.getElementById('contact-form');
    if(!form) return;
    var btn  = form.querySelector('button[type="submit"]');
    var messages = form.querySelector('.messages');

    function showAlert(type, text){
        if(!messages) return;
        messages.innerHTML = '<div class="alert alert-'+type+' alert-dismissable">'
            +'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
            + text + '</div>';
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        if(btn){
            btn.disabled = true;
            btn.dataset.originalText = btn.textContent;
            btn.textContent = 'Sending...';
        }
        var formData = new FormData(form);
        fetch('contact.php', { method:'POST', body: formData, headers:{'X-Requested-With':'XMLHttpRequest'} })
            .then(function(r){ return r.json().catch(function(){ return {type:'error', message:'Unexpected response'}}); })
            .then(function(res){
                showAlert(res.type === 'success' ? 'success' : 'danger', res.message);
                if(res.type === 'success') { form.reset(); }
            })
            .catch(function(){ showAlert('danger','Network error, please try again.'); })
            .finally(function(){
                if(btn){
                    btn.disabled = false;
                    btn.textContent = btn.dataset.originalText || 'Send Message';
                }
            });
    });
})();