function(annotation) {
            if (annotation.type == "deleted") {
                this.currentEditor.renderer.removeGutterDecoration(annotation.row, "gitc-removed");
            } else if (annotation.type == "added") {
                this.currentEditor.renderer.removeGutterDecoration(annotation.row, "gitc-added");
            } else if (annotation.type == "changed") {
                this.currentEditor.renderer.removeGutterDecoration(annotation.row, "gitc-changed");
            }
        }