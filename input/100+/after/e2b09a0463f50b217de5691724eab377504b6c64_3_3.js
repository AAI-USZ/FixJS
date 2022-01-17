f		var elem = jQuery(this);
		var form = elem.parents('form:first');
		var oldAction = form.attr('action');
		form.attr('action', jQuery('#uploadImageLink').attr('value'));
		form.unbind('submit');
		form.append('<input type="hidden" class="cropMaxInitSize" name="MaxHeight" value="' + window.screen.height + '"/>');
		form.append('<input type="hidden" class="cropMaxInitSize" name="MaxWidth" value="' + window.screen.width + '"/>');
		form.iframePostForm({
			'json' : false, /*JSON.parse sems do not work correct...*/
			'iframeID' : 'imageUploadFrame',
			'post' : function (){
				//Do check if form is OK
				//return false; // to abort send
			},
			complete : function (data) {
				if (data.indexOf('{')===0){
					eval('var data = ' + data + ';');
					var isJSON = true;
				} else {
					var isJSON = false;
				}
				var imageParent = elem.parent().parent();
				var imageBefore = elem.parent();
				if (imageBefore.is('.imageTip')){
					imageParent = imageParent.parent();
					imageBefore = imageBefore.parent();
				}
				if (data.imageId){
					if (typeof(jcrop_api) !== 'undefined' && jcrop_api != null){
						jcrop_api.destroy();
					}
					imageParent.find('img').remove();
					imageParent.find('#img_error').remove();
					var rand = Math.floor(Math.random()*1000000000);
					var image = jQuery('<img src="' + jQuery('#imageLink').attr('value') + '?rand=' + rand+ '" class="cropable"/>');
					image.insertBefore(imageBefore);
					initCrop('form', imageBefore.parent());
					elem.attr('value','');
				} else {
					//No image/unknown type uploaded...
					if (typeof(jcrop_api) !== 'undefined' && jcrop_api != null){
						jcrop_api.destroy();
					}
					imageParent.find('img').remove();
					imageParent.find('#img_error').remove();
					var error = jQuery('<span id="img_error" class="error">' + data.error + '</span>');
					error.insertBefore(imageBefore);
					elem.attr('value','');
					
					if (!isJSON){
						//Show error in fancy
						jQuery.fancybox({
							'content':data,
							'onComplete': function(){
								jQuery.event.trigger( "newContent", ['fancy', jQuery('#fancybox-content')] );
							}
						});
					}
				}
			}
		});
		form.submit();
		
		form.attr('action', oldAction);
		form.find('.cropMaxInitSize').remove();
		glob.initAjaxUpload('form', form.parent());
	});
