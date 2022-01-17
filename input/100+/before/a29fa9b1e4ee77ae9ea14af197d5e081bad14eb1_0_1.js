function(){
			var t=$(this)
			var ev=$('iframe')[0].contentDocument.createEvent('MouseEvent')
			var offset=t.offset()
			var sx=offset.top;
			var sy=offset.left;
	
			var buttonpressed=0
			
			if ($.browser.msie)
				buttonpressed=1
			if ($.browser.mozilla){
				if (this.tagName=="A" && !alreadyClicked){ 
					ctestui.log('Opening HREF at mozilla: '+t.attr('href'))
					var js=t.attr('onclick')
					if (js){
						with( frames[0].window ){
							var ok=js()
							if (!ok)
								return;
						}
					}
					var _href=t.attr('href')
					if (_href.substr(0,11)=='javascript:')
						injectScript(_href.substr(11))
					else if (_href[0]!='#')
						commands.open(_href,false) // should not wait, none of the others wait.
					alreadyClicked=true
				}
				//ev=document.createEvent('HTMLEvent')
				ev.initEvent('click', false, false);
			}
			else
				ev.initMouseEvent("click", true, true, $('iframe')[0].contentWindow, 1, 
					sx, sy, 0, 0, 
					false, false, false, false, buttonpressed, null);
			//ev.initEvent('click',true,true)
			ctestui.log('click '+element)
			try{
				if (this.dispatchEvent)
					this.dispatchEvent(ev)
				else
					this.fireEvent(ev)
			}
			catch(e){
				ctestui.log('exception when clicking: '+String(e))
			}
		}