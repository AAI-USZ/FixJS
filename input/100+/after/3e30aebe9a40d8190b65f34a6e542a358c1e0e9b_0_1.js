function(response){
                      // iframe transport w/ jquery.form doesn't seem to be aware of status codes.
                      // so, we check for a url attribute to know if it worked.
                      if(response && response.url){
TARG = $(evt.target);
                        var textarea = $(evt.target).prev('form').find('textarea');
                        textarea.val(textarea.val() + location.protocol + '//' + location.host + response.url);
                        $(evt.target).val('');
                        textarea.focus();
                      }else{
                        this.flash({type:'error', message:'Upload failed. Accepted file types are png, jpg, gif.'});
                      }
                    }