function (template) {
        // FUTURE: consider using jQuery for all the DOM manipulation here
        var wrap = $("#editor-holder")[0];
        this.dialog = wrap.insertBefore(window.document.createElement("div"), wrap.firstChild);
        this.dialog.className = "CodeMirror-dialog";
        this.dialog.innerHTML = '<div>' + template + '</div>';
    }