function(obj) {
                            if (obj.err) {
                            } else {
                                //TODO: update status
                                li.hide();
                                activeUnselectStudent.unselectTr.insertAfter(lastUnselectTr);
                                lastUnselectTr = activeUnselectStudent.unselectTr;
                                activeUnselectStudent = null;
                                lastUnselectTr.hide();
                            }
                        }