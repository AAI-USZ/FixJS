function(){
        currentTemplate = $.extend(true, {}, sakai.api.Groups.getTemplate(widgetData.category, widgetData.id));
        currentTemplate.roles = sakai.api.Groups.getRoles(currentTemplate, true);
        getTranslatedRoles();
        templatePath = "/var/templates/worlds/" + widgetData.category + "/" + widgetData.id;
        $(".newcreategroup_template_name", $rootel).text(sakai.api.i18n.getValueForKey(currentTemplate.title));
        if(widgetData.singleTemplate === true){
            $newcreategroupCancelCreateButton.hide();
        }
        $newcreategroupSuggestedURLBase.text(sakai.api.Util.applyThreeDots(window.location.protocol + "//" + window.location.host + "/~", 105, {"middledots": true}, null, true));
        $newcreategroupSuggestedURLBase.attr("title", window.location.protocol + "//" + window.location.host + "/~");

        var category = false;
        for (var i = 0; i < sakai.config.worldTemplates.length; i++){
            if (sakai.config.worldTemplates[i].id === widgetData.category){
                category = sakai.config.worldTemplates[i];
                break;
            }
        }
        var defaultaccess =  currentTemplate.defaultaccess || sakai.config.Permissions.Groups.defaultaccess;
        var defaultjoin = currentTemplate.defaultjoin || sakai.config.Permissions.Groups.defaultjoin;

        $("#newcreategroup_can_be_found_in option[value='" + defaultaccess + "']", $rootel).attr("selected", "selected");
        $("#newcreategroup_membership option[value='" + defaultjoin + "']", $rootel).attr("selected", "selected");

        $newcreategroupContainer.show();
        addBinding();
    }