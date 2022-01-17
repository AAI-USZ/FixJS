function($){
	var methods={
		beforeSubmit:function(){
			this.find('input.default').removeClass('default').val('');
			return this;
		},
		afterSubmit:function(){
			this.find('input.default').each(function(){this.val(this.title);});
			return this;
		}
	};
	$.fn.defaultInput = function(method){
		if(!method){
			var inputs;
			if(this.is('input')){
				inputs=this.addClass('default');
			}else inputs=this.find('input.default');
			
			inputs.each(function(){
				var $this=$(this);
				$this.val(function(i,v){if(!$this.is(':focus') && (v=='' || v==this.title)) return this.title; $this.removeClass('default');return v;})
				.focusin(function(){if($this.hasClass('default') || $this.val()===this.title) $this.removeClass('default').val('');})
				.focusout(function(e){if(!$this.hasClass('default') && $this.val()=='') $this.addClass('default').val($this.attr('title'));})
				.change(function(e){if($this.hasClass('default')) $this.val()!='' ? $this.removeClass('default') : $this.val($this.attr('title'))});
			});
			return inputs;
		}else if(methods[method]){
			//return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
			return methods[method].apply(this);
		}
	};
	$.fn.reset=function(){
		this.find('input[type=text],input[type=email],input[type=url],input[type=number],input[type=search],input[type=password],textarea,select').val('');
		return this;
	};
	
	var num=0;
	$.fn.ajaxForm=function(url,success,beforeSubmit,error){
		if(!error) error=function(jqXHR, textStatus){alert('Error: '+textStatus);};
		var form=this,submit;
		if(!url) url=form.attr('action');
		this.unbind('submit').submit(function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			submit=form.find(':submit');
			form.fadeTo(180,0.4);
			if(window.tinyMCE!==undefined) tinyMCE.triggerSave();
			if((beforeSubmit && beforeSubmit()===false) || (form.data('ht5ifv')!==undefined && !form.ht5ifv('valid'))){
				form.stop().fadeTo(0,1)
				return false;
			}
			var currentNum=num++,
			 ajaxOptions={
				type:'post',cache:false,
				beforeSend:function(){submit.hide();submit.parent().append($('<span/>').attr({id:'imgLoadingSubmit'+currentNum,'class':"img imgLoading"}));},
				data:form.serialize(),
				complete:function(){submit.show().blur();$('#imgLoadingSubmit'+currentNum).remove();form.fadeTo(150,1)},
				error:error
			};
			if(success) ajaxOptions.success=success;
			$.ajax(url,ajaxOptions);
			return false;
		})/*.find(':submit').unbind('click').click(function(){
			//var validator=form.data('validator');
			//if(validator && !validator.checkValidity()) return false;
			//submit=$(this);
			return true;
		});*/
		return this;
	};
	
	$.fn.ajaxChangeForm=function(url,success,beforeSubmit,error){
		if(!error) error=function(jqXHR, textStatus){alert(i18nc['Error:']+' '+textStatus);};
		var form=this;
		this.unbind('change').change(function(){
			form.fadeTo(180,0.4);
			if(beforeSubmit) beforeSubmit();
			if(window.tinymce) tinymce.triggerSave();
			if(form.data('ht5ifv')!==undefined && !form.ht5ifv('valid')){
				form.fadeTo(0,1)
				return false;
			}
			var currentNum=num++,
			 ajaxOptions={
				type:'post',cache:false,
				beforeSend:function(){form.before($('<span/>').attr({id:'imgLoadingForm'+currentNum,'class':"img imgLoading"}).offset({left:form.position().left+form.width()-16}).css({position:'absolute','z-index':5}));},
				data:form.serialize(),
				complete:function(){$('#imgLoadingForm'+currentNum).remove();form.fadeTo(150,1)},
				error:error
			};
			if(success) ajaxOptions.success=success;
			$.ajax(url,ajaxOptions);
			return false;
		});
	}
}