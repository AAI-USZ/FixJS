function(row) {
                    var annotation = annotations.staged[row];
                    editor.getSession().removeMarker(annotation.markerId);
                }