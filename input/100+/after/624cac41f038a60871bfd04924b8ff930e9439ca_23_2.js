function(e, data, library) {
            if ($('#embedcontent_settings', $rootel).is(':visible') && 
                (!sakai_global.group || (sakai_global.group && sakai_global.group.groupId))) {
                var obj = {};
                for (var i = 0; i < data.length; i++){
                    obj[data[i]._path] = data[i];
                }
                addChoicesFromPickeradvanced(obj);
            }
        }