function(buttonContainer, buttons) {
        var leftButtonContainer_layout = new unify.ui.layout.HBox();
        leftButtonContainer_layout.setAlignX("left");
        leftButtonContainer_layout.setSpacing(10);
        var leftButtonContainer = new unify.ui.container.Composite(leftButtonContainer_layout);
        
        var centerButtonContainer_layout = new unify.ui.layout.HBox();
        centerButtonContainer_layout.setAlignX("center");
        centerButtonContainer_layout.setSpacing(10);
        var centerButtonContainer = new unify.ui.container.Composite(centerButtonContainer_layout);
        
        var rightButtonContainer_layout = new unify.ui.layout.HBox();
        rightButtonContainer_layout.setAlignX("right");
        rightButtonContainer_layout.setSpacing(10);
        var rightButtonContainer = new unify.ui.container.Composite(rightButtonContainer_layout);
        
        buttonContainer.add(leftButtonContainer, {flex: 2});
        buttonContainer.add(centerButtonContainer, {flex: 1});
        buttonContainer.add(rightButtonContainer, {flex: 2});
        
        if (!buttons || (buttons.length <= 0)) {
          // No buttons are specified. Create a default Button
          
          var okBtn = this.__okBtn = new unify.ui.form.Button("OK");
          okBtn.setAppearance("dialog.button");
          okBtn.set({
            allowGrowX: true,
            allowGrowY: false,
            alignY: "middle"
          });
         
          okBtn.addListener("execute", function() {
            this.fireEvent("execute", BTN_OK);
          }, this);

          centerButtonContainer.add(okBtn);
        } else { // buttons.length > 0  
          var btnCount = buttons.length;
          
          if (btnCount > 4) {
            this.warn("Too much buttons. Maximal 4 buttons are supported.");
            btnCount = 4;
          }
          
          for (var i=0; i<btnCount; i++) {
            var button = buttons[i];
            
            //error handling
            if (!button.label) {
              this.warn("Button #"+i+" has no label.");
              continue;
            }
            if (!button.id) {
              this.warn("Button #"+i+" has no id.");
              continue;
            }
            if (!button.align) {
              this.warn("Button #"+i+" has no align. Using default align");
              button.align = "right";
            }
            
            // create new button
            var userBtn = new unify.ui.form.Button(button.label);
            userBtn.setUserData("id", button.id);
            userBtn.setAppearance("dialog.button");
            userBtn.set({
              allowGrowX: true,
              allowGrowY: false,
              alignY: "middle"
            });
            
            if (button.appearance) {
              userBtn.setAppearance(button.appearance);
            }
            
            userBtn.addListener("execute", this.__onButtonExecute, this);
            
            // add the new button to the right alignment container
            switch (button.align.toUpperCase()) {
              case "LEFT": 
                leftButtonContainer.add(userBtn);
                break;
              case "CENTER":
                centerButtonContainer.add(userBtn);
                break;
              default:
                this.warn("Button #"+i+": align \""+button.align+"\" is invalid. Using default align");
              case "RIGHT":
                rightButtonContainer.add(userBtn);
            }
            
          }
        }
        
        return buttonContainer;
      }