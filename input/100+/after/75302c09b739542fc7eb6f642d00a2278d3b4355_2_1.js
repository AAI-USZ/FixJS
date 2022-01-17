function(){
      var $icon = $(this);
      var $entity = $icon.parents('.entity-instance:first');
      var entityId = $entity.attr('data-id');

      $icon.showqtip({
        content: {
          title: 'Specify entity',
          text: function(){

            // build the html
            var inputId = entityId + '-name-input';
            var $div = $('<div></div>');
            var $input = $('<input id="' + inputId + '" type="text"></input>');
            $div.append( $input );

            // now add the edit logic
            $input.val( doc.entityName(entityId) ); // set initial name

            $input.on('keyup change paste', _.debounce(function(){
              var name = $input.val();
              doc.entityName( entityId, name );
            }, 100));

            $input.on('keydown', function(e){
              if( e.which === 13 ){
                $div.trigger('hideqtip');
              }
            });

            setTimeout(function(){
              $input.focus();
            }, 100);
            return $div;
          }
        }
      });
    }