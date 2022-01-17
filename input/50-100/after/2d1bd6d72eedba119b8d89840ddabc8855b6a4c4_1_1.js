function display_recorder(type) {
    var form = document.getElementById('mform1'),
        params = 'type=' + type + '&browserplugins=' + JSON.stringify(BrowserPlugins) +
            '&browserdetect=' + JSON.stringify(BrowserDetect);
    form.action = form.action + '?' + params;
    form.submit();
}