function(){
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
        }