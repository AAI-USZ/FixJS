function(index) {
        var thisObj = $(this);

        var parent = thisObj.parent();
        parent.css("display", "block");
        var phobos = thisObj.text() != "" ? 1 : 0;
        var orgSrc = parent.parent().children("div.d_code").children("pre.d_code");

        var prepareForPhobos = function()
        {
            if (thisObj.text().match(/<a name="([a-z0-9]+)"><\/a><span class="ddoc_psymbol">/g))
            {
                var tmp = thisObj.text().replace(
                    /<a name="([a-z0-9]+)"><\/a><span class="ddoc_psymbol">([a-z0-9]+)<\/span>/g,
                    "$1");

                thisObj.text(tmp);
            }

            var src = $.browser.msie && $.browser.version < 9.0 ? orgSrc[0].innerText : orgSrc.text();
            var arr = src.split("\n");
            var str = "";
            for ( i = 0; i < arr.length; i++)
            {
                str += "\t"+arr[i]+"\n";
            }
            if (!$.browser.msie || ($.browser.msie && $.browser.version >= 9.0))
                str = str.substr(0, str.length - 2);

            str = thisObj.text()+"\n\nvoid main()\n{\n" +str+ "}";

            return str;
        };

        var prepareForMain = function()
        {
            var src = $.browser.msie && $.browser.version < 9.0 ? orgSrc[0].innerText : orgSrc.text();
            var arr = src.split("\n");
            var str = "";
            for ( i = 0; i < arr.length; i++)
            {
                str += arr[i]+"\n";
            }
            if ($.browser.msie && $.browser.version < 9.0)
                str = str.substr(0, str.length - 1);
            else
                str = str.substr(0, str.length - 2);

            return str;
        };

        var editor = CodeMirror.fromTextArea(thisObj[0], {
            lineNumbers: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: true,
            mode: "text/x-d",
            lineWrapping: true,
            theme: "eclipse",
            readOnly: false,
            matchBrackets: true
        });

        if (phobos) 
            editor.setValue(prepareForPhobos());
        else
            editor.setValue(prepareForMain());

        
        var height = function(diff) {
            var par = code != null ? code : parent.parent().children("div.d_code");
            return (parseInt(par.css('height')) - diff) + 'px';
        };

        var runBtn = parent.children("input.runButton");
        var editBtn = parent.children("input.editButton");
        var inputBtn = parent.children("input.inputButton");
        var resetBtn = parent.children("input.resetButton");
        var argsBtn = parent.children("input.argsButton");
        var stdinDiv = parent.children("div.d_code_stdin");
        var argsDiv = parent.children("div.d_code_args");
        var outputDiv = parent.children("div.d_code_output");

        var code = $(editor.getWrapperElement());
        code.css('display', 'none');

        var output = outputDiv.children("textarea.d_code_output");
        var outputTitle = outputDiv.children("span.d_code_title");
        var stdin = stdinDiv.children("textarea.d_code_stdin");
        var args = argsDiv.children("textarea.d_code_args");
        var orgArgs = args.val();
        var orgStdin = stdin.val();

        var hideAllWindows = function()
        {
            stdinDiv.css('display', 'none');
            argsDiv.css('display', 'none');
            outputDiv.css('display', 'none');
            parent.parent().children("div.d_code").css('display', 'none');
            code.css('display', 'none');
        };

        argsBtn.click(function(){
            resetBtn.css('display', 'inline-block');
            args.css('height', height(phobos ? 25:31));
            hideAllWindows();
            argsDiv.css('display', 'block');
            args.focus();
        });

        inputBtn.click(function(){
            resetBtn.css('display', 'inline-block');
            stdin.css('height', height(phobos ? 25:31));
            hideAllWindows();
            stdinDiv.css('display', 'block');
            stdin.focus();
        });
        editBtn.click(function(){
            resetBtn.css('display', 'inline-block');
            hideAllWindows();
            code.css('display', 'block');
            editor.refresh();
            editor.focus();
        });
        resetBtn.click(function(){
            resetBtn.css('display', 'none');
            editor.setValue(phobos ? prepareForPhobos() : prepareForMain());
            args.val(orgArgs);
            stdin.val(orgStdin);
            hideAllWindows();
            parent.parent().children("div.d_code").css('display', 'block');
        });
        runBtn.click(function(){
            resetBtn.css('display', 'inline-block');
            $(this).attr("disabled", true);
            hideAllWindows();
            output.css('height', height(phobos ? 25:31));
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