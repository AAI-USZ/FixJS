function() {
    
    function GitEditorVis(gitccommands) {
        this.gitcCommands = gitccommands;
        this.currentEditor = undefined;
        this.currentFile = undefined;
        this.all_changes = {};
        this.annotations = {};
    }

    GitEditorVis.prototype = {

        onTabSwitch : function(e){
            if (e.nextPage.$editor.path !== "ext/code/code") {
                //only code editors are of our concern
                return;
            }
            this.currentFile = this.getFilePath(e.nextPage.id);
            this.currentEditor = e.nextPage.$editor.amlEditor.$editor;

            this.setGutterUpdateFunction(this.currentFile, this.currentEditor);
            if (e.currentTarget.$activepage) {
                var closed_file   = this.getFilePath(e.currentTarget.$activepage.id);
                var closed_editor = e.currentTarget.$activepage.$editor.amlEditor.$editor;
                this.undecorate(closed_file, closed_editor);
            }

            //show unstaged and staged changes
            this.gitcCommands.send("git diff " + this.currentFile, this.addChanges.bind(this));
            this.gitcCommands.send("git diff --cached " + this.currentFile, this.addChanges.bind(this));
            //maintain gutter tooltips
            this.currentEditor.renderer.scrollBar.addEventListener("scroll", this.onScroll.bind(this));
        },

        onScroll : function(e) {
            if (this.annotations[this.currentFile]) 
                this.addMissingDecoration();
        },

        getFilePath : function(filePath) {
            if (typeof filePath === "undefined")
                filePath = tabEditors.getPage().$model.data.getAttribute("path");
            if (filePath.indexOf("/workspace/") === 0)
                filePath = filePath.substr(11);

            return filePath;
        },

        addChanges : function(output, parser) {
            var changes = parser.parseDiff(output.data, output.stream);
            var filename = output.args[output.args.length-1];
            var kind = output.args.contains("--cached")? "staged" : "unstaged";

            //cache changes
            if (!this.all_changes[filename]) {
                this.all_changes[filename] = {};
            }
            this.all_changes[filename][kind] = changes;
            
            if (changes.length !== 0) {
                //create annotations for unstaged changes of the current file
                this.annotateChunks(changes[0].chunks, kind, filename);
            }
            
            this.decorate(filename);
        },

        markGutterLine : function(annotation) {
            var session = this.currentEditor.getSession();
            
            if (annotation.type == "added") {
                this.currentEditor.renderer.addGutterDecoration(annotation.row, "gitc-added");
            } else if (annotation.type == "changed") {
                this.currentEditor.renderer.addGutterDecoration(annotation.row, "gitc-changed");
            };
        },
        
        createAnnotation : function(line, type, msg, status) {
          var annotation = {
            row: line,
            type: type,
            text: msg,
            status: status,
            tooltip: undefined
          };
          
          return annotation;
        },
        
        createTooltips : function() {
            if (!this.annotations[this.currentFile]) {
                return;
            }

            var file_annotations = this.annotations[this.currentFile]
            var lines = this.currentEditor.getSession().getLength();
            for (var i = 1; i <= lines; i++) {
                var annotation = file_annotations[i.toString()];
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
        },
        
        undecorate : function(closedFile, editor) {
            if (this.annotations[closedFile]) {
                var annotations = this.annotations[closedFile];
                for (var annotation in annotations) {
                    this.undecorateGutterLine(annotations[annotation], editor);
                }
            }
        },
        undecorateGutterLine : function(annotation, editor) {
            if (annotation.type == "deleted") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-removed");
            } else if (annotation.type == "added") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-added");
            } else if (annotation.type == "changed") {
                editor.renderer.removeGutterDecoration(annotation.row, "gitc-changed");
            }
        },

        decorate : function(filename) {
            if (filename !== this.currentFile) {
                return;
            }
            this.createTooltips();
            
            if (this.all_changes[this.currentFile].unstaged && this.all_changes[this.currentFile].staged) {
                //add gutter decoration for all annotations
                var annotations = this.annotations[this.currentFile];
                for (var i in annotations) {
                    this.markGutterLine(annotations[i]);
                }
            }
        },

        annotateChunks : function(chunks, status, filename) {
            if (!this.annotations[filename]) {
                this.annotations[filename] = {};
                
                var annotations = this.annotations[filename];
                for (var i = 0; i < chunks.length; i++) {
                    var chunk = chunks[i];
                    for (var j = 0; j < chunk.lines.length; j++) {
                        var line = chunk.lines[j];
                        var annotation = this.createAnnotation(line.number_new-1, line.status, line.content, status);
                        if (this.isChangeAnnotation(annotation, filename)) {
                            annotation.type = "changed";
                        }
                        annotations[annotation.row.toString()] = annotation;
                    }
                }
            }
        },

        isChangeAnnotation : function(annotation, filename) {
            var key = annotation.row.toString();
            var other = this.annotations[filename][key];
            return other && 
                (annotation.type == "deleted" && other.type == "added" || 
                annotation.type == "added" && other.type == "deleted");
        },

        addMissingDecoration : function() {
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
        },
        
        updateLineNumbers : function(lines) {
            var firstLineIndex = this.currentEditor.renderer.getFirstVisibleRow();
            var lastLineIndex  = this.currentEditor.renderer.getLastVisibleRow();
            
            var fun = function() {
                
                editor.renderer.$gutterLayer.update({lines: lines});
            };
            setTimeout(fun, 1000);
        },

        setGutterUpdateFunction : function(opened_file, editor) {
            if (opened_file.indexOf("diff for ") !== 0) {
                //reset update function of gutter layer to original funtion
                var gutter = editor.renderer.$gutterLayer;
                if (gutter.$originalUpdate) {
                    gutter.update = gutter.$originalUpdate;
                    gutter.$originalUpdate = undefined;
                }
            } else { //opened_file.indexOf("diff for ") === 0
                //use own update function for gutter layer to set line numbers
                var dom = require("ace/lib/dom");
                var oop = require("ace/lib/oop");
                var EventEmitter = require("ace/lib/event_emitter").EventEmitter;

                var update = function(config) {
                    if (config.lines) {
                        this.lines = config.lines;
                    } else {
                        this.$config = config;
                        config.lines = this.lines;
                    }

                    var emptyAnno = {className: "", text: []};
                    var html = [];
                    var fold = this.session.getNextFoldLine(i);
                    var foldStart = fold ? fold.start.row : Infinity;
                    var foldWidgets = this.$showFoldWidgets && this.session.foldWidgets;

                    for (var i = 0; i < config.lines.length; ++i) {
                        if(i > foldStart) {
                            i = fold.end.row + 1;
                            fold = this.session.getNextFoldLine(i, fold);
                            foldStart = fold ?fold.start.row :Infinity;
                        }

                        var annotation = this.$annotations[i] || emptyAnno;
                        var lineNumber = config.lines[i];

                        html.push("<div class='ace_gutter-cell",
                            this.$decorations[i] || "",
                            this.$breakpoints[i] ? " ace_breakpoint " : " ",
                            annotation.className,
                            "' title='", annotation.text.join("\n"),
                            "' style='height:", config.lineHeight, "px;'>", lineNumber);

                        if (foldWidgets) {
                            var c = foldWidgets[i];
                            // check if cached value is invalidated and we need to recompute
                            if (c == null)
                                c = foldWidgets[i] = this.session.getFoldWidget(i);
                            if (c)
                                html.push(
                                    "<span class='ace_fold-widget ", c,
                                    c == "start" && i == foldStart && i < fold.end.row ? " closed" : " open",
                                    "'></span>"
                                );
                        }

                        var wrappedRowLength = this.session.getRowLength(i) - 1;
                        while (wrappedRowLength--) {
                            html.push("</div><div class='ace_gutter-cell' style='height:", config.lineHeight, "px'>\xA6");
                        }

                        html.push("</div>");
                    }
                    this.element = dom.setInnerHtml(this.element, html.join(""));
                    this.element.style.height = config.minHeight + "px";
                    
                    var gutterWidth = this.element.offsetWidth;
                    if (gutterWidth !== this.gutterWidth) {
                        this.gutterWidth = gutterWidth;
                        this._emit("changeGutterWidth", gutterWidth);
                    }
                };

                editor.renderer.$gutterLayer.$originalUpdate = 
                         editor.renderer.$gutterLayer.update;
                editor.renderer.$gutterLayer.update = update;
            }
        }

    };

    return GitEditorVis;
}