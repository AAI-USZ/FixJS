function() {
            var gutterCells = document.getElementsByClassName('ace_gutter-cell');
            var firstLineIndex = this.currentEditor.renderer.getFirstVisibleRow();
            for (var i = 0; i < gutterCells.length; i++) {
                var annotation = this.annotations[this.currentFile][(firstLineIndex+i).toString()];
                if (!annotation)
                    continue;
                    
                var cell = gutterCells[i];
                
                //add deleted line marker, if not at start of visible gutter area (otherwise, marker would not be visible anyway)
                if (annotation.type == "deleted" && i > 0) {
                    var marker = document.createElement('div');
                    marker.classList.add("ace_gutter-cell");
                    marker.classList.add("gitc-removed");
                    marker.setAttribute("style", "height: 2px");
                    
                    cell.setAttribute("style", "height: 15px");
                    cell.previousSibling.setAttribute("style", "height: 15px");
                    cell.parentNode.insertBefore(marker, cell);
                    cell = marker;
                }
                
                //add tooltip
                if (annotation.tooltip) {
                    cell.appendChild(annotation.tooltip);
                }
            }
        }