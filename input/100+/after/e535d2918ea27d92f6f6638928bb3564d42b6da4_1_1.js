function(e){
            // only code editors are of our concern
            if (e.nextPage.$editor.path !== "ext/code/code") {
                return;
            }

            // update own state, adjust gutter to our needs
            this.currentFile = this.getFilePath(e.nextPage.id);
            this.currentEditor = e.nextPage.$editor.amlEditor.$editor;
            this.setGutterUpdateFunction(this.currentFile, this.currentEditor);

            if (e.nextPage.$doc.type === "diff") {
                //diff view is read only
                this.currentEditor.setReadOnly(true);
            } else {
                this.currentEditor.setReadOnly(false);
                // if there is no change information fetch it 
                if (!this.annotations[this.currentFile]) {
                    this.gitcCommands.send("git diff -U0 " + this.currentFile, this.addChanges.bind(this));
                    this.gitcCommands.send("git diff --cached -U0 " + this.currentFile, this.addChanges.bind(this));
                }
                //maintain gutter tooltips
                this.currentEditor.on("mousemove", this.onMouseMove.bind(this));
            }
        }