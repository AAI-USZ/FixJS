function(){
        var validateOpts = {
            'methods': {
                'uniquegroupname': {
                    'method': function(value, element) {
                        return !sakai.api.Groups.checkIfGroupExists(value);
                    },
                    'text': sakai.api.i18n.getValueForKey('THIS_GROUP_HAS_BEEN_TAKEN', 'newcreategroup')
                }
            },
            rules: {
                newcreategroup_title: {
                    maxlength: 255
                },
                newcreategroup_suggested_url: {
                    maxlength: 255            
                }
            },
            submitHandler: function(form){
                $newcreategroupContainer.find("select, input, textarea:not([class*='as-input']), button").attr("disabled", "disabled");
                doCreateSimpleGroup();
            }
        };
        // Initialize the validate plug-in
        sakai.api.Util.Forms.validate($newcreategroupGroupForm, validateOpts, true);
        sakai.api.Util.AutoSuggest.setupTagAndCategoryAutosuggest($newcreategroupGroupTags, null, $(".list_categories", $rootel));
        $newcreategroupGroupTitle.bind("keyup", function(){
            var suggestedURL = sakai.api.Util.makeSafeURL($(this).val().toLowerCase(), "-");
            $newcreategroupSuggestedURL.val(suggestedURL);
            $newcreategroupSuggestedURLBase.attr("title", window.location.protocol + "//" + window.location.host + "/~" + suggestedURL);
            renderShareMessage();
        });

        $newcreategroupSuggestedURL.bind("blur", function(){
            var suggestedURL = sakai.api.Util.makeSafeURL($(this).val(), "-");
            $newcreategroupSuggestedURL.val(suggestedURL);
            renderShareMessage();
        });

        $newcreategroupAddPeople.live("click", function(){
            $(window).trigger("init.addpeople.sakai", [tuid, false]);
        });
    }