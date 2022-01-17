function(url,data,type,forceNotAddDataToGetORdoNotDoTheEffect){
			if(url.substr(0,1)==='?') url=location.pathname+url;
			var ajaxurl=url,headers={},divLoading=$('<div class="globalAjaxLoading"/>').text(i18nc['Loading...']).prepend('<span/>');
			
			if(data && !forceNotAddDataToGetORdoNotDoTheEffect) url+=(url.indexOf('?')==-1?'?':'&')+data;
			
			headers.SpringbokAjaxPage=divPage.length>0?divPage.data('layoutname')||'0':'0';
			headers.SpringbokAjaxContent=divContent.length>0?divContent.data('layoutname'):'';
			if(S.breadcrumbs) headers.SpringbokBreadcrumbs='1';
			
			document.title=i18nc['Loading...'];
			//$('body').fadeTo(0.4);
			$('body').addClass('cursorWait').append(divLoading);
			if(normalFaviconHref) linkFavicon.attr('href',webdir+'img/ajax-roller.gif');
			
			$.ajax(ajaxurl,{
				type:type?type:'GET', data:data, headers:headers,
				async:false,
				complete:function(jqXHR){
					S.history.navigate(url);
					
				/*	$('body').removeClass('cursorWait');
					divLoading.remove();
				},
				success:function(data,textStatus,jqXHR){*/
					var h,div,to;
					
					if(h=jqXHR.getResponseHeader('SpringbokAppVersion'))
						if(h!=version) if(confirm("L'application a été mise à jour. Souhaitez vous recharger la page ?")) window.location.reload();
					
					if(h=jqXHR.getResponseHeader('SpringbokRedirect')){
						divLoading.remove();
						S.ajax.load(h,false,false,true);
						return;
					}
					
					if(h=jqXHR.getResponseHeader('SpringbokAjaxTitle')) S.setTitle($.parseJSON(h));
					if(h=jqXHR.getResponseHeader('SpringbokAjaxBreadcrumbs')) S.breadcrumbs($.parseJSON(h));
					
					if(!(to=jqXHR.getResponseHeader('SpringbokAjaxTo'))) to='base';
					
					if(to === 'content') div=divContent;
					else if(to === 'page') div=divPage.attr('class',jqXHR.getResponseHeader('SpringbokAjaxPageClass'));
					else if(to === 'base') div=divContainer;
					
					div.find('span.mceEditor').each(function(){
						var ed=tinymce.get(this.id.substr(0,this.id.length-7));
						ed.focus(); ed.remove();
						/* if(tinymce.isGecko) */
					});
					
					$(window).scrollTop(0);
					
					var OnReadyCallbacks=readyCallbacks;
					S.ajax.loadContent(div,jqXHR.responseText,function(){OnReadyCallbacks.fire();$(document).trigger('springbokAjaxPageLoaded',div);},to,data || forceNotAddDataToGetORdoNotDoTheEffect);
					readyCallbacks=$.Callbacks();
					
					if(normalFaviconHref) linkFavicon.attr('href',normalFaviconHref);
					
					if(to === 'base') divPage=$('#page'); 
					if(to === 'base' || to === 'page') S.ajax.updateVariable(divPage);
					
					$('body').removeClass('cursorWait');
					divLoading.remove();
				}/*,
				error:function(jqXHR,textStatus,errorThrown){
					$(window).scrollTop(0);
					divContainer.html($('<p/>').attr('class','message error')
						.text(i18nc.Error+(textStatus?' ['+textStatus+']':'')+(errorThrown?' : '+errorThrown:''))).append(jqXHR.responseText);//.fadeTo(150,1);
					divPage=divVariable=divContent=false;
				}*/
			});
		}