function(annotation) {
			if (annotation.type == "added") {
                //this.currentEditor.renderer.addGutterDecoration(annotation.row, "gitc-added");
				annotation.markerId = this.currentEditor.getSession().addMarker(new Range(annotation.row, 0, annotation.row, 1), "gitc-added-" + annotation.status, "background", true);
            } else if (annotation.type == "changed") {
                //this.currentEditor.renderer.addGutterDecoration(annotation.row, "gitc-changed");
				annotation.markerId = this.currentEditor.getSession().addMarker(new Range(annotation.row, 0, annotation.row, 1), "gitc-changed-" + annotation.status, "background", true);
            } else if (annotation.type == "deleted") {
    			annotation.markerId = this.currentEditor.getSession().addMarker(new Range(annotation.row, 0, annotation.row, 1), "gitc-removed-" + annotation.status, "background", true);
            };
        }