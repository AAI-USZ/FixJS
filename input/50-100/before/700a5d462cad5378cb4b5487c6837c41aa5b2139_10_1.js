function() {
                                for (var c = 0; c < sakai.config.worldTemplates.length; c++) {
                                    if (sakai.config.worldTemplates[c].id === group["sakai:category"]){
                                        groupType = sakai.api.i18n.getValueForKey(sakai.config.worldTemplates[c].title);
                                    }
                                }
                            }