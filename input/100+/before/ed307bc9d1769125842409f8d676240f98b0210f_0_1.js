function (templateSource, bindingContext, options) {
        var data = bindingContext['$data'];
        options = options || {};
        var templateText = templateSource.text();
        if (typeof templateText == "function")
            templateText = templateText(data, options);

        templateText = options.showParams ? templateText + ", data=" + data + ", options=" + options : templateText;
        var templateOptions = options.templateOptions; // Have templateOptions in scope to support [js:templateOptions.foo] syntax

        var result;
        with (bindingContext) {
            with (data || {}) {
                with (options.templateRenderingVariablesInScope || {}) {
                    // Dummy [renderTemplate:...] syntax
                    result = templateText.replace(/\[renderTemplate\:(.*?)\]/g, function (match, templateName) {
                        return ko.renderTemplate(templateName, data, options);
                    });


                    var evalHandler = function (match, script) {
                        try {
                            var evalResult = eval(script);
                            return (evalResult === null) || (evalResult === undefined) ? "" : evalResult.toString();
                        } catch (ex) {
                            throw new Error("Error evaluating script: [js: " + script + "]\n\nException: " + ex.toString());
                        }
                    }

                    // Dummy [[js:...]] syntax (in case you need to use square brackets inside the expression)
                    result = result.replace(/\[\[js\:([\s\S]*?)\]\]/g, evalHandler);

                    // Dummy [js:...] syntax
                    result = result.replace(/\[js\:([\s\S]*?)\]/g, evalHandler);
                }
            }
        }

        if (options.bypassDomNodeWrap)
            return ko.utils.parseHtmlFragment(result);
        else {
            var node = document.createElement("div");

            // Annoyingly, IE strips out comment nodes unless they are contained between other nodes, so put some dummy nodes around the HTML, then remove them after parsing.
            node.innerHTML = "<div>a</div>" + result + "<div>a</div>";
            node.removeChild(node.firstChild);
            node.removeChild(node.lastChild);

            return [node];
        }
    }