function(timeItem, timeIndex, timeList) {

                            // note: currently we only use the first meeting time to perform sorting
                            if (timeIndex == 0) {
                                classModel.set('section_short_description', timeItem.short_description);
                                classModel.set('section_start_time', timeItem.start);
                                classModel.set('section_end_time', timeItem.end);
                            }
                            var timeModel = Ext.create('LU.model.Timing', timeItem);
                            timeModel.set('id', parseInt('' + classModel.get('id') + timeItem.id));
                            timeModel.setClass(classModel.get('id'));
                            timeStore.add(timeModel);

                            if (Ext.Array.contains(sectionIds, classModel.get('section_id'))) {
                                registeredClassStore.add(classModel);
                                registeredTimeStore.add(timeModel);
                            }
                        }