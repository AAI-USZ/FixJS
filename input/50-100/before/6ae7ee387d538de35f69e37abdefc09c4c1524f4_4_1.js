function() {
            isEditingNewElement = false;
            // Remove the widget from the settings overlay
            $('#contentauthoring_widget_content').html('');
            var $parent = $('.contentauthoring_cell_element #' + currentlyEditing, $rootel).parent();
            $('.contentauthoring_cell_element #' + currentlyEditing, $rootel).remove();
            // Construct the widget
            $parent.append('<div id="widget_' + $parent.attr('data-element-type') + '_' + currentlyEditing + '" class="widget_inline"></div>');
            sakai.api.Widgets.widgetLoader.insertWidgets('contentauthoring_widget', false, storePath);
            $('#contentauthoring_widget_settings').jqmHide();
            updateAllColumnHandles();
        }