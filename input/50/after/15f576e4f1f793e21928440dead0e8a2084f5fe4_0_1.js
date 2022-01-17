function(){
            resetBtn.css('display', 'inline-block');
            stdin.css('height', height(phobos ? 25:31));
            hideAllWindows();
            stdinDiv.css('display', 'block');
            stdin.focus();
        }