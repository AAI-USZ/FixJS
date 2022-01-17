function(){
            // this method append http:// or ftp:// or https://
            $.validator.addMethod("appendhttp", function(value, element) {
                if(value.substring(0,7) !== "http://" &&
                value.substring(0,6) !== "ftp://" &&
                value.substring(0,8) !== "https://" &&
                $.trim(value) !== "") {
                    $(element).val("http://" + value);
                    json.url = "http://" + value;
                } else {
                  json.url = value;
                }
                return true;
            }, "No error message, this is just an appender");

            // FORM VALIDATION

            var validateOpts = {
                onclick: true,
                onkeyup: true,
                onfocusout: true,
                messages: {
                    required: $(remotecontentSettingsUrlBlank).html(),
                    url: $(remotecontentSettingsUrlError).html()
                },
                success: function() {
                    renderIframeSettings(true);
                },
                invalidCallback: function() {
                    renderIframeSettings(false);
                }
            };

            // Initialize the validate plug-in
            sakai.api.Util.Forms.validate($("#remotecontent_form", rootel), validateOpts, true);

            // Change the iframe width
            $(remotecontentSettingsWidth, rootel).change(function(){
                var widthValue = $(remotecontentSettingsWidth, rootel).val();

                if (isDecimal(widthValue)) {
                    json.width = widthValue;
                }
                renderIframeSettings(false);
            });

            // Change the iframe height
            $(remotecontentSettingsHeight, rootel).change(function(){
                var heightValue = $(remotecontentSettingsHeight, rootel).val();

                if (isDecimal(heightValue)) {
                    json.height = heightValue;
                }
                renderIframeSettings(false);
            });

            // Change the border width
            $(remotecontentSettingsBorders, rootel).on('click', function() {
                if ($(remotecontentSettingsBorders, rootel).is(':checked')) {
                    json.border_size = 2;
                } else {
                    json.border_size = 0;
                }
                renderIframeSettings(false);
            });

            // Toggle the advanced view
            $(remotecontentSettingsAdvancedToggleSettings, rootel).click(function(){
                $("#remotecontent_settings_advanced", rootel).toggle();
                isAdvancedSettingsVisible = !isAdvancedSettingsVisible;
                changeAdvancedSettingsArrow();
            });

            // Reset size to default values
            $(remotecontentSettingsResetSize, rootel).click(function(){
                $(remotecontentSettingsWidth, rootel).val(defaultWidth);
                $(remotecontentSettingsHeight, rootel).val(defaultHeight);
                $(remotecontentSettingsWidth, rootel).change();
                $(remotecontentSettingsHeight, rootel).change();
                $(remotecontentSettingsWidthUnitPercent, rootel).click();
            });

            // When you click on one of the width units (px or percentage)
            $(remotecontentSettingsWidthUnitClass, rootel).on('change', function() {
                var widthUnitValue = $(this).val();
                if (widthUnitValue === "px") {
                    json.width_unit = widthUnitValue;
                }
                else {
                    json.width_unit = "%";
                }
                renderIframeSettings(false);
            });

            // When you push the save button..
            $(remotecontentSettingsInsert, rootel).click(function(){
                saveRemoteContent();
            });

            // Cancel it
            $(remotecontentSettingsCancel, rootel).click(function(){
                sakai.api.Widgets.Container.informCancel(tuid, "remotecontent");
            });

            addColorBinding();
        }