function () {
            var hide = settings.hide;
            var inputLocation = $(settings.inputLocation);
            var outputLocation = $(settings.outputLocation);
            var evalButtonText = settings.evalButtonText;

            if (inputLocation.is("textarea")) {
                var ta = inputLocation;
                inputLocation = $(document.createElement("div")).insertBefore(inputLocation);
                inputLocation.html(sagecell.body);
                ta.addClass("sagecell_commands");
                ta.attr({"autocapitalize": "off", "autocorrect": "off", "autocomplete": "off"});
                inputLocation.find(".sagecell_commands").replaceWith(ta);
                var id = "input_" + IPython.utils.uuid();
                inputLocation[0].id = id;
                if (settings.outputLocation === settings.inputLocation) {
                    outputLocation = $(settings.outputLocation = "#" + id);
                }
                settings.inputLocation = "#" + id;
            } else {
                inputLocation.html(sagecell.body);
            }
            var id = IPython.utils.uuid();
            inputLocation.find(".sagecell_editorToggle label").attr("for", id);
            inputLocation.find(".sagecell_editorToggle input").attr("id", id);
            inputLocation.addClass("sagecell");
            outputLocation.addClass("sagecell");
            inputLocation.find(".sagecell_commands").val(settings.code);
            if (inputLocation !== outputLocation) {
                inputLocation.find(".sagecell_output_elements").appendTo(outputLocation);
            }
            outputLocation.find(".sagecell_output_elements").hide();
            hide.push("files", "sageMode", "sessionFiles"); // TODO: Delete this line when these features are implemented.
            if (settings.mode === "debug") {
                console.warn("Running the Sage Cell in debug mode!");
            } else {
                var hideAdvanced = {};
                var hideable = {"in": {"computationID": true, "editor": true,
                                       "editorToggle": true,  "files": true,
                                       "evalButton": true,    "sageMode": true},
                                "out": {"output": true,       "messages": true,
                                        "sessionFiles": true, "permalink": true}};
                var hidden_out = [];
                for (var i = 0, i_max = hide.length; i < i_max; i++) {
                    if (hide[i] in hideable["in"]) {
                        inputLocation.find(".sagecell_"+hide[i]).css("display", "none");
                        // TODO: make the advancedFrame an option to hide, then delete
                        // this hideAdvanced hack
                        if (hide[i] === 'files' || hide[i] === 'sageMode') {
                            hideAdvanced[hide[i]] = true;
                        }
                    } else if (hide[i] in hideable["out"]) {
                        hidden_out.push(settings.outputLocation + " .sagecell_" + hide[i]);
                    }
                }
                if (hideAdvanced.files && hideAdvanced.sageMode) {
                    inputLocation.find(".sagecell_advancedFrame").css("display", "none");
                }
                if (hidden_out.length > 0) {
                    var s = document.createElement("style");
                    var css = hidden_out.join(", ") + " {display: none;}";
                    s.setAttribute("type", "text/css");
                    if (s.styleSheet) {
                        s.styleSheet.cssText = css;
                    } else {
                        s.appendChild(document.createTextNode(css));
                    }
                    document.head.appendChild(s);
                }
            }
            if (evalButtonText !== undefined) {
                inputLocation.find(".sagecell_evalButton").text(evalButtonText);
            }
            sagecell.initCell(settings);
        }