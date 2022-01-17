function remove(array, e) {
                                    var index = $.inArray(e, array);
                                    if (index > -1) {
                                        array.splice(index, 1);
                                    }
                                }