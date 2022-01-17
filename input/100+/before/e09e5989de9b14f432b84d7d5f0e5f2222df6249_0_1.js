function(){
      this.elements = (typeOf(els) === 'string') ? $$(els) : els;
      if(typeOf(this.elements) === 'null' || typeOf(this.elements[0]) === 'null') {
        this.elements = $$('input[placeholder],textarea[placeholder]');
      }

      this.elements.each(function(input){
        var textColor = input.getStyle('color');
        var lighterTextColor = self.LightenDarkenColor(textColor,80);

        if(input.getProperty('value') === '') {
          input.setProperty('value',input.getProperty('placeholder'));
          input.setStyle('color',lighterTextColor);
        }

        input.addEvents({
          focus: function(){
            if(input.getProperty('value') === input.getProperty('placeholder')) {
              input.setProperty('value','');
              input.setStyle('color',textColor);
            }
          },
          blur: function(){
            if(input.getProperty('value') === '') {
              input.setProperty('value',input.getProperty('placeholder'));
              input.setStyle('color',lighterTextColor);
            }
          }
        });
      });

    }