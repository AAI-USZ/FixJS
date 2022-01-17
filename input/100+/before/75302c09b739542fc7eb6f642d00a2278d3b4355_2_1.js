function(){
      var $icon = $(this);
      var $entity = $icon.parents('.entity-instance:first');
      var id = $entity.attr('data-id');

      $icon.showqtip({
        content: {
          text: ui.editNameQtipContent(id) 
        }
      });
    }