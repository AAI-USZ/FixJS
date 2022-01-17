function (event, data) {
                    var entry = data.rslt.obj.data("entry");
                    if (entry.isFile) {
                        var openResult = FileViewController.openAndSelectDocument(entry.fullPath, FileViewController.PROJECT_MANAGER);
                    
                        openResult.done(function () {
                            // update when tree display state changes
                            _redraw(true);
                            _lastSelected = data.rslt.obj;
                        }).fail(function () {
                            if (_lastSelected) {
                                // revert this new selection and restore previous selection
                                _forceSelection(data.rslt.obj, _lastSelected);
                            } else {
                                _projectTree.jstree("deselect_all");
                                _lastSelected = null;
                            }
                        });
                    } else {
                        _redraw(true);
                    }
                }