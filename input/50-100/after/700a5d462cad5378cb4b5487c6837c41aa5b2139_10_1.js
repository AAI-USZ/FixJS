function(templates) {
                                for (var c = 0; c < templates.length; c++) {
                                    if (templates[c].id === group["sakai:category"]){
                                        groupType = sakai.api.i18n.getValueForKey(templates[c].title);
                                    }
                                }
                            }