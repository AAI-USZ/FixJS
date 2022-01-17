function(e) {
          e.stopPropagation();
          e.preventDefault();  
          
          //validation
          var error, 
              value = this.$input.val();
          if(typeof this.settings.validate == 'function' && (error = this.settings.validate.call(this, value))) {
              this.enableContent(error);
              return;
          }
         
          //getting primary key
          var pk = (typeof this.settings.pk == 'function') ? this.settings.pk.call(this) : this.settings.pk;
          var send = (this.settings.url != undefined) && ((this.settings.send == 'always') || (this.settings.send == 'ifpk' && pk));
          
          if(send) { //send to server
              var params = $.extend({}, this.settings.params, {value: value}),
                  that = this;
                
              //hide form, show loading
              this.enableLoading();
                            
              //adding name and pk    
              if(pk) params.pk = pk;   
              if(this.settings.name) params.name = this.settings.name;   
              var url = (typeof this.settings.url == 'function') ? this.settings.url.call(this) : this.settings.url;
              $.ajax({
                  url: url, 
                  params: params, 
                  method: 'post',
                  success: function(data) {
                      //check response
                      if(typeof that.settings.success == 'function' && (error = that.settings.success.call(that, data))) {
                          //show form with error message
                          that.enableContent(error);
                      } else {
                          //set new value and text
                          that.value = that.settings.getInputValue.call(that);           
                          that.settings.setText.call(that);
                          that.markAsSaved();
                          that.handleEmpty();      
                          that.hide();                           
                      }
                  },
                  error: function() {
                      that.enableContent('Server error'); 
                  }     
              });
          } else { //do not send to server   
              //set new value and text             
              this.value = this.settings.getInputValue.call(this);
              this.settings.setText.call(this);  
              //to show that value modified but not saved 
              this.markAsUnsaved();
              this.handleEmpty();   
              this.hide();
          }
     }