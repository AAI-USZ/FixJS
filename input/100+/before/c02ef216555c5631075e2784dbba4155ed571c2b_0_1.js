function inheritable_flag(field, $e) {
            var name = 'can_edit-' + field,
                $label = $('<label for="' + name + '">' + S3.i18n.cap_editable + '</label>'),
                $checkbox = $('<input type="checkbox" name="' + name +'"/>');

            $checkbox.click(function () {
                var settings = get_settings();
                settings.editable = settings.editable || {};
                settings.editable[field] = $(this).is(':checked');
                set_settings(settings);
            });

            var settings = get_settings();
            if (settings.editable && settings.editable[field]) {
                $checkbox.attr('checked', 'checked');
            }

            $e.append($label);
            $e.append($checkbox);
        }