function() { 

				var settings = $(this).data('settings');
				var tagslist = $(this).val().split(settings.delimiter);
				if (tagslist[0] == '') { 
					tagslist = new Array();
				}

				value = jQuery.trim(value);
		
				var skipTag  = false;
				if (options.unique) {
					skipTag = $(this).tagExist(value);
					if(skipTag == true) {
					    //Marks fake input as not_valid to let styling it
    				    $(settings.fake_input).addClass('not_valid');
    				    if (settings.onError) {
    				    	var f = settings.onError;
    				    	f.call(this,'duplicate');
    				    }
    				}
				}
				
				if (settings.validateTag) {
					var f = settings.validateTag;
					if (!f.call(this,value)) {
						skipTag = true;
    				    $(settings.fake_input).addClass('not_valid');
    				    if (settings.onError) {
    				    	var f = settings.onError;
    				    	f.call(this,'validation');
    				    }

					}
				}
				
				if (value !='' && skipTag != true) { 
                    $('<span>').addClass('tag').append(
                        $('<span>').text(value).append('&nbsp;&nbsp;'),
                        $('<a>', {
                            href  : '#',
                            title : settings.removeText,
                            text  : 'x'
                        }).click(function () {
                            return $(settings.real_input).removeTag(escape(value));
                        })
                    ).insertBefore(settings.input_wrapper);

					tagslist.push(value);
				
					$(settings.fake_input).val('');
					if (options.focus) {
						$(settings.fake_input).focus();
					} else {		
						$(settings.fake_input).blur();
					}
					
				
					$.fn.tagsInput.updateTagsField(this,tagslist);
					
					if (settings.onAddTag) {
						var f = settings.onAddTag;
						f.call(this, value);
					}
					if(settings.onChange)
					{
						var i = tagslist.length;
						var f = settings.onChange;
						f.call(this, $(this), tagslist[i-1]);
					}					
				}
		
			}