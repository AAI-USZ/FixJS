function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			submit=form.find(':submit');
			form.fadeTo(180,0.4);
			if(window.tinyMCE!==undefined) tinyMCE.triggerSave();
			if((beforeSubmit && beforeSubmit()===false) || (form.data('ht5ifv')!==undefined && !form.ht5ifv('valid'))){
				form.stop().fadeTo(0,1)
				return false;
			}
			var ajaxOptions={
				type:'post',cache:false,
				beforeSend:function(){submit.hide();submit.parent().append(imgLoadingSubmit);},
				data:form.serialize(),
				complete:function(){submit.show().blur();form.find('.img.imgLoading').remove();form.fadeTo(150,1)},
				error:error
			};
			if(success) ajaxOptions.success=success;
			$.ajax(url,ajaxOptions);
			return false;
		}