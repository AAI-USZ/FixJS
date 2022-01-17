function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
    }

    var proxy = localStorage['proxy'];
    $('#proxy').val(proxy);

    $('#set').click(function () {
        var proxy = $('#proxy').val();

        localStorage['proxy'] = proxy;

        var pac = hosts2pac(proxy);

        var config = {
            mode: "pac_script",
            pacScript: {
                data: pac
            }
        };
        chrome.proxy.settings.set({
            value: config, 
            scope: 'regular'
        }, function() {});

        alert('OK');
    });
    CodeMirror.fromTextArea(document.getElementById("proxy"), {
        lineNumbers: true,
        smartIndent: false,
        electricChars: false
    });
}