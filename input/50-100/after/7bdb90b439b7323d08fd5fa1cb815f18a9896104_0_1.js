function(closedFile, editor) {
            if (this.annotations[closedFile]) {
                var annotations = this.annotations[closedFile];
                for (var annotation in annotations) {
                    this.currentEditor.getSession().removeMarker(annotation.markerId);
                }
            }
        }