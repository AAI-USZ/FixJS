function(){
            var savejson = {
                ':operation': 'basiclti',
                ':contentType': 'json',
                ':replace': true,
                ':replaceProperties': true,
                '_charset_': 'utf-8'
            };

            var dbg = $(basicltiSettingsDebug + ':checked', $rootel).val();
            var savejson_content = {
                'sling:resourceType': 'sakai/basiclti',
                'ltiurl': $(basicltiSettingsLtiUrl, $rootel).val() || '',
                'ltikey': $(basicltiSettingsLtiKey, $rootel).val() || '',
                'ltisecret': $(basicltiSettingsLtiSecret, $rootel).val() || '',
                'debug@TypeHint': 'Boolean',
                'debug': dbg !== undefined  && dbg !== null,
                'release_names@TypeHint': 'Boolean',
                'release_names': $('#basiclti_settings_release_names:checked', $rootel).val() !== null,
                'release_principal_name@TypeHint': 'Boolean',
                'release_principal_name': $('#basiclti_settings_release_principal_name:checked', $rootel).val() !== null,
                'release_email@TypeHint': 'Boolean',
                'release_email': $('#basiclti_settings_release_email:checked', $rootel).val() !== null,
                'launchDataUrl': '', // does not need to be persisted
                'tuidFrame': '', // does not need to be persisted
                'defined': '' // what the heck is this? Where does it come from?
            };
            savejson_content = $.extend({}, json, savejson_content);
            json = savejson_content;
            savejson[':content'] = JSON.stringify(savejson_content);
            saveContentAjax(savejson);
        }