function stopEditing() {
      	var toolbar = $('.editableToolbar');
        toolbar.children().hide().end()
          .find('.edit').show();
        var target = toolbar.get(0).target;
        if (!target) {
          return;
        }
        $(target).attr('contentEditable', false);
        postMessage("INACTIVE", target.entity.id);
      }