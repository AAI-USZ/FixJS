function(e) {

                    if (t) {
                        clearTimeout(t);
                    }

                    /* Do no submit. */
                    e.preventDefault();

                    /* Call before submit hook. */
                    /* If it returns false abort submitting. */
                    if (false !== onsubmit.apply(form, [settings, self])) {
                        /* Custom inputs call before submit hook. */
                        /* If it returns false abort submitting. */
                        if (false !== submit.apply(form, [settings, self])) {
                            
                            var data = get_data.apply(form, [settings, self]);                            
                            var id = data.id || self.id;
                            var value = data.value || input.val();

                          /* Check if given target is function */
                          if ($.isFunction(settings.target)) {
                              var str = settings.target.apply(self, [value, settings]);
                              $(self).html(str);
                              self.editing = false;
                              callback.apply(self, [self.innerHTML, settings]);
                              /* TODO: this is not dry */
                              if (!$.trim($(self).html())) {
                                  $(self).html(settings.placeholder);
                              }
                          } else {
                              /* Add edited content and id of edited element to POST. */
                              var submitdata = {};
                              submitdata[settings.name] = value;
                              submitdata[settings.id] = id;
                              /* Add extra data to be POST:ed. */
                              if ($.isFunction(settings.submitdata)) {
                                  $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                              } else {
                                  $.extend(submitdata, settings.submitdata);
                              }

                              /* Quick and dirty PUT support. */
                              if ('PUT' == settings.method) {
                                  submitdata['_method'] = 'put';
                              }

                              /* Show the saving indicator. */
                              $(self).html(settings.indicator);

                              /* Defaults for ajaxoptions. */
                              var ajaxoptions = {
                                  type    : 'POST',
                                  data    : submitdata,
                                  dataType: 'html',
                                  url     : settings.target,
                                  success : function(result, status) {
                                      if (ajaxoptions.dataType == 'html') {
                                        $(self).html(result);
                                      }
                                      self.editing = false;
                                      callback.apply(self, [result, settings]);
                                      if (!$.trim($(self).html())) {
                                          $(self).html(settings.placeholder);
                                      }
                                  },
                                  error   : function(xhr, status, error) {
                                      onerror.apply(form, [settings, self, xhr]);
                                  }
                              };

                              /* Override with what is given in settings.ajaxoptions. */
                              $.extend(ajaxoptions, settings.ajaxoptions);
                              $.ajax(ajaxoptions);

                            }
                        }
                    }

                    /* Show tooltip again. */
                    $(self).attr('title', settings.tooltip);

                    return false;
                }