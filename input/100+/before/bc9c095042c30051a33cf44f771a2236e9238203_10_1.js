function(data, callback){
            deletedata = $.extend(true, {}, data);
            addBinding(callback);
            currentTemplate = sakai.api.Groups.getTemplate(deletedata["sakai:category"], deletedata["sakai:templateid"]);
            $deletegroup_category.html(sakai.api.i18n.getValueForKey(currentTemplate.title));
            $deletegroup_title.html(sakai.api.Util.Security.safeOutput(data["sakai:group-title"]));
            sakai.api.Util.Modal.open($deletegroup_dialog);
        }