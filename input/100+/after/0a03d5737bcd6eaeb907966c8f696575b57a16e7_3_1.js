function (model, url) {
        var template = model.createFromSelection === "fromTemplate" ? model.templateSelection : "",
            vocab = model.vocabSelection,
            params = {};
        if (template) {
            params.template = template;
        }
        if (vocab) {
            params.vocab = vocab;
        }
        var url = fluid.stringTemplate(url, {
            recordType: model.currentSelection,
            params: $.param(params)
        });
        if (url[url.length - 1] === "&" || url[url.length - 1] === "?") {
            url = url.slice(0, url.length - 1);
        }
        window.location = url;
    }