function(){
                console.debug("XFProcessor._handleBetterFormStateChanged: contextInfo: ", contextInfo);
                var parentId = contextInfo.parentId;

                // if contextInfo.parentId is present dojo must publish to this id instead of targetid (e.g. used for value changes of labels)
                if(parentId) {
                    connect.publish("bf-state-change-"+ parentId, contextInfo);

                }
                else {
                    connect.publish("bf-state-change-"+ contextInfo.targetId,contextInfo);
                }
            }