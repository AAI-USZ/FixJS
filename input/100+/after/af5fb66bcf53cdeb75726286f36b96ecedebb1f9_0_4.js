function () {

      if (action == 'initialize') {// initialize the UI element

        if ($(this).hasClass('simple')) return;

        // hide the checkbox
        $(this).css('display','none');

        // insert the new toggle markup
        if($(this).attr("checked") == "checked" || $(this).attr("checked") == true){
          $(this).after('<div class="toggleSwitch"><span class="leftLabel on">'+settings.on_label+'<\/span><div class="switchArea on" style="background-color: '+settings.on_bg_color+'"><span class="switchHandle left" style="margin-left: ' + settings.toggle_width + 'px;"><\/span><\/div><span class="rightLabel" style="color:#cccccc">'+settings.off_label+'<\/span><\/div>');
        }else{
          $(this).after('<div class="toggleSwitch"><span class="leftLabel" style="color:#cccccc;">'+settings.on_label+'<\/span><div class="switchArea" style="background-color: '+settings.off_bg_color+'"><span class="switchHandle right" style="margin-left:0px"><\/span><\/div><span class="rightLabel on">'+settings.off_label+'<\/span><\/div>');
        }

        // Bind the switchHandle click events to the internal toggle function
        $(this).next().find('div.switchArea').bind("click", function () {
          toggle($(this).find('.switchHandle'));
        })

      } else if (action == 'sync') {
        element = $(this).next().find('.switchHandle');

        if ($(this).is(':checked'))
          showCheckedState(element);
        else
          showUncheckedState(element);
      } else {
        console.log('unknown action for the checkToggle plugin')
      }

    }