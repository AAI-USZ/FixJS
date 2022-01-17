function( data ) {
            if ( type == 'choice' || type == 'list_item_setting' ) {
              OT_UI.init_remove_active(list,'child-add');
              OT_UI.init_hide_body(list,'child-add');
            } else {
              OT_UI.init_remove_active();
              OT_UI.init_hide_body();
            }
            list.append('<li class="ui-state-default ' + list_class + '">' + data.responseText + '</li>');
            list.children().last().find('.option-tree-setting-edit').toggleClass('active');
            list.children().last().find('.option-tree-setting-body').toggle();
            list.children().last().find('.option-tree-setting-title').focus();
            if ( type != 'contextual_help' ) {
              OT_UI.update_ids(list);
            }
            self.processing = false;
          }