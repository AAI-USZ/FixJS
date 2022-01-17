function(e){
            var closed_file = e.currentTarget.$activepage? this.getFilePath(e.currentTarget.$activepage.id) : undefined;
            var opened_file = this.getFilePath(e.nextPage.id);
            this.currentFile = opened_file;

            if (e.nextPage.$editor.path !== "ext/code/code")
                return;

            this.currentEditor = e.nextPage.$editor.amlEditor.$editor;
            this.undecorate(closed_file);

            if (opened_file.indexOf("diff for ") !== 0) {
                var gutter = this.currentEditor.renderer.$gutterLayer;
                if (gutter.$originalUpdate) {
                    gutter.update = gutter.$originalUpdate;
                    gutter.$originalUpdate = undefined;
                }
            }
            
            //unstaged changes
            this.gitcCommands.send("git diff " + opened_file, this.addUnstagedChanges.bind(this));
            //staged changes
            this.gitcCommands.send("git diff --cached " + opened_file, this.addStagedChanges.bind(this));
            //maintain gutter tooltips
            this.currentEditor.renderer.scrollBar.addEventListener("scroll", this.onScroll.bind(this));
        }