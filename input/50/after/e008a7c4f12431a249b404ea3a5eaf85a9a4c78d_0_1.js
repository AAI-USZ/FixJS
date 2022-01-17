function(obj) {
                            if (obj.err) {
                            } else {
                                //TODO: update status
                                li.hide();
                                stu.unselectTr.insertAfter(lastUnselectTr);
                                lastUnselectTr = stu.unselectTr;
                                activeUnselectStudent = null;
                                lastUnselectTr.hide();
                            }
                        }