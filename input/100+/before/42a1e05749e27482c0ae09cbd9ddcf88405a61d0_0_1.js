function() {
              var that = this;
              this.$input = $(this.settings.template);

              function setOptions(source) {
                  if(typeof source == 'object' && source != null) {
                      $.each(source, function(key, value) {   
                          that.$input.append($('<option>', { value : key }).text(value)); 
                      });    
                  }
              }

              if(typeof this.settings.source == 'string' ) { //ajax loading from server
                  $.ajax({
                      url: this.settings.source, 
                      type: 'get',
                      dataType: 'json',
                      success: function(data) {
                          that.settings.source = data;
                          setOptions(data);
                          that.endShow();
                      },
                      error: function() {
                          that.errorOnRender = 'Error when loading options';
                          that.endShow();
                      }
                  });
              } else {
                  setOptions(this.settings.source);
                  this.endShow();
              }
          }