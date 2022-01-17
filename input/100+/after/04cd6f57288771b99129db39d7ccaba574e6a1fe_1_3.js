function(url,success,beforeSubmit,error){
		if(!error) error=function(jqXHR, textStatus){alert(i18nc['Error:']+' '+textStatus);};
		var form=this,imgLoadingSubmit;
		this.unbind('change').change(function(){
			form.fadeTo(180,0.4);
			if(beforeSubmit) beforeSubmit();
			if(window.tinymce) tinymce.triggerSave();
			if(form.data('ht5ifv')!==undefined && !form.ht5ifv('valid')){
				form.fadeTo(0,1)
				return false;
			}
			var ajaxOptions={
				type:'post',cache:false,
				beforeSend:function(){form.before(imgLoadingSubmit=$('<span/>').attr({'class':"img imgLoading"}).offset({left:form.position().left+form.width()-16}).css({position:'absolute','z-index':5}));},
				data:form.serialize(),
				complete:function(){imgLoadingSubmit.remove();form.fadeTo(150,1)},
				error:error
			};
			if(success) ajaxOptions.success=success;
			$.ajax(url,ajaxOptions);
			return false;
		});
	}