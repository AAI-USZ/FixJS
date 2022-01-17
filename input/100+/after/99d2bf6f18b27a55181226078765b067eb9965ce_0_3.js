function(element, settings){
				
				//Установка параметров переданных через $.fn.add()
				var sets = $.extend({}, $.aplayer.config, settings);
				
				//Определение и установка типа
				sets = $.aplayer.setType(sets);
				
				//Установка размеров плеера ('Inherit' - установка размеров родительского эл-та)
				try{
				if(sets.height.indexOf('Inherit')!=-1)sets.height = $(element).height();
				}catch(err){};
				try{
				if(sets.width.indexOf('Inherit')!=-1)sets.width = $(element).width();
				}catch(err){};

				//Создание контейнера для плеера
				$.aplayer.aplayerNo++;
				var container = $('<div style="overflow:hiden; " ></div>'); //text-align:center;
                //$(container).height($(element).height()).width($(element).width());
				$(container).attr('id', $.aplayer.idContainer+$.aplayer.aplayerNo);
				//Установка дополнительного класса
				 $(container).addClass(settings['class']).addClass('aplayer');

				$(element).html(container);

				if (sets.mediaType == 'pseudo'){	
					//Вызов метода установки motion jpeg
					$.aplayer.showPseudo(container, sets);
				} 
				else if (sets.mediaType == 'mjpeg'){	
					//Вызов метода установки motion jpeg
					$.aplayer.showMjpeg(container, sets);
				}
				else if(sets.mediaType == 'image'){
					//Вызов метода вывода изображения
					$.aplayer.showImage(container, sets);
				}
				// установка лого_плей
				else if(sets.logoPlay != undefined && sets.logoPlay.indexOf('true')!=-1) 
				{
					var setLogoPlay = $.extend({}, sets, {'src': $.aplayer.ControlBar.controlsImg +$.aplayer.logo_play });
					//создаем субконтейнер для логотипа плей
					var lgp = $('<div />').height($(container).height()).width($($(container).width()));

					//Вызов метода вывода изображения
					var im = $('<img class="logoPlay" src="'+$.aplayer.ControlBar.controlsImg +$.aplayer.logo_play+'">')
					.appendTo(container);
					
					$(container).css({'text-align':'center'})
					.find('.logoPlay').css({'top': ($(container).height()- $(container).find('.logoPlay').height())/2 });
					
					var t = sets.mediaType;
					var s = sets.src;
					
					$(container).attr({'t':t,'s':s}) .click(function(){
						$(this).parent().addPlayer({'src': $(this).attr('s'), 'type':'"'+$(this).attr('t')+'"' ,'controls':'mini' }).click()
						.end().removeAttr('t').removeAttr('s').unbind('click');
					});
				}
				//Если задано значение application - воспроизводить как внедренный объект // || (settings.application!=null && settings.application.indexOf('true')!=-1)
				else if(sets.mediaType == 'embed' || sets.mediaType == 'rtsp'){
					//Вызов метода для использования плагина
					$.aplayer.showObject(container, sets);
				}
				else if(sets.mediaType == 'video'){
					//Вызов метода для использования HTML5 video
					$.aplayer.showVideo(container, sets);
				}
				else if(sets.mediaType == 'audio'){
					//Вызов метода для использования HTML5 audio
					$.aplayer.showAudio(container, sets);
				}
				else{
					alert('Error: undefined mediaType: '+sets.mediaType);
				}
				
				$.aplayer.draggable(container);
				
				$('[id^=cntr]',container).css($.aplayer.ControlBar.ControlsStyle);
				
				$.aplayer.scale[$.aplayer.idContainer+$.aplayer.aplayerNo]=0;
		}