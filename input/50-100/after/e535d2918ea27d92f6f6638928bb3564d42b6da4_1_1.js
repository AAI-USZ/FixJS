function(e) {         
            if (e.doc.editor.path !== "ext/code/code") {
                return;
            }
            this.undecorate(this.currentFile, this.currentEditor);
            this.annotations[this.currentFile] = undefined;
            this.gitcCommands.send("git diff -U0 " + this.currentFile, this.addChanges.bind(this));
            this.gitcCommands.send("git diff --cached -U0 " + this.currentFile, this.addChanges.bind(this));
        }