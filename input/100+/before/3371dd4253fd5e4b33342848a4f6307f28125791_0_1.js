function() {
  	  //TODO: if this element already has a placeholder, exit
    
      //local vars
      var $this = $(this),
          inputVal = $.trim($this.val()),
          inputWidth = $this.width(),
          inputHeight = $this.height(),

          //grab the inputs id for the <label @for>, or make a new one from the Date
          inputId = (this.id) ? this.id : 'placeholder' + (Math.floor(Math.random() * 1123456789)),
          placeholderText = $this.attr('placeholder'),
          placeholder = $('<label for='+ inputId +'>'+ placeholderText + '</label>');
        
      //stuff in some calculated values into the placeholderCSS object
      options.placeholderCSS['width'] = inputWidth;
      options.placeholderCSS['height'] = inputHeight;
      options.placeholderCSS['color'] = options.color;

      // adjust position of placeholder 
      options.placeholderCSS.left = (isOldOpera && (this.type == 'email' || this.type == 'url')) ?
         '11%' : o_left;
      placeholder.css(options.placeholderCSS);
    
      //place the placeholder
      $this.wrap(options.inputWrapper);
      $this.attr('id', inputId).after(placeholder);
      
      //if the input isn't empty
      if (inputVal){
        placeholder.hide();
      };
    
      //hide placeholder on focus
      $this.focus(function(){
        if (!$.trim($this.val())){
          placeholder.hide();
        };
      });
    
      //show placeholder if the input is empty
      $this.blur(function(){
        if (!$.trim($this.val())){
          placeholder.show();
        };
      });
    }