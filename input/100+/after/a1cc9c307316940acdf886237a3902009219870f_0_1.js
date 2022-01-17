function(filename) {
            if (filename !== this.currentFile) {
                return;
            }
            this.createTooltips();
            
            if (this.all_changes[this.currentFile].unstaged && this.all_changes[this.currentFile].staged && this.annotations[this.currentFile]) {
                //add gutter decoration for all annotations
                var stagedAnnotations = this.annotations[this.currentFile].staged;
                for (var i in stagedAnnotations) {
                    this.markGutterLine(stagedAnnotations[i]);
                }

				var unstagedAnnotations = this.annotations[this.currentFile].unstaged;
                for (var i in unstagedAnnotations) {
                    this.markGutterLine(unstagedAnnotations[i]);
                }
            }
        }