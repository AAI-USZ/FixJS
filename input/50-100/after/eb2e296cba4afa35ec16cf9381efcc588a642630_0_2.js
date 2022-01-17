function(annotation, editor) {
            if (annotation.type == "deleted") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-removed");
            } else if (annotation.type == "added") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-added");
            } else if (annotation.type == "changed") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-changed");
            }
        }