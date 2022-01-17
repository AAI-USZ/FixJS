function toggle(element){
      var checked = $(element).parent().parent().prev().is(':checked');

      // if it's set to on
      if(checked){

        $(element).animate({marginLeft: '0px'}, 100,

        // callback function
        function(){
          showUncheckedState($(element));

          if (typeof $.fn.publish != 'undefined')
            $.publish('toggle.' + $(element).parent().parent().prev().attr('id') + '.unchecked', []);

          settings.off_callback();
        });

      } else {
        $(element).animate({marginLeft: '15px'}, 100,

        // callback function
        function(){
          showCheckedState($(element));

          if (typeof $.fn.publish != 'undefined')
          $.publish('toggle.' + $(element).parent().parent().prev().attr('id') + '.checked', []);

          settings.on_callback();
        });
      }

    }