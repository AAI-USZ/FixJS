function(){
      var $t = $(this), $btn, keyPressed,
      defaultColor = $t.css("color");

      function displayPrompt(){
        $t.css("color","grey").data('hasPrompt', true).val(options.prompt);
      }

      function clearField(){
        $t.css("color", defaultColor).data('hasPrompt', false).val('');
      }

      function checkState(){
        if($t.val() && $t.val() !== options.prompt){
          $t.css("color", defaultColor);
          $btn.show();
        } else {
          displayPrompt();
          $btn.hide();
          keyPressed = false;
        }
      }

      if($t.is("input")){
        $btn = $("<span>x</span>").click(function(){
          clearField();
          $t.focus();
          $btn.hide();
          keyPressed = false;
        });
        $p = $t.wrap("<span class=\"clearButton\">")
          .focus(function(){
            if(!keyPressed && $t.val() === options.prompt){
              clearField();
            }
            $t.parent().addClass('focus');
          })
          .focusout(function(){
            if(!keyPressed && !$t.val()){
              displayPrompt();
            }
            $t.parent().removeClass('focus');
          })
          .keydown(function(e){
            if(!isNeutralKey(e.which) &&
               // User may try to delete the prompt. Help him with that
               (!keyPressed || isRemovalKey(e.which)) &&
               $t.val() === options.prompt){
              clearField();
            }
          })
          .keyup(function(e){
            if(!keyPressed && (
              !isNeutralKey(e.which) &&
                // Prevent reapearing of the prompt after it has just
                // been deleted
                !isRemovalKey(e.which)
            )){
              keyPressed = true;
              checkState();
            }
          })
          .bind("blur change",function(){
            checkState();
          })
          .submit(function(){
            if($t.val() === options.prompt){
              clearField();
            }
          })
          .parent().append($btn);
        $p.addClass("ui-corner-all");
      }
    }