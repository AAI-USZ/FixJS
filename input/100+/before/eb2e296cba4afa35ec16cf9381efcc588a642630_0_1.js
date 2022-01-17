function() {
            var lines = this.currentEditor.getSession().getLength();
            for (var i = 1; i <= lines; i++) {
                var annotation = this.annotations[this.currentFile][i.toString()];
                if (annotation) {
                    //create tooltip for this annotation
                    var p = document.createElement('p');
                    p.innerText = annotation.text;
                    
                    annotation.tooltip = document.createElement('div');
                    annotation.tooltip.className = 'gitc-tooltip';
                    annotation.tooltip.appendChild(p);
                    
                    var commitLink = document.createElement('a');
                    commitLink.innerText = "Commit";
                    commitLink.setAttribute("onclick", function(e) {
                        console.log('Commit all changes belonging to this chunk.');
                    });
                    
                    var revertLink = document.createElement('a'); //button to revert
                    revertLink.innerText = "Revert";
                    revertLink.setAttribute("onclick", function(e) {
                        console.log('Revert all changes belonging to this chunk.');
                    });
                    
                    var commitRevertP = document.createElement('p'); //button to commit
                    commitRevertP.className = "gitc-commit-revert";
                    commitRevertP.appendChild(commitLink);
                    commitRevertP.appendChild(revertLink);
                    annotation.tooltip.appendChild(commitRevertP);
                }
            }
        }