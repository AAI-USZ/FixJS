function(index) {
        var thisObj = $(this);

        var parent = thisObj.parent();
        parent.css("display", "block");
        
        var editor = CodeMirror.fromTextArea(thisObj[0], {
            lineNumbers: false,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            mode: "text/x-d",
            lineWrapping: true,
            theme: "eclipse",
            readOnly: false,
            matchBrackets: true
        });
        var height = function(diff) {
            return (parseInt(code.css('height')) - diff) + 'px';
        };
        if ($.browser.webkit)
            editor.setValue(parent.children("div.d_code_src").text());

        var runBtn = parent.children("input.runButton");
        var editBtn = parent.children("input.editButton");
        var inputBtn = parent.children("input.inputButton");
        var resetBtn = parent.children("input.resetButton");
        var argsBtn = parent.children("input.argsButton");
        var stdinDiv = parent.children("div.d_code_stdin");
        var argsDiv = parent.children("div.d_code_args");
        var outputDiv = parent.children("div.d_code_output");

        var code = $(editor.getWrapperElement());
        var output = outputDiv.children("textarea.d_code_output");
        var outputTitle = outputDiv.children("span.d_code_title");
        var stdin = stdinDiv.children("textarea.d_code_stdin");
        var args = argsDiv.children("textarea.d_code_args");

        var hideAllWindows = function()
        {
            stdinDiv.css('display', 'none');
            argsDiv.css('display', 'none');
            outputDiv.css('display', 'none');
            code.css('display', 'none');
        };

        argsBtn.click(function(){
            args.css('height', height(37));
            hideAllWindows();
            argsDiv.css('display', 'block');
            args.focus();
        });

        inputBtn.click(function(){
            stdin.css('height', height(37));
            hideAllWindows();
            stdinDiv.css('display', 'block');
            stdin.focus();
        });
        editBtn.click(function(){
            hideAllWindows();
            code.css('display', 'block');
            editor.focus();
        });

        runBtn.click(function(){
            $(this).attr("disabled", true);
            hideAllWindows();
            output.css('height', height(37));
            outputDiv.css('display', 'block');
            outputTitle.text("Application output");
            output.html("Running...");
            output.focus();
            
            $.ajax({
                type: 'POST',
                url: "/process.php",
                dataType: "xml",
                data: 
                {
                    'code' : encodeURIComponent(editor.getValue()), 
                    'stdin' : encodeURIComponent(stdin.val()), 
                    'args': encodeURIComponent(args.val())
                },
                success: function(data) 
                {
                    parseOutput(data, output, outputTitle);
                    runBtn.attr("disabled", false);
                },
                error: function() 
                {
                    output.html("Temporarily unavaible");
                    runBtn.attr("disabled", false);
                }
            });
        });
    }