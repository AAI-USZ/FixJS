function(container, settings)
		{
			//Контролы не отображаются
			if(settings.controls=='none') return;
			//Использовать контролы браузера
			else if(settings.controls=='browser'){
				$(container).find('.'+$.aplayer.classElMedia).attr('controls', 'controls');
				return;
			}

			var Volume = $($.aplayer.ControlBar.volume).css($.aplayer.ControlBar.ControlsContainers).attr({'title':$.aplayer.config.dictionery.volume});
			$(Volume).find('.divSlider').slider({
            	range: "min",
                min : 0,
                max : 40,
			    value: 30,
                orientation: 'horizontal',
                slide:function(event, ui){$.aplayer.ControlBar.volumeSlideHandler(this);},
                change:function(event, ui){$.aplayer.ControlBar.volumeSlideHandler(this);}
			}).attr({
                'id': $.aplayer.idVolume+$.aplayer.aplayerNo,
                'No':$.aplayer.aplayerNo
                }).find('.ui-slider-range').addClass('ui-corner-all').attr({'left':'2px'}); 

                
            //Установка стилей ползунка
            $(Volume).find('.ui-slider-handle').css($.aplayer.ControlBar.Volume_handle).removeClass('ui-state-default');
            //Установка стилей полосы поиска
            $(Volume).find('.ui-slider').css($.aplayer.ControlBar.Volume_line);

			var soundOn = $($.aplayer.ControlBar.soundOn).css($.aplayer.ControlBar.ControlsContainers).attr({
					onclick: '$.aplayer.ControlBar.soundOnClickHandler("'+$.aplayer.aplayerNo+'")',
					id:$.aplayer.idSoundOn+$.aplayer.aplayerNo
				}).children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'SndOn.png'}).end()
				.attr({'title':$.aplayer.config.dictionery.soundOn,'alt': $.aplayer.config.dictionery.soundOn});


			var soundOff = $($.aplayer.ControlBar.soundOff).css($.aplayer.ControlBar.ControlsContainers).attr({
					onclick: '$.aplayer.ControlBar.soundOffClickHandler("'+$.aplayer.aplayerNo+'")',
					id:$.aplayer.idSoundOff+$.aplayer.aplayerNo
				}).children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'SndOff.png'}).end()
				.attr({'title':$.aplayer.config.dictionery.soundOff,'alt': $.aplayer.config.dictionery.soundOff });


			var Stop = $($.aplayer.ControlBar.stop).css($.aplayer.ControlBar.ControlsContainers).attr({
					onclick: '$.aplayer.ControlBar.stopClickHandler("'+$.aplayer.aplayerNo+'")',
					id:$.aplayer.idStop+$.aplayer.aplayerNo
				}).children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'Stop.png'}).end()
				.attr({'title':$.aplayer.config.dictionery.stop,'alt': $.aplayer.config.dictionery.stop });

			var CurrentTime = $($.aplayer.ControlBar.currentTime)
				.attr({'id':$.aplayer.idCurrentTime+$.aplayer.aplayerNo, 'title':$.aplayer.config.dictionery.currentTime})
				.css($.aplayer.ControlBar.TimeFontStyle);

			var Duration = $($.aplayer.ControlBar.duration)
				.attr({'id':$.aplayer.idDuration+$.aplayer.aplayerNo, 'title':$.aplayer.config.dictionery.duration})
				.css($.aplayer.ControlBar.TimeFontStyle);;


			var Times = $('<div />').css($.aplayer.ControlBar.ControlsContainers).append(CurrentTime).append(Duration);


			var Search = $($.aplayer.ControlBar.search).attr({'title':$.aplayer.config.dictionery.search});;
			$(Search).find(':first-child').slider({
			    range: "min",
			    value: 0,
			    start:function(event, ui){$.aplayer.ControlBar.searchOnStartHandler(this);},
                stop:function(event, ui){$.aplayer.ControlBar.searchOnStopHandler(this);},
                slide:function(event, ui){$.aplayer.ControlBar.searchOnSlideHandler(this);}
			}).attr({
                'id': $.aplayer.idSearch+$.aplayer.aplayerNo,
                'No':$.aplayer.aplayerNo
                }).find('.ui-slider-range').addClass('ui-corner-all').attr({'left':'2px', 'width':'99.5%'}); 

            //Установка стилей ползунка
            $(Search).find('.ui-slider-handle').css($.aplayer.ControlBar.Search_handle).removeClass('ui-state-default');
            //Установка стилей полосы поиска
            $(Search).find('.ui-slider').css($.aplayer.ControlBar.Search_line);

			var Play = $($.aplayer.ControlBar.play).css($.aplayer.ControlBar.ControlsContainers).attr({
					onclick: '$.aplayer.ControlBar.playClickHandler("'+$.aplayer.aplayerNo+'")',
					id: $.aplayer.idPlay+$.aplayer.aplayerNo
				}).children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'Play.png'}).end()
				.attr({'title':$.aplayer.config.dictionery.play,'alt': $.aplayer.config.dictionery.play });


			var Pause = $($.aplayer.ControlBar.pause).css($.aplayer.ControlBar.ControlsContainers).attr({
					onclick: '$.aplayer.ControlBar.pauseClickHandler("'+$.aplayer.aplayerNo+'")',
					id:$.aplayer.idPause+$.aplayer.aplayerNo
				}).children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'Pause.png'}).end()
				.attr({'title':$.aplayer.config.dictionery.pause,'alt': $.aplayer.config.dictionery.pause });

//			var Scale = $($.aplayer.ControlBar.scale).css($.aplayer.ControlBar.ControlsContainers);

			
			//Создаем панель контролов
            var ControlBar = $($.aplayer.ControlBar.panel).height(37);
            
            $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).height($('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().parent().height());

            var meHeight =  $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().height()-$(ControlBar).height()-10;
            
			//автоматическая подгонка панели контролов под размеры плеера = {controls:'auto'}
			if(settings.controls==null || settings.controls=='auto'){
				$(ControlBar).css({ 
					'width': ($(ControlBar).parent().width())+'px',
				}); 
				
				//вставляем в панель управления элементы управления
				$(ControlBar).attr('id',$.aplayer.idControlPanel+$.aplayer.aplayerNo)
				.append(Search).append(Play).append(Pause).append(Stop).append(Times)
				.append(soundOff).append(soundOn).append(Volume);
			}
            
			//автоматическая подгонка панели контролов под размеры плеера = {controls:'mini'}
			if(settings.controls=='mini'){
				$(ControlBar).css({ 
					'width': ($(ControlBar).parent().width())+'px',
				}); 
				
				//вставляем в панель управления элементы управления
				$(ControlBar).attr('id',$.aplayer.idControlPanel+$.aplayer.aplayerNo).css({ 'text-align':'center' })
				.append(Search).append(Play).append(Pause).append(Stop).append(soundOff).append(soundOn);
			}
            
			//добавление контрола масштаба
/*			if(settings.scale!='none'){
				$(ControlBar).css({ 'width':'99.3%'  }); 
				//вставляем в панель управления элементы управления
				$(ControlBar).append(Scale);
			}
*/
			
            //Создаем субконтейнер для медиа-элемента, вставлем в него медиа элемент и помещаем в контейнер плеера
			var SubCont = $('<div></div>').addClass($.aplayer.classMediaCont).css({'overflow':'hidden'}).height(meHeight);

			$('#'+$.aplayer.idElMedia + $.aplayer.aplayerNo).height(meHeight).appendTo($(SubCont));

			//Устанавливаем субконтейнер медиа-элемента и панель контролов в медиа плеер HTML5
            $('#'+$.aplayer.idContainer + $.aplayer.aplayerNo).append($(SubCont)).append($(ControlBar));
			$(ControlBar).css({'border':'2px solid #333333', 'background-color':'#333333'});
			
			
            //добавляем элемент масштаба
            try{
				if(settings.scale=='on' || settings.scale=='true' || settings.scale==true){
	            	var Scale = $($.aplayer.ControlBar.scale)
						.css($.aplayer.ControlBar.ControlsContainers)
						.css({'padding':'5px', 'float':'right' })
						.attr({ id: $.aplayer.idScale+$.aplayer.aplayerNo })
						.attr({'title':$.aplayer.config.dictionery.scale,'alt': $.aplayer.config.dictionery.scale });
	            	
	            	$('.scbtn', Scale).css($.aplayer.ControlBar.Scale_btn)
					.click(function(e){
						e.preventDefault();
						$.aplayer.ControlBar.scaleClickHandler(e);
						return false;
					});
	            	$(ControlBar).append(Scale);
	            }
            }catch(e){
            	console.log(e);
            }

			//Устанавливаем на медиа эл-т обработчики событий
			$('#'+$.aplayer.idElMedia + $.aplayer.aplayerNo).attr({
				ontimeupdate:'$.aplayer.ControlBar.elMediaOnTimeUpdate('+$.aplayer.aplayerNo+')',
				oncanplay: '$.aplayer.ControlBar.elMediaOnCanPlay('+$.aplayer.aplayerNo+')',
				onplay: '$.aplayer.ControlBar.elMediaOnPlay('+$.aplayer.aplayerNo+')',
				onpause:'$.aplayer.ControlBar.elMediaOnPause('+$.aplayer.aplayerNo+')',
				onended:'$.aplayer.ControlBar.elMediaOnEnded('+$.aplayer.aplayerNo+')',
				ondurationchanged:'$.aplayer.ControlBar.elDurationChanged('+$.aplayer.aplayerNo+')'
			});
		}