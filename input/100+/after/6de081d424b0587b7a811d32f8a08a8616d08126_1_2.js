function() {
            $basicltiSettingsForm = $($basicltiSettingsForm.selector);
            // Change the url for the iFrame
            $(basicltiSettingsLtiUrl, $rootel).on('change', function(){
                var urlValue = $(this).val();
                if (urlValue !== '') {
                    // Check if someone already wrote http inside the url
                    if (!isUrl(urlValue)) {
                        urlValue = 'http://' + urlValue;
                    }
                    json.ltiurl = urlValue;
                    //renderIframeSettings(true); // LDS disabled preview
                }
            });

            // Change the iframe width
            $(basicltiSettingsWidth, $rootel).on('change', function(){
                var widthValue = $(basicltiSettingsWidth, $rootel).val();

                if (isDecimal(widthValue)) {
                    json.width = widthValue;
                }
                renderIframeSettings(false);
            });

            // Change the iframe height
            $(basicltiSettingsHeight, $rootel).on('change', function(){
                var heightValue = $(basicltiSettingsHeight, $rootel).val();
                if (isDecimal(heightValue)) {
                    json.frame_height = heightValue;
                }
                renderIframeSettings(false);
            });

            // Change the border width
            $(basicltiSettingsBorders, $rootel).on('change', function() {
                var borderValue = $(basicltiSettingsBorders, $rootel).val();
                if (isDecimal(borderValue)) {
                    json.border_size = borderValue;
                    renderIframeSettings(false);
                }
            });

            // Toggle the advanced view
            $(basicltiSettingsAdvancedToggleSettings, $rootel).on('click', function() {
                $('#basiclti_settings_advanced', $rootel).toggle();
                isAdvancedSettingsVisible = !isAdvancedSettingsVisible;
                changeAdvancedSettingsArrow();
            });

            // When you click on one of the width units (px or percentage)
            $(basicltiSettingsWidthUnitClass, $rootel).on('click', function() {
                var widthUnitValue = $(this).attr('id').split('_')[$(this).attr('id').split('_').length - 1];
                if (widthUnitValue === 'px') {
                    json.width_unit = widthUnitValue;
                } else {
                    json.width_unit = '%';
                }
                $(basicltiSettingsWidthUnitClass, $rootel).removeClass(basicltiSettingsWidthUnitSelectedClass);
                $(this).addClass(basicltiSettingsWidthUnitSelectedClass);
                renderIframeSettings(false);
            });

            // Add the validate handler
            validateForm();

            // Cancel the settings
            $(basicltiSettingsCancel, $rootel).on('click', function() {
                sakai.api.Widgets.Container.informCancel(tuid, 'basiclti');
            });

            $('.basiclti_settings_color', $rootel).on('click', function() {
                json.border_color = $(this).attr('id').split('_')[$(this).attr('id').split('_').length - 1];
                renderIframeSettings(false);
                renderColorContainer();
            });
        }