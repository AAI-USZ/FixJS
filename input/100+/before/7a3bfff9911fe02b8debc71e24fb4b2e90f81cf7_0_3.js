function(sectionItem, sectionIndex, sectionList) {

                        // section_index is used to derive the class code
                        var classModel = Ext.create('LU.model.Class', Ext.apply(classItem, {section_index: sectionIndex}));

                        classModel.set('id', parseInt('' + classItem.id + sectionItem.id));
                        classModel.set('section_id', sectionItem.id);
                        classModel.set('section_capacity', sectionItem.capacity);
                        classModel.set('section_num_students', sectionItem.num_students);
                        classModel.set('section_duration', sectionItem.duration);
                        classStore.add(classModel);

                        // maps the meeting times to each record
                        var timings = sectionItem.get_meeting_times;
                        Ext.Array.each(timings, function(timeItem, timeIndex, timeList) {

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
                        });
                    }