function sendForm(url, form, node)
    {
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X_Requested_With', 'XMLHttpRequest');
        xhr.onload = function(e){
            submissionHandler(xhr, node);
        };
        xhr.send(formData);
    }