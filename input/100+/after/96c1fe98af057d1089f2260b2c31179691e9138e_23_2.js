function createNewItem(baseDir, initialName, skipRename) {
        var node                = null,
            selection           = _projectTree.jstree("get_selected"),
            selectionEntry      = null,
            position            = "inside",
            escapeKeyPressed    = false,
            result              = new $.Deferred(),
            wasNodeOpen         = true;

        // get the FileEntry or DirectoryEntry
        if (selection) {
            selectionEntry = selection.data("entry");
        }

        // move selection to parent DirectoryEntry
        if (selectionEntry) {
            if (selectionEntry.isFile) {
                position = "after";
                
                var parent = $.jstree._reference(_projectTree)._get_parent(selection);
                
                if (typeof (parent.data) === "function") {
                    // get Entry from tree node
                    // note that the jstree root will return undefined
                    selectionEntry = parent.data("entry");
                } else {
                    // reset here. will be replaced with project root.
                    selectionEntry = null;
                }
            } else if (selectionEntry.isDirectory) {
                wasNodeOpen = selection.hasClass("jstree-open");
            }
        }

        // use the project root DirectoryEntry
        if (!selectionEntry) {
            selectionEntry = getProjectRoot();
        }

        _projectTree.on("create.jstree", function (event, data) {
            $(event.target).off("create.jstree");

            function errorCleanup() {
                // TODO (issue #115): If an error occurred, we should allow the user to fix the filename.
                // For now we just remove the node so you have to start again.
                var parent = data.inst._get_parent(data.rslt.obj);
                
                _projectTree.jstree("remove", data.rslt.obj);
                
                // Restore tree node state and styling when errors occur.
                // parent returns -1 when at the root
                if (parent && (parent !== -1)) {
                    var methodName = (wasNodeOpen) ? "open_node" : "close_node";
                    var classToAdd = (wasNodeOpen) ? "jstree-open" : "jstree-closed";
                    
                    // This is a workaround for issue #149 where jstree would show this node as a leaf.
                    _projectTree.jstree(methodName, parent);
                    parent.removeClass("jstree-leaf jstree-closed jstree-open")
                          .addClass(classToAdd);
                }
                
                result.reject();
            }

            if (!escapeKeyPressed) {
                // Validate file name
                // TODO (issue #270): There are some filenames like COM1, LPT3, etc. that are not valid on Windows.
                // We may want to add checks for those here.
                // See http://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx
                if (data.rslt.name.search(/[\/?*:;\{\}<>\\|]+/) !== -1) {
                    Dialogs.showModalDialog(
                        Dialogs.DIALOG_ID_ERROR,
                        Strings.INVALID_FILENAME_TITLE,
                        Strings.INVALID_FILENAME_MESSAGE
                    );

                    errorCleanup();
                    return;
                }

                // Use getFile() to create the new file
                selectionEntry.getFile(
                    data.rslt.name,
                    {create: true, exclusive: true},
                    function (entry) {
                        data.rslt.obj.data("entry", entry);
                        _projectTree.jstree("select_node", data.rslt.obj, true);
                        result.resolve(entry);
                    },
                    function (error) {
                        if ((error.code === FileError.PATH_EXISTS_ERR)
                                || (error.code === FileError.TYPE_MISMATCH_ERR)) {
                            Dialogs.showModalDialog(
                                Dialogs.DIALOG_ID_ERROR,
                                Strings.INVALID_FILENAME_TITLE,
                                Strings.format(Strings.FILE_ALREADY_EXISTS,
                                    StringUtils.htmlEscape(data.rslt.name))
                            );
                        } else {
                            var errString = error.code === FileError.NO_MODIFICATION_ALLOWED_ERR ?
                                             Strings.NO_MODIFICATION_ALLOWED_ERR :
                                             Strings.format(String.GENERIC_ERROR, error.code);

                            var errMsg = Strings.format(Strings.ERROR_CREATING_FILE,
                                            StringUtils.htmlEscape(data.rslt.name),
                                            errString);
                          
                            Dialogs.showModalDialog(
                                Dialogs.DIALOG_ID_ERROR,
                                Strings.ERROR_CREATING_FILE_TITLE,
                                errMsg
                            );
                        }

                        errorCleanup();
                    }
                );
            } else { //escapeKeyPressed
                errorCleanup();
            }
        });
        
        // TODO (issue #115): Need API to get tree node for baseDir.
        // In the meantime, pass null for node so new item is placed
        // relative to the selection
        node = selection;
        
        // Open the node before creating the new child
        _projectTree.jstree("open_node", node);

        // Create the node and open the editor
        _projectTree.jstree("create", node, position, {data: initialName}, null, skipRename);

        if (!skipRename) {
            var $renameInput = _projectTree.find(".jstree-rename-input"),
                projectTreeOffset = _projectTree.offset(),
                projectTreeScroller = _projectTree.get(0),
                renameInput = $renameInput.get(0),
                renameInputOffset = $renameInput.offset();

            $renameInput.on("keydown", function (event) {
                // Listen for escape key on keydown, so we can remove the node in the create.jstree handler above
                if (event.keyCode === 27) {
                    escapeKeyPressed = true;
                }
            });
            
            // make sure edit box is visible within the jstree, only scroll vertically when necessary
            if (renameInputOffset.top + $renameInput.height() >= (projectTreeOffset.top + _projectTree.height())) {
                // below viewport
                renameInput.scrollIntoView(false);
            } else if (renameInputOffset.top <= projectTreeOffset.top) {
                // above viewport
                renameInput.scrollIntoView(true);
            }
            
            // left-align renameInput
            if (renameInputOffset.left < 0) {
                _projectTree.scrollLeft(_projectTree.scrollLeft() + renameInputOffset.left);
            } else if (renameInputOffset.left + $renameInput.width() >= projectTreeOffset.left + _projectTree.width()) {
                _projectTree.scrollLeft(renameInputOffset.left - projectTreeOffset.left);
            }
        }
        
        return result.promise();
    }