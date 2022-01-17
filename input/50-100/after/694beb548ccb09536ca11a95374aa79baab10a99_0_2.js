function(id, obj, args) {
                        if (obj) {
                            scope.refresh(obj.filepath);
                            var win = window.open(obj.fileurl, 'fm-download-folder');
                            if (!win) {
                                scope.print_msg(M.str.repository.popupblockeddownload, 'error');
                            }
                        } else {
                            scope.print_msg(M.str.repository.draftareanofiles, 'error');
                        }
                    }