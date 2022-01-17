function(jqXHR){
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
				}