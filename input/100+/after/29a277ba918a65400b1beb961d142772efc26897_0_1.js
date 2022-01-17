function(e){
        if(jQuery.inArray(e.keyCode,[8, 13, 32]) === -1) {
            return;
        }
        var selection = getSelection(this);
        if(selection.getLength() > 0) {
            return; //there was text selected, keep standard behavior
        }
        var search    = "\n"+this.value.substr(0,selection.start);
        var linestart = Math.max(search.lastIndexOf("\n"),
                                 search.lastIndexOf("\r")); //IE workaround
        search = search.substr(linestart);

        if(e.keyCode == 13){ // Enter
            // keep current indention for lists and code
            var match = search.match(/(\n  +([\*-] ?)?)/);
            if(match){
                var scroll = this.scrollHeight;
                var match2 = search.match(/^\n  +[\*-]\s*$/);
                // Cancel list if the last item is empty (i. e. two times enter)
                if (match2 && this.value.substr(selection.start).match(/^($|\r?\n)/)) {
                    this.value = this.value.substr(0, linestart) + "\n" +
                                 this.value.substr(selection.start);
                    selection.start = linestart + 1;
                    selection.end = linestart + 1;
                    setSelection(selection);
                } else {
                    insertAtCarret(this.id,match[1]);
                }
                this.scrollTop += (this.scrollHeight - scroll);
                e.preventDefault(); // prevent enter key
                return false;
            }
        }else if(e.keyCode == 8){ // Backspace
            // unindent lists
            var match = search.match(/(\n  +)([*-] ?)$/);
            if(match){
                var spaces = match[1].length-1;

                if(spaces > 3){ // unindent one level
                    this.value = this.value.substr(0,linestart)+
                                 this.value.substr(linestart+2);
                    selection.start = selection.start - 2;
                    selection.end   = selection.start;
                }else{ // delete list point
                    this.value = this.value.substr(0,linestart)+
                                 this.value.substr(selection.start);
                    selection.start = linestart;
                    selection.end   = linestart;
                }
                setSelection(selection);
                e.preventDefault(); // prevent backspace
                return false;
            }
        }else if(e.keyCode == 32){ // Space
            // intend list item
            var match = search.match(/(\n  +)([*-] )$/);
            if(match){
                this.value = this.value.substr(0,linestart)+'  '+
                             this.value.substr(linestart);
                selection.start = selection.start + 2;
                selection.end   = selection.start;
                setSelection(selection);
                e.preventDefault(); // prevent space
                return false;
            }
        }
    }