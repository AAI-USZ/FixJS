function(id, obj, args) {
                        if (obj) {
                            scope.refresh(obj.filepath);
                            var win = window.open(obj.fileurl, 'fm-download-folder');
                            if (!win) {
                                alert(M.str.repository.popupblockeddownload);
                            }
                        } else {
                            alert(M.str.repository.draftareanofiles);
                        }
                    }