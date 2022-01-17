function(e) {
            if (e.editor.path !== "ext/code/code") {
                return;
            }
            this.gitcCommands.send("git diff -U0 " + this.currentFile, this.addChanges.bind(this));
            this.gitcCommands.send("git diff --cached -U0 " + this.currentFile, this.addChanges.bind(this));
        }