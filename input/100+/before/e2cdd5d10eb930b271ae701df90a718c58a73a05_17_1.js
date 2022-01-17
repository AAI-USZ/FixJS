function(){
            if (!$("#contentpermissions_members_autosuggest_text").is(":visible")) {
                $("#contentpermissions_members_autosuggest_text").html(sakai.api.Util.TemplateRenderer(contentpermissionsShareMessageTemplate, {
                    "filename": sakai_global.content_profile.content_data.data["sakai:pooled-content-file-name"],
                    "path": window.location,
                    "user": sakai.api.User.getDisplayName(sakai.data.me.profile)
                }));
                $('.contentpermissions_buttons').hide();
                $("#contentpermissions_members_autosuggest_container").show();
                $("#contentpermissions_members_list").hide();
                $("#contentpermissions_members_autosuggest_permissions").removeAttr("disabled");
            }
        }