function(closedFile, editor) {
            if (this.annotations[closedFile]) {
                var annotations = this.annotations[closedFile];
                for (var annotation in annotations) {
                    editor.getSession().removeMarker(annotation.markerId);
                }
            }
        }