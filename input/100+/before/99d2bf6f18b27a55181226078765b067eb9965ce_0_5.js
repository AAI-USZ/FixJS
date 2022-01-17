function($){
	
	//Метод установки пользовательских настроек
	$.aplayerConfiguration = function(globalSettings){
		$.aplayer.init(globalSettings);
	};

	//Установка плеера в заданные эл-ты html
	//settings: src , type , config{}
	$.fn.addPlayer = function(settings){
				if(settings.src==null)
				{
//					alert('aplayer:\nError: src = undefined');
					return this;
				}
			else $(this).each(function(){
				$.aplayer.play(this, settings);
			});
		return this;
	};

	//Закрытие плеера
	$.fn.aplayerClose=function(){
		$(this).empty();
		return this;
	};

	//Смена src изображения
	$.fn.aplayerSetImgSrc = function(imageSource){
		var pl =  $(this).children('[id ^=' + $.aplayer.idContainer + ']');
			$(pl).removeAttr('t','s').unbind('click');
		
		$(pl).children(':first-child').attr('src',imageSource);//.attr('title', 'image');
		$.aplayer.draggable(pl);
		return this;
	};


	//Смена src для motion jpeg
	$.fn.aplayerSetMjpegSrc = function(mjpegSource){
		var pl =  $(this).children('[id ^=' + $.aplayer.idContainer + ']');
		
		if($.browserInfo.browser == 'msie'){
			$.aplayer.activeX_arr[$('OBJECT', this).attr('id')].MediaURL = mjpegSource+'&ab='+___abenc;
		}
		else{
			if($('img.'+$.aplayer.classElMedia, this).attr('src')=='#') {
				$('img.'+$.aplayer.classElMedia, this).attr({'origsrc': mjpegSource});
			}else{
				$('img.'+$.aplayer.classElMedia, this).attr({'origsrc': mjpegSource, 'src':mjpegSource });
			}
		}

		$.aplayer.draggable(pl);
		return this;
	};

	
	//Медиаэлемент использует размеры источника 
	$.fn.aplayerMediaSetSrcSizes = function(){
		var pl =  $(this).children('[id ^=' + $.aplayer.idContainer + ']');
		$('.'+$.aplayer.classElMedia ,this).removeAttr('height').removeAttr('width').css({'height':'', 'width':'' });
		$.aplayer.draggable(pl);
		return this;
	};

	//использовать размер источника
	$.fn.aplayerSetSrcSizes = function(){
		$(this).children('[id ^=' + $.aplayer.idContainer + ']').children(':first-child').removeAttr('height').removeAttr('width').css({'height':'', 'width':'' });
		return this;
	};
	
    //Изменение размеров медиаэлемента
    $.fn.aplayerSetSizeMediaElt = function(Sizes) {
    	var Owner = this;
	    $(this).children('[id ^=' + $.aplayer.idContainer + ']').each(function () {
    	    var Cont = $(this);
            var H = $(Cont).height();
	        var W = $(Cont).width();
            $(Cont).children('video, audio, object, embed, img, .'+$.aplayer.classMediaCont).each(function () {
	           if(!( $(this).hasClass($.aplayer.classMediaCont))) {
	            	$(this).height(Sizes.height).width(Sizes.width);
	           }
		       $(this).children('video, audio, embed, img').each(function () {
		       		$(this).height(Sizes.height).width(Sizes.width);
		       });
            });
            $.aplayer.draggable(Cont);
        });
        return this;
    };

    //Установка размеров плеера
    $.fn.aplayerSetSize = function(Sizes) {

	    $(this).children('div[id ^=' + $.aplayer.idContainer + ']').each(function () {
	    $(this).height(Sizes.height);
	    $(this).width(Sizes.width);
	    var Cont = $(this);

	    $(Cont).children('object, embed, img').each(function () {
	        $(this).height(Sizes.height).width(Sizes.width);
	        $(this).children('embed').each(function () {
	        $(this).height(Sizes.height).width(Sizes.width);
	        });
        }).end().children('.'+$.aplayer.classMediaCont).children('video, audio, img').each(function () { //Установка размера суб-элемента и вложенного медиа-элемента НЕ ПРОВЕРЯЛАСЬ!!!
	        $(this).height(Sizes.height - $(this).next('div[id ^=' + $.aplayer.idControlPanel + ']').height() - 7).width(Sizes.width - 6);
	        });
        });
        return this;
    };


    //Установка размеров внутренних контейнеров плеера(без медиа элемента) в соответствии с размерами его контейнера
    $.fn.aplayerResizeContanerOnlyToParent = function () {
	    $(this).children('div[id ^=' + $.aplayer.idContainer + ']').each(function () {
	    $(this).height($(this).parent().height() - 5);
	    $(this).width($(this).parent().width() - 5);
	    var Cont = $(this);

		    $(Cont).children('.'+$.aplayer.classMediaCont).height(function(){
	        	return $(Cont).height()-$(this).next('div[id ^=' + $.aplayer.idControlPanel + ']').height();
	        });
	        $(Cont).find('.logoPlay').removeAttr('style').css({'position':'relative', 'top': ($(Cont).height()- $(Cont).find('.logoPlay').height())/2 });
        });
    	return this;
    };

    //Установка размеров плеера в соответствии с размерами его контейнера
    $.fn.aplayerResizeToParent = function () {
	    $(this).children('div[id ^=' + $.aplayer.idContainer + ']').each(function () {
	    $(this).height($(this).parent().height() - 2);
	    $(this).width($(this).parent().width() - 2);
	    var Cont = $(this);

	    
	    
	$(Cont).children('object, embed, img').each(function () {
	        $(this).height($(Cont).height() - 1).width($(Cont).width() - 1);
	        $(this).children('embed').each(function () {
	        $(this).height($(Cont).height() - 1).width($(Cont).width() - 1);
	        });
	        //отображение лого-плей
	        $(Cont).find('.logoPlay').removeAttr('style').css({'position':'relative', 'top': ($(Cont).find('.logoPlay').parent().height()- $(Cont).find('.logoPlay').height())/2 });
	        
        }).end().children('.'+$.aplayer.classMediaCont).height(function(){
        	return $(Cont).height()-$(this).next('div[id ^=' + $.aplayer.idControlPanel + ']').height();
        }).children('video, audio, img').each(function () { //Установка размера суб-элемента и вложенного медиа-элемента НЕ ПРОВЕРЯЛАСЬ!!!
	        $(this).height($(Cont).height() - $(this).parent().next('div[id ^=' + $.aplayer.idControlPanel + ']').height() - 0).width($(Cont).width() - 0);
	        });
        });
	    
        return this;
    };

    //Является ли медиа-элемент картинкой?
    $.fn.aplayerIsImage = function(){
  		var el = $(this).children('div').children(':first-child');
  		if($(el).attr('name')=='img' && $(this).children('div').attr('t')== undefined) return true;
  		else return false;
    };
    
    
    //Является ли медиа-элемент embed || object?
    $.fn.aplayerIsEmbededObject = function(){
  		if($(this).find('embed').size()>0) return true;
  		else return false;
    };
    
    
    
    //Скрыть плеер
    $.fn.aplayerHide = function(){
  		$(this).children('[id^='+$.aplayer.idContainer+']').hide();
    };
    
    //Отобразить плеер
    $.fn.aplayerShow = function(){
  		$(this).children('[id^='+$.aplayer.idContainer+']').show();
    };

	//Объект, инкапсулирующий свойства и методы плеера
	$.aplayer = {

		stopPlay : function(aplayerID){
			try{
				$.aplayer.stopMjpegPlay($( 'img.'+$.aplayer.classElMedia,'#'+aplayerID));
			}catch(error){}
		},
		startPlay : function(aplayerID){
			try{
				$.aplayer.startMjpegPlay($( 'img.'+$.aplayer.classElMedia,'#'+aplayerID));
			}catch(error){}
		},
		
		scaleFactor : 0.1, //коэффициент масштабирования
		
		zoomIn : function(aplayerID){
        	//коэффициент увеличения размерa
			//плеер
			var cur_player = $('#'+aplayerID);
			var width = $(cur_player).width();
			var height = $(cur_player).height();

			//медиа элемент
			var me = $('.'+$.aplayer.classElMedia, cur_player );
			
			var me_width = $(me).width();
			var me_height = $(me).height();

			// шаг увеличения размерa
			var wm = width*$.aplayer.scaleFactor;
			var hm = height*$.aplayer.scaleFactor;

			me_width+=wm;
			me_height+=hm;
			
			//Изменение размеров медиа-элемента плеера 
			$(cur_player).parent().aplayerSetSizeMediaElt({
				'width':  me_width,
				'height': me_height
			} );
			
			if(me_width<=width){
				$(me).css({'left':'0px'});
			}
			if(me_height<=height){
				$(me).css({'top':'0px'});
			}
			
		},
		
		zoomOut : function(aplayerID){
			//плеер
			var cur_player = $('#'+aplayerID);
			var width = $(cur_player).width();
			var height = $(cur_player).height();

			//медиа элемент
			var me = $('.'+$.aplayer.classElMedia, cur_player );
			var me_width = $(me).width();
			var me_height = $(me).height();
			
			// шаг увеличения размерa
			var wm = width*$.aplayer.scaleFactor;
			var hm = height*$.aplayer.scaleFactor;
			me_width-=wm;
			me_height-=hm;
			
			//Изменение размеров медиа-элемента плеера 
			$(cur_player).parent().aplayerSetSizeMediaElt({
				'width':  me_width,
				'height': me_height
			} );
			
			if(me_width<=width){
				$(me).css({'left':'0px'});
			}
			if(me_height<=height){
				$(me).css({'top':'0px'});
			}

		},

			// scaleClickHandler(e)
			
			
		draggable : function(Container){
			var H = $(Container).height();
	        var W = $(Container).width();
			
	        var matrix ={
	        		'width' : $(Container).width(),
	        		'height': $(Container).height()
	        };
	        
            $(Container).children('video, audio, object, embed, img, .'+$.aplayer.classMediaCont).each(function () {
	           if(!( $(this).hasClass($.aplayer.classMediaCont))) {
		       		//Проверяем на перетаскиваемость
					if($(this).height() > $(this).parent().height() || $(this).width() > $(this).parent().width()) 
					{
						$(this).draggable({
							drag: function(event, ui){

								var imgWidth = $(this).width();
								var imgHeight = $(this).height();
								if(imgWidth>matrix.width) {
									if(ui.position.left>0){
										ui.position.left = 0;
								}
								if(W-ui.position.left>imgWidth)
									ui.position.left = W - imgWidth;
								} else {
									ui.position.left = 0;
								}
	
								if(imgHeight>H) {
									if(ui.position.top>0)
										ui.position.top = 0;
									if(H-ui.position.top>imgHeight)
										ui.position.top = H - imgHeight;
								} else {
									ui.position.top = 0;
								}
							}
						}).addClass('ui-corner-all ui-widget');
					}
					else
					{
						$(this).draggable('destroy').css({'position':'relative', 'top':'0'});
					}
	           }
		       $(this).children('video, audio, embed, img').each(function () {
		       		//Проверяем на перетаскиваемость
					if($(this).height() > $(this).parent().height() || $(this).width() > $(this).parent().width()) 
					{
							$(this).draggable({
								drag: function(event, ui){
								
									var imgWidth = $(this).width();
									var imgHeight = $(this).height();
									if(imgWidth>matrix.width) {
										if(ui.position.left>0){
											ui.position.left = 0;
									}
									if(W-ui.position.left>imgWidth)
										ui.position.left = W - imgWidth;
									} else {
										ui.position.left = 0;
									}
		
									if(imgHeight>H) {
										if(ui.position.top>0)
											ui.position.top = 0;
										if(H-ui.position.top>imgHeight)
											ui.position.top = H - imgHeight;
									} else {
										ui.position.top = 0;
									}
								}
							}).addClass('ui-corner-all ui-widget');
					}
					else{
						$(this).draggable('destroy').css({'position':'relative', 'top':'0'});
					}
			   });

			});
          	
           if($(Container)!=null && $(Container).height()!=null && $(Container).width()!=null ) $(Container).height(H).width(W).css({'overflow':'hidden'});
    	},
		
		//Установка базовых настроек плеера для популярных браузеров
		baseSettings : {
			'*':{
				'cgi'  :{'*':'mjpeg'},
				'mjpg' :{'*':'mjpeg'},
				'mjpeg' :{'*':'mjpeg'},
				'jpg' :{'*':'image'},
				'jepg':{'*':'image'},
				'png' :{'*':'image'},
				'bmp' :{'*':'image'},
				'gif' :{'*':'image'},
				'tiff':{'*':'image'},
				'*'   :{'*':'embed'}
			},
			
			'mozilla' : { 
					'ogg' :	{ '9':'video'	},
					'ogv' :	{ '9':'video'	},
					'oga' : { '9':'audio'	},
					'webm':	{ '9':'video'	}
			},

			'chrome' : {
					'ogg' :	{ '17':'video'	},
					'ogv' :	{ '17':'video'	},
					'webm':	{ '17':'video'	},
					'oga' : { '17':'audio'	}
			},
			
			'opera':{
					'wav' :	{ '11':'audio'	},
					'ogg' :	{ '11':'video'	},
					'ogv' :	{ '11':'video'	},
					'webm':	{ '11':'video'	},
					'oga' : { '11':'audio'	}
			},

			'safari' : {},
			
			'msie':{}
		},
		
		//Была ли произведена конфигурация?
		IsConfigurate : false, 
		
		//начальная инициализация
		init : function(globalSettings){
			
			if($.aplayer.IsConfigurate && globalSettings=={} ) return;
			$.aplayer.IsConfigurate = true;
			
			//сбор информации о браузере
			$.browserInfo.getInfo();
			
			//Вывод инфо о браузере
//			$.browserInfo.Show();
			
			//объект для формирования настроек текущего браузера
			var curSets = {};
			
			//временный объект для прохода по всем установленным значениям для текущего браузера
			var totalObj = $.extend({}, 
				$.aplayer.baseSettings['*']==null?{}:$.aplayer.baseSettings['*'],
				$.aplayer.baseSettings==null?{}:$.aplayer.baseSettings[$.browserInfo.browser], 
				globalSettings==null?{}:globalSettings['*'],
				globalSettings==null?{}:globalSettings[$.browserInfo.browser]);

			//установка базовых настроек для данной версии браузера
			for(var ext in totalObj){
				
				var extVers = $.extend({},
						$.aplayer.baseSettings['*']==null?{}:$.aplayer.baseSettings['*'][ext],
						$.aplayer.baseSettings[$.browserInfo.browser]==null?{}:$.aplayer.baseSettings[$.browserInfo.browser][ext], 
						globalSettings['*']==null? {}:globalSettings['*'][ext],
						globalSettings[$.browserInfo.browser]==null? {}:globalSettings[$.browserInfo.browser][ext]);
				//если значение для данной версии заданно непосредственно
				if(extVers[$.browserInfo.version]!=null){
					curSets[ext] = extVers[$.browserInfo.version];
					continue;
				}
				else{ //если значение для данной версии не заданно непосредственно - ищем максимальную версию, которая меньше версии браузера
					//создаем массив версий, включая и версию браузера
					var arrVer = [$.browserInfo.version]; 
					
					for(var ver in extVers)	arrVer.push( ver=='*'? '0': ver );
					
					//сортируем массив по возрастанию
					arrVer.sort($.aplayer.versionPredicate);
					//получаем версию предшествующую версии браузера
					$.each(arrVer, function(i, val){
						if(val == $.browserInfo.version){
							if((i-1)<0)return;
							else{
								if(arrVer[i-1]=='0') curSets[ext] = extVers['0']==null? extVers['*']: extVers['0'];
								else curSets[ext] = extVers[arrVer[i-1]];
								return;
							}
						}
					});
					
				}
			}

			//проверка допустимых значений
			$.each(curSets, function(i, value){
				if(value!='embed' && value!='video' && value!='audio' && value!='image' && value!='mjpeg' && value!='pseudo' ){
					alert("Установленно недопустимое значение конфигурации: \n"+ i +' : '+value );
					curSets[i]='embed';
				}
			});
			
			//Устанавливаем результат в объект конфигурации
			$.extend($.aplayer.config, curSets);
			
			//Вывод конфигурации
//			$.aplayer.config.Show();
		},

		//предикат сравнения версий
		versionPredicate : function(f,s){
			//выражение парсинга версии
			var reg = new RegExp('\\d+', 'ig');
			//парсим версии
			var F = f.match(reg);
			var S = s.match(reg);
			//учитываем кол-во значений (если больше значений - большим считаем исходноее значение, прт прочих равных)
			var p = 0;
			//выравнивание размеров версий
			if(F.length > S.length){
				for(var i = S.length; i<F.length; i++)S[i]=0;
				p = 1;
			}
			else if	(F.length < S.length){
				for(var i = F.length; i<S.length; i++)F[i]=0;
				p = -1;	
			}
			//Производим сравнение
			for(var i = 0; i<F.length; i++){
				if(parseInt(F[i]) > parseInt(S[i]))return 1;
				else if(parseInt(F[i]) < parseInt(S[i]))return -1;
			}
			return p;
		},
		
		
			//Общая для всех плееров конфигурация
			config : {
				height:'Inherit',
				width:'Inherit',
				
				dictionery:{
					stop:'Stop',
					pause:'Pause',
					play: 'Play',
					soundOn:'Sound on',
					soundOff: 'Sound off',
					volume:'Volume',
					search:'Search',
					currentTime:'Current Time',
					duration:'Duration',
					scale:'Scale'
				},
				
				//Отображает содержимое объекта config
				Show : function(){
					var str='';
					for(var p in $.aplayer.config){
						if ($.aplayer.config[p].toString().indexOf('function')==-1){
							str += p +" = " +$.aplayer.config[p]+'\n';
							
							if($.aplayer.config[p].toString().indexOf('object')!=-1){
								str+='{\n';
								for(var tip in $.aplayer.config[p]){
									str +='\t'+ tip +" = " +$.aplayer.config[p][tip]+'\n';	

									if($.aplayer.config[p][tip].toString().indexOf('object')!=-1){
										str+='\t{\n';
										for(var tipIn in $.aplayer.config[p][tip]){
											str +='\t\t'+ tipIn +" = " +$.aplayer.config[p][tip][tipIn]+'\n';	
										}
										str+='\t}\n';
									}
								}
								str+='}\n';
							}
						}
						else str += p +" = " + 'function(){}'+'\n';
					}
					alert(str);
				}
			},

			//типы файлов для автоопределения
			extTypes:{
				mjpeg:['mjpeg'],
				image:['png', 'jpg','gif', 'bmp', 'jpeg', 'tiff'],
				video:['mp4', 'ogg', 'ogv', 'webm'],
				audio:['oga','mp3', 'm4a', 'wav'],
				application:['avi']
			},

			//Расширения и соответствующие MIME types
			MIMEtypes:{
				mjpeg	:'multipart/x-mixed-replace',
				tiff	:'image/bmp',
				bmp		:'image/bmp',
				png		:'image/png', 
				jpeg	:'image/jpeg',
				jpg		:'image/jpeg',
				gif		:'image/gif', 
				swf		:'application/x-shockwave-flash',
				flv		:'video/x-flv',
				aif 	:'audio/x-aiff',
				aifc 	:'audio/x-aiff',
				aiff 	:'audio/x-aiff',
				au 		:'audio/basic',
				avi 	:'video/x-msvideo',
				dv 		:'video/x-dv',
				m3u 	:'audio/x-mpegurl',
				m4a 	:'audio/mp4a-latm',
				m4b 	:'audio/mp4a-latm',
				m4p 	:'audio/mp4a-latm',
				m4u 	:'video/vnd.mpegurl',
				m4v 	:'video/x-m4v',
				mid 	:'audio/midi',
				midi 	:'audio/midi',
				mov 	:'video/quicktime',
				movie 	:'video/x-sgi-movie',
				mp2 	:'audio/mpeg',
				mp3 	:'audio/mpeg',
				mp4 	:'video/mp4',
				mpe 	:'video/mpeg',
				mpeg 	:'video/mpeg',
				mpg 	:'video/mpeg',
				mpga 	:'audio/mpeg',
				mxu 	:'video/vnd.mpegurl',
				snd 	:'audio/basic',
				wav 	:'audio/x-wav',
				wmv		:'video/x-ms-wmv',
				ogv		:'video/ogg',
				oga		:'audio/ogg',
				ogg 	:'application/ogg',
				webm	:'video/webm'
			},

			//метод определения mime type для воспроизведения файла
			setApplicationType : function(extension, elementMediaType, settings){
				if(extension==null){
					var reg = new RegExp('\\.\\w{3,5}\\s*', 'gi');
					 extension=settings.src.match(reg);
					 extension=extension[extension.length-1].slice(1);
				}
				if($.aplayer.MIMEtypes[extension]!=null)
				{
					elementMediaType=$.aplayer.MIMEtypes[extension];
				}
				else elementMediaType='application/'+extension;

				return elementMediaType;
			},

			//Определение и установка типа
			setType : function(settings){
				if(settings.type!=null)
					{
						if(settings.type.indexOf('image')!=-1)return $.extend(settings, {mediaType : 'image' });
						if(settings.type.indexOf('application')!=-1 )return $.extend(settings, {mediaType : 'embed' });
					}

				var ext=null, elementMediaType = null;
				var src =(settings.src).toLowerCase();

				//если используется протокол rtsp
				if(settings.src.indexOf('rtsp://')!=-1 ){
					$.extend(settings, {mediaType : 'rtsp'});
					return settings;
				}

				
				//получение расширения и майм-типа
				if(ext==null){
					var reg = new RegExp('\\.\\w{3,5}(\\s*)', 'ig'); //для получения расширения файла
					var extArr = src.match(reg);
					if(extArr.length>0){
						ext = extArr[extArr.length-1].slice(1); 
						elementMediaType = $.aplayer.MIMEtypes[ext];
					}
				}
				
				//если задан в конфигурации способ воспроизведения - используем его
				if($.aplayer.config[ext]!=null)
				{
					if(elementMediaType==null){
						if($.aplayer.config[ext]=='embed')elementMediaType = 'application/'+ext;
						else elementMediaType = $.aplayer.config[ext]+'/'+ext;
					}
					$.extend(settings, {mediaType : $.aplayer.config[ext], 'type' :elementMediaType });
					return settings;
				}
				
				//если в конфигурации способ воспроизведения для "всех остальных файлов"(т.е. - "*") - исползуем его
				if($.aplayer.config['*']!=null)
				{
					if(elementMediaType==null){
						if($.aplayer.config['*']=='embed')elementMediaType = 'application/'+ext;
						else elementMediaType = $.aplayer.config['*']+'/'+ext;
					}
					$.extend(settings, {mediaType : $.aplayer.config['*'], 'type' :elementMediaType });
					return settings;
				}
				
				//автоматическое определение способа воспроизведения				
				$.each($.aplayer.extTypes, function(i, type){
					$.each(type, function(index, value){
						if(src.indexOf(value)!=-1){
							elementMediaType = i;
							ext = value;
						}
					});
				});

				if(elementMediaType==null){
					elementMediaType = $.aplayer.setApplicationType(ext, elementMediaType,settings);
					$.extend(settings, {mediaType : 'embed' });
				}
				else if(elementMediaType.indexOf('pseudo')!=-1){
					elementMediaType=elementMediaType+'/'+ext;
					$.extend(settings, {mediaType : 'pseudo'});	
				}
				else if(elementMediaType.indexOf('mjpeg')!=-1){
					elementMediaType=elementMediaType+'/'+ext;
					$.extend(settings, {mediaType : 'mjpeg'});	
				}
				else if(elementMediaType.indexOf('image')!=-1){
					elementMediaType=elementMediaType+'/'+ext;
					$.extend(settings, {mediaType : 'image'});	
				}
				else if(elementMediaType.indexOf('video')!=-1 && $.browserInfo.HTML5_Video)
				{
					if(
						((ext == 'ogg' ||ext == 'ogv') && $.browserInfo.video_ogg=='probably')||
						(ext == 'mp4' && $.browserInfo.video_mp4=='probably')||
						(ext == 'webm' && $.browserInfo.video_webm=='probably')
							){
								elementMediaType=elementMediaType+'/'+ext;
								$.extend(settings, {mediaType : 'video' });
							}
					else {
						if(
						((ext == 'ogg' ||ext == 'ogv') && $.browserInfo.video_ogg=='maybe')||
						(ext == 'mp4' && $.browserInfo.video_mp4=='maybe')||
						(ext == 'webm' && $.browserInfo.video_webm=='maybe')
							){
								elementMediaType=elementMediaType+'/'+ext;
								$.extend(settings, {mediaType : 'video' });	
							}
						else{
								elementMediaType = $.aplayer.setApplicationType(ext, elementMediaType, settings);
								$.extend(settings, {mediaType : 'embed' });		
						}
					}
				}
				else if(elementMediaType.indexOf('audio')!=-1 && $.browserInfo.HTML5_Audio)
				{
					if(ext == 'mp3'|| ext == 'mp2' || ext == 'mpga')
					{	if($.browserInfo.audio_mpeg=='probably'){
							elementMediaType = 'audio/mpeg';
							$.extend(settings, {mediaType : 'audio' });
						}
						else if($.browserInfo.audio_mpeg=='maybe'){
							elementMediaType = 'audio/mpeg';
							$.extend(settings, {mediaType : 'audio' });
						}
						else {
							elementMediaType = 'audio/mpeg';
							$.extend(settings, {mediaType : 'embed' });
						}
					}
					if((ext == 'ogg' ||ext == 'oga'))
					{	if($.browserInfo.audio_ogg=='probably'){
							elementMediaType ='audio/ogg';
							$.extend(settings, {mediaType : 'audio' });
						}
						else if($.browserInfo.audio_ogg=='maybe'){
							elementMediaType ='audio/ogg';
							$.extend(settings, {mediaType : 'audio' });	
						}
						else{
							elementMediaType = 'audio/ogg';
							$.extend(settings, {mediaType : 'embed' });
						}
					}
					if(ext == 'm4a')
					{	if($.browserInfo.audio_x_m4a=='probably'){
							elementMediaType ='audio/x-m4a';
							$.extend(settings, {mediaType : 'audio' });
						}
						else if($.browserInfo.audio_x_m4a=='maybe'){
							elementMediaType ='audio/x-m4a';
							$.extend(settings, {mediaType : 'audio' });	
						}
						else{
							elementMediaType = 'audio/x-m4a';
							$.extend(settings, {mediaType : 'embed' });
						}
					}
					if(ext == 'wav')
					{	if($.browserInfo.audio_wav=='probably'){
							elementMediaType = 'audio/wav';
							$.extend(settings, {mediaType : 'audio' });
						}
						else if($.browserInfo.audio_wav=='maybe'){
							elementMediaType = 'audio/wav';
							$.extend(settings, {mediaType : 'audio' });
						}
						else{
							elementMediaType = 'audio/wav';
							$.extend(settings, {mediaType : 'embed' });
						}
					}
				}
				else
				{
					elementMediaType = $.aplayer.setApplicationType(ext, elementMediaType, settings);
					$.extend(settings, {mediaType : 'embed' });
				}

				$.extend(settings, {'type':elementMediaType});
				return settings;
			},
			
			
			//Метод установки плеера
			play : function(element, settings){
				
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
		},

			//Метод вывода изображения
			showImage : function(container, settings){
				
				if(settings.useImageSize!=null && settings.useImageSize=='true')
				{
					//  title="'+settings.type+'"
					$('<img  src="'+settings.src+'" name="img"/>').appendTo(container);
					return;
				}
				
				var size = 'style="width:'+settings.width+'px; height:'+settings.height+'px; "';
				// title="'+settings.type+'"
				var im = $('<img  src="'+settings.src+'" '+size+' name="img"/>').attr({'height':settings.height, 'width':settings.width });
				$(im).appendTo(container);
			},

			//Массив объектов 
			activeX_arr:{},
			//Установка motion jpeg
			showMjpeg : function(container, settings){
				
				if($.browserInfo.browser == 'msie'){
					var amc = document.createElement('object');
				      amc.id = 'activX_'+$.aplayer.aplayerNo;
				      amc.alt = 'Microsoft Internet Explorer on Windows system found. Try ActiveX viewer.';
				      amc.border = 0;
				      amc.hspace = 0;
				      amc.vspace = 0;
				      amc.width = settings.width;
				      amc.height = settings.height;

				      $(container).append(amc);
	
				      amc.codeBase = "AMC.cab#Version=5,6,2,5";
				      amc.classid = "clsid:745395C8-D0E1-4227-8586-624CA9A10A8D";
				      amc.UIMode = "none";
				      amc.ShowToolbar = (settings.controls == false)? false:true;
				      amc.ShowStatusBar = false;
				      amc.StretchToFit = true;
				      amc.Popups = 6;
				      amc.EnableReconnect = EnableReconnect;
				      amc.EnableContextMenu = 1;
				      amc.MediaType = "mjpeg";
				      amc.MediaURL = settings.src+'&ab='+___abenc;
				      amc.AutoStart = true;
				      
				      $.aplayer.activeX_arr[amc.id]=amc;
				      
				}else{
				//если HE ИнтернетЭксплорер
					
				var mim;
				var meHeight;
				
				//установка изображения
				if(settings.useImageSize!=null && settings.useImageSize=='true'){
					
					mim = $('<img  src="#" name="mjpeg"/>');
				}
				else {
					var size = 'style="width:'+settings.width+'px; height:'+settings.height+'px; "';
					mim = $('<img src="#" '+size+' name="mjpeg"/>').attr({'height':settings.height, 'width':settings.width });
				}
				
				$(mim)
				.attr({'id':$.aplayer.idElMedia+$.aplayer.aplayerNo, 'class':$.aplayer.classElMedia, 'origsrc':settings.src })
				.appendTo(container);
			
				//Если не устанавливать пенель контролов
				if(settings.controls==false || settings.controls=='off' ){
					$(mim).attr({'src':settings.src});
		            meHeight =  $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().height();
					$(ControlBar).css({ 
						'width': ($(ControlBar).parent().width())+'px',
					}); 
	            
		            //Создаем субконтейнер для медиа-элемента, вставлем в него медиа элемент и помещаем в контейнер плеера
					var SubCont = $('<div></div>').addClass($.aplayer.classMediaCont).css({'overflow':'hidden'}).height(meHeight);
	
					$('#'+$.aplayer.idElMedia + $.aplayer.aplayerNo).height(meHeight).appendTo($(SubCont));
	
					//Устанавливаем субконтейнер медиа-элемента и панель контролов плеер 
		            $('#'+$.aplayer.idContainer + $.aplayer.aplayerNo)
		            .append($(SubCont));
					
				}
				else{
					$(mim).css({'visibility':'hidden'});
						
					var Stop = $($.aplayer.ControlBar.stop)
						.css($.aplayer.ControlBar.ControlsContainers)
						.css({'padding':'5px'})
						.attr({ id:$.aplayer.idStop+$.aplayer.aplayerNo})
						.click(function(e){
							e.preventDefault();
							 $.aplayer.stopMjpegPlay(mim);
							 return false;
						})
						.children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'Stop.png'})
						.end()
						.attr({'title':$.aplayer.config.dictionery.stop,'alt': $.aplayer.config.dictionery.stop });
	
					var Play = $($.aplayer.ControlBar.play)
						.css($.aplayer.ControlBar.ControlsContainers)
						.css({'padding':'5px'})
						.attr({ id: $.aplayer.idPlay+$.aplayer.aplayerNo })
						.click(function(e){
							e.preventDefault();
							 $.aplayer.startMjpegPlay(mim);
							 return false;
						})
						.children('img')
						.attr({'src': $.aplayer.ControlBar.controlsImg+'Play.png'})
						.end()
						.attr({'title':$.aplayer.config.dictionery.play,'alt': $.aplayer.config.dictionery.play });
	
					//Создаем панель контролов
		            var ControlBar = $($.aplayer.ControlBar.panel).height(37); //.css({'padding':'3px'});
		            
		            $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).height($('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().parent().height());
	
		              meHeight =  $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().height()-$(ControlBar).height()-10;
		            
						$(ControlBar).css({ 
							'width': ($(ControlBar).parent().width())+'px',
						}); 
						
						//вставляем в панель управления элементы управления
						$(ControlBar).attr('id',$.aplayer.idControlPanel+$.aplayer.aplayerNo)
						.append(Play)
						.append(Stop);
		            
		            //Создаем субконтейнер для медиа-элемента, вставлем в него медиа элемент и помещаем в контейнер плеера
					var SubCont = $('<div></div>').addClass($.aplayer.classMediaCont).css({'overflow':'hidden'}).height(meHeight);
	
					$('#'+$.aplayer.idElMedia + $.aplayer.aplayerNo).height(meHeight).appendTo($(SubCont));
	
					//Устанавливаем субконтейнер медиа-элемента и панель контролов плеер 
		            $('#'+$.aplayer.idContainer + $.aplayer.aplayerNo)
		            .append($(SubCont))
		            .append($(ControlBar));
					
		            $(ControlBar).css({'border':'2px solid #333333', 'background-color':'#333333'});
		            
		            //добавляем элемент масштаба
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
		            
		            //если установлен автостарт
		            if(settings.autostart=='on' || settings.autostart=='true' || settings.autostart==true){
		            	$.aplayer.startMjpegPlay(mim);
		            }
		            
		            //$('.'+$.aplayer.classElMedia, container).bind('mousewheel', function(e){  console.log( "TEST>>>" ); } );
		            
		            
					}//else

				//добавляем скролл-масштаб
	            if(settings.scale=='on' || settings.scale=='true' || settings.scale==true){
	            	try{
	            		// требуется подключение jquery.mousewheel.min.js
//						$('.'+$.aplayer.classMediaCont, container).unbind('mousewheel');
						$('.'+$.aplayer.classMediaCont , container).mousewheel(function(event, delta) {
							event.preventDefault();
							event.stopPropagation();
							$.aplayer.ControlBar.scaleWhelHandler(event, delta);
							return false;
						});
	            	}catch(error){}
	            }
				
				}//not IE
			},
			
			//начать воспроизведение Mjpeg
			startMjpegPlay : function(mim){
				$(mim).attr({'src': $(mim).attr('origsrc')+'&dummy'+Math.random() }).css({'visibility':'visible'});
			},

			//остановить воспроизведение Mjpeg
			stopMjpegPlay : function(mim){
				$(mim).attr({'src': '#'}).css({'visibility':'hidden'});
			},
			
			//Установка motion jpeg
			showPseudo : function(container, settings){

				var freq = 130; //частота смены кадров в миллисекундах
				var mim;
				
				//установка изображения
				if(settings.useImageSize!=null && settings.useImageSize=='true'){
					mim = $('<img  src="'+settings.src+'" name="img"/>');
				}
				else {
					var size = 'style="width:'+settings.width+'px; height:'+settings.height+'px; "';
					mim = $('<img  src="'+settings.src+'" '+size+' name="pseudo"/>').attr({'height':settings.height, 'width':settings.width });
				}
				
				$(mim)
				.attr({'id':$.aplayer.idElMedia+$.aplayer.aplayerNo, 'class':$.aplayer.classElMedia, 'origsrc':settings.src })
				.appendTo(container);
			
				var Stop = $($.aplayer.ControlBar.stop)
					.css($.aplayer.ControlBar.ControlsContainers)
					.css({'padding':'5px'})
					.attr({ id:$.aplayer.idStop+$.aplayer.aplayerNo})
					.click(function(e){
						e.preventDefault();
						 $.aplayer.stopPseudoPlay(mim);
						 return false;
					})
					.children('img').attr({'src': $.aplayer.ControlBar.controlsImg+'Stop.png'})
					.end()
					.attr({'title':$.aplayer.config.dictionery.stop,'alt': $.aplayer.config.dictionery.stop });

				var Play = $($.aplayer.ControlBar.play)
					.css($.aplayer.ControlBar.ControlsContainers)
					.css({'padding':'5px'})
					.attr({ id: $.aplayer.idPlay+$.aplayer.aplayerNo })
					.click(function(e){
						e.preventDefault();
						 $.aplayer.startPseudoPlay(mim, freq);
						 return false;
					})
					.children('img')
					.attr({'src': $.aplayer.ControlBar.controlsImg+'Play.png'})
					.end()
					.attr({'title':$.aplayer.config.dictionery.play,'alt': $.aplayer.config.dictionery.play });

				//Создаем панель контролов
	            var ControlBar = $($.aplayer.ControlBar.panel).height(37); //.css({'padding':'3px'});
	            
	            $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).height($('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().parent().height());

	            var meHeight =  $('#'+$.aplayer.idContainer+ $.aplayer.aplayerNo).parent().height()-$(ControlBar).height()-10;
	            
				//автоматическая подгонка панели контролов под размеры плеера = {controls:'auto'}
				if(settings.controls==null || settings.controls=='auto'){
					$(ControlBar).css({ 'width':'99.5%' }); 
					
					//вставляем в панель управления элементы управления
					$(ControlBar).attr('id',$.aplayer.idControlPanel+$.aplayer.aplayerNo)
					.append(Play)
					.append(Stop);
				}
	            
				//автоматическая подгонка панели контролов под размеры плеера = {controls:'auto'}
				if(settings.controls=='mini'){
					$(ControlBar).css({ 'width':'99.3%'  }); 
					
					//вставляем в панель управления элементы управления
					$(ControlBar).attr('id',$.aplayer.idControlPanel+$.aplayer.aplayerNo).css({ 'text-align':'center' })
					.append(Search).append(Play).append(Stop).append(soundOff).append(soundOn);
				}
	            
	            //Создаем субконтейнер для медиа-элемента, вставлем в него медиа элемент и помещаем в контейнер плеера
				var SubCont = $('<div></div>').addClass($.aplayer.classMediaCont).css({'overflow':'hidden'}).height(meHeight);

				$('#'+$.aplayer.idElMedia + $.aplayer.aplayerNo).height(meHeight).appendTo($(SubCont));

				//Устанавливаем субконтейнер медиа-элемента и панель контролов плеер 
	            $('#'+$.aplayer.idContainer + $.aplayer.aplayerNo)
	            .append($(SubCont))
	            .append($(ControlBar));
				
	            $(ControlBar).css({'border':'2px solid #333333', 'background-color':'#333333'});
			},
			
			//начать воспроизведение pseudo
			startPseudoPlay : function(mim, freq){
				var tid = setInterval(function(){
						var orig = $(mim).attr('origsrc');
						var pr = orig+'?'+ Math.random();
						$(mim).attr({'src': pr});
					}, freq);
				$(mim).attr({'tid':tid});
			},

			//остановить воспроизведение pseudo
			stopPseudoPlay : function(mim){
				clearInterval($(mim).attr('tid'));
			},
			
			//Метод для использования плагина
			showObject:function(container, settings){

             //Создаем object
             var obj;
               //QuickTime
             	if(settings.mediaType == 'rtsp'){
             		obj = $.aplayer.createObj_RTSP(settings);
             	}
             	else  if(settings.type.indexOf($.aplayer.MIMEtypes.mp4)!=-1 || settings.type.indexOf($.aplayer.MIMEtypes.mov)!=-1) 
             		obj = $.aplayer.createObj_QuickTime(settings);
               //SWF
               else if(settings.type.indexOf($.aplayer.MIMEtypes.swf)!=-1 || settings.type.indexOf($.aplayer.MIMEtypes.flv)!=-1) obj = $.aplayer.createObj_SWF(settings);
               //wmv - в IE глюки
               else if(settings.type.indexOf($.aplayer.MIMEtypes.wmv)!=-1) obj = $.aplayer.createObj_WMV(settings);
               // audio/mp3
               else if(settings.type.indexOf($.aplayer.MIMEtypes.mp3)!=-1) obj = $.aplayer.createObj_MP3(settings);
               // audio/wav
               else if(settings.type.indexOf($.aplayer.MIMEtypes.wav)!=-1) obj = $.aplayer.createObj_WAV(settings);
               // video AVI
               else if(settings.type.indexOf($.aplayer.MIMEtypes.avi)!=-1) obj = $.aplayer.createObj_AVI(settings);
               // audio wav
               else if(settings.type.indexOf($.aplayer.MIMEtypes.wav)!=-1) obj = $.aplayer.createObj_WAV(settings);
               else obj = $.aplayer.create_Embed(settings);

               $(container).height(settings.height);
               
 //              $(obj).attr({'width': settings.width, 'height': settings.height});

//              $(obj).append($('<noembed>Your browser does not support video!!!!!!!!!!!!!!!!!!!!! </noembed>'));

               $(container).html(obj);
        	},

            //create EMBED
            create_Embed:function(settings){
//                var size = 'width="'+settings.width+'" height="'+settings.height+'"';  // '+size+' // play="false"
                return $('<embed type="'+settings.type+'"autostart="false" auto="false" autoplay="false" allowfullscreen="true" allowScriptAccess="always"  />'
                    ).attr({'src':settings.src , wmode:"window" })
                    .width(settings.width)
                    .height(settings.height); //.html('<noembed>Your browser does not support video</noembed>'); //'Your browser does not support video');
           },

           //Create video AVI  
           createObj_AVI: function(settings){
			var obj = $('<object type="video/avi" data="'+settings.src+'" autoplay="false"> </object>')
				.append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="false" />')
				.append('<param name="autostart" value="0" />')
				.append('<param name="wmode" value="window" >');
//				.append('<param name="play" value="true" >');
				$(obj).width(settings.width).height(settings.height);
            $(obj).append( $($.aplayer.create_Embed(settings)));
            return obj;
           },

           //Create audio/wav
           createObj_WAV: function(settings){
           	   var obj;

               if($.browser.msie){
                    obj = $('<object data="'+settings.src+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"> </object>');
                }
                else{
					obj = $('<object type="audio/x-wav" data="'+settings.src+'" autoplay="false"> </object>');
                }
				$(obj).append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="false" />')
				.append('<param name="autostart" value="0" />');
				$(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width).height(settings.height);
			$(obj).append($($.aplayer.create_Embed(settings)));
            return obj;
           },

           // Create object audio/mp3
           createObj_MP3:function(settings){
			var obj = $('<object type="audio/x-mpeg" data="'+settings.src+'" autoplay="false"> </object>')
				.append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="false" />')
				.append('<param name="autostart" value="0" />');
				$(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width).height(settings.height);
			$(obj).append($($.aplayer.create_Embed(settings)));
            return obj;
           },

            // Create object QuickTime
            createObj_QuickTime:function(settings){
               var obj = $('<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"></object>');
               $(obj).append('<param name="controller" value="true" />')
               	.append('<param name="src" value="'+settings.src+'" />');
               $(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width).height(settings.height);
				$(obj).append($($.aplayer.create_Embed(settings)).attr({ "TYPE":"image/x-macpaint", 'Height':settings.height}));
               return obj;
            },

             // Create object SWF
            createObj_SWF:function(settings){
               var obj;

               if($.browser.msie){
                    obj = $('<object type="application/x-shockwave-flash data="'+settings.src+'" ></object>');
                }
                else{
                   obj = $('<object type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"></object>');
                }
               $(obj).append('<param name="movie" value="'+settings.src+'" />');
               $(obj).append('<param name="quality" value="high" >');
               $(obj).append('<param name="play" value="0" >');
               $(obj).append('<param name="loop" value="0" >');
               $(obj).append('<param name="wmode" value="window" >');
               $(obj).append('<param name="scale" value="showall" >');
               $(obj).append('<param name="menu" value="1" >')
				.append('<param name="play" value="false" >');
//               $(obj).append('<param name="devicefont" value="false" />');
//			    $(obj).append('<param name="salign" value="" />');
//				$(obj).append('<param name="allowScriptAccess" value="sameDomain" />');
				$(obj).width(settings.width)
                .height(settings.height);
               $(obj).append($($.aplayer.create_Embed(settings)).removeAttr('type') );
             //   $(obj).append('<div><h4>Content on this page requires a newer version of Adobe Flash Player.</h4><p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"alt="Get Adobe Flash player" width="112" height="33" /></a></p></div>');
               return obj;
            },

            // Create object WMV
            createObj_WMV:function(settings){
            	//  type="application/x-oleobject"
               var obj = $('<object  type="video/x-ms-asf" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"  url="'+settings.src+'" data="'+settings.src+'" ></object>');
               $(obj).append('<param name="url" value="'+settings.src+'" />'
               		).append('<param name="filename" value="'+settings.src+'" />'
               		).append('<param name="autostart" value="0">'
               		).append('<param name="uiMode" value="full" />'
               		).append('<param name="autosize" value="1">'
               		).append('<param name="playcount" value="1">');
			 $(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width)
                .height(settings.height);
			   $(obj).append('<embed type="audio/wav" play="false" wmode="window" PLUGINSPAGE="http://www.microsoft.com/windows/windowsmedia/download/" src="'+settings.src+'" style="width:'+settings.width+'px; height:'+settings.height+'px;" autostart="false" showcontrols="true"></embed>');
               return obj;
            },
            
            // Create object RTSP
            createObj_RTSP : function(settings){

            	var MediaURL = settings.src;
            	
            	var rtsptextrtsp = settings.aplayer_rtsp_php;
            	if(rtsptextrtsp==null){
            		rtsptextrtsp = 'aplayer_rtsp.php';
            	}
//            	rtsptextrtsp += '?path='+(settings.src).replace(/rtsp:\/\/.+\//i, '');
            	rtsptextrtsp += '?path='+settings.src;
            	rtsptextrtsp = (rtsptextrtsp).replace(/aplayer_rtsp\.php/i,'AxisMoviePoster.mov');
            	
            	var ShowAMCToolbar = (settings.controls == "on" || settings.controls == "true" || settings.controls == true)? true:false;
            	var DisplayWidth = settings.width;
            	var DisplayHeight = settings.height + (ShowAMCToolbar? 16 : 0 );
            	var Autostart = (settings.autostart == "on" || settings.autostart == "true" || settings.autostart == true)? true:false;

            	var output = $('<OBJECT CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab"></OBJECT>')
            		.height(DisplayHeight)
	           		.width(DisplayWidth)
	            	.append('<param name="src" value="'+rtsptextrtsp+'">')
	            	.append('<param name="autoplay" value="'+Autostart+'">')
	            	.append('<param name="controller" value="' + ShowAMCToolbar+ '">')
	            	.append('<param name="qtsrc" value="' + MediaURL + '">')
	            	.append($('<embed src="'+rtsptextrtsp+'"\
	            			qtsrc="' + MediaURL + '"\
	            			autoplay="'+Autostart+'"\
	            			controller="' + ShowAMCToolbar + '"\
	            			target="myself"\
	            			PLUGINSPAGE="http://www.apple.com/quicktime/download/"></embed>')
	            		.height(DisplayHeight)
	            		.width(DisplayWidth)
	            		.addClass($.aplayer.classElMedia)
	            	);
            	return output;
            },
            
            

			//Метод для использования HTML5 video
			showVideo:function(container, settings){
				var vid = document.createElement("video");
				$(vid).attr({
                    width:[settings.width],
					height:[settings.height],
					src:[settings.src],
					type:[settings.type],
					id:[$.aplayer.idElMedia+$.aplayer.aplayerNo],
					'class':$.aplayer.classElMedia
				}).appendTo(container);

				$.aplayer.setControls(container, settings);
			},
			//-----------------------------------

			//Mетод для использования HTML5 audio
			showAudio:function(container, settings){
				var audio = document.createElement("audio");
				$(audio).attr(
					{ width:[settings.width],
				//	height:[settings.height], //для аудио высоту не задаем
					src:[settings.src],
					type:[settings.type],
					id:[$.aplayer.idElMedia+$.aplayer.aplayerNo],
					'class':$.aplayer.classElMedia
				}).appendTo(container);

				$.aplayer.setControls(container, settings);
			},


			//------------------------ Установка контролов

            //Номер текущего при установке элемента
			aplayerNo:0,
            //Базовая часть идентификатора эл-та (без номера)
			idElMedia:'elMedia_',
			classElMedia:'ElMedia',
			classMediaCont:'MediaCont',
			idContainer:'aplayerNo_',
			idControlPanel:'controlPanel_',
			idPlay: 'cntrlPlay_',
			idPause: 'cntrlPause_',
			idSearch: 'cntrSearch_',
			idDuration: 'cntrDuration_',
			idCurrentTime:'cntrCurrentTime_',
			idStop:'cntrStop_',
			idSoundOff:'cntrSoundOff_',
			idSoundOn:'cntrSoundOn_',
			idVolume:'cntrVolume_',
			idScale:'cntrScale_',

			logo_error: 'error.jpg',
			logo_play:'logo_play.png',
			
			
			
        ControlBar:{
			//Control's images location
        	// controlsImg:'aplayerControls/',
        	//controlsImg:'gallery/img/aplayerControls/',
        	controlsImg:'../img/aplayerControls/',

			//Базовая разметка контролов
            panel:'<div style="cursor:default;"></div>',

			play: '<div > <img style="height:100%;" />  </div>',
            pause:'<div style="display:none;"> <img style="height:100%;" />  </div>',
			stop: '<div > <img style="height:100%;" /> </div>',

            search:'<div style="padding:1px;" ><div /></div>',

			duration:'<div>0:00:00</div>',
			currentTime:'<div>0:00:00</div>',
			soundOff:'<div><img style="height:100%;" /></div>',
			soundOn:'<div style="display:none;"><img style="height:100%; " /></div>',

			volume:'<div> <div class="divSlider" /> </div>',

			scale:'<div class="divScale"> <div class="scbtn reduce">-</div> <div class="scbtn increase">+</div> </div>',

			//Стиль для контролов
			ControlsStyle: {
				'cursor':'pointer',
			},
			
			
			/*Стиль элементов вывода времени и продолжительности */
			TimeFontStyle: {
				'height':'12px',
				'color':'silver',
				'font-family':'Verdana',
				'font-size':'10px',
				'font-weight':'bold',
				'text-align':'right',
				'overflow':'hidden',
	        },

 			/*Стили субКонтейнеров для элементов*/
			ControlsContainers: {
				'float':'left',
				'height':'25px',
	        },

	    	/*Стили кнопок масштаба*/
			Scale_btn: {
				'height':'22px',
				'width' :'22px',
			//	'padding':'2 0 0 0',
			//	'border':'1px solid black',
				'float':'left',
				'text-align':'center',
				'color':'silver',
				'font-family':'Verdana',
				'font-size':'16px',
				'font-weight':'bold',
				'margin':'0 1 0 0',
				
	        },

            /*Стили слайдеров*/
	        Search_handle: {
	            'top': '-2px',
	            'margin-left': '-1px',
                'z-index': '2',
	            'width': '2px',
    	        'height': '7px',
                'background-color': 'Darkred',
	            'cursor': 'default',
	            'border': '1px solid Darkred',
	        },
            Search_line: {
                'height':'5px',
                'padding-left':'5px',
				'width':'99.25%',
	            'border': '1px solid Blue',
	            'background-color': 'Lightblue',
	        },

	         Volume_handle: {
                'top': '0px',
	            'margin-left': '-1px',
                'z-index': '2',
	            'width': '2px',
    	        'height': '8px',
                'background-color': 'Darkred',
	            'cursor': 'default',
	            'border': '1px solid Darkred',

	        },
            Volume_line: {
            	'top':'5px',
            	'width':'60px',
                'height':'10px',
                'padding-left':'5px',
	            'border': '1px solid Blue',
	            'background-color': 'Lightblue',
	            'left':'2px',
	        },


			//Обработчики событий медиа элемента
			elMediaOnTimeUpdate:function(ElNum){
                if($('#'+$.aplayer.idSearch+ElNum).attr('isPlaying')!= undefined) return;
                var MediaElt = $('#'+$.aplayer.idElMedia+ElNum)[0];
                if(MediaElt==undefined) return;
				var tDur = MediaElt.currentTime;
				if( tDur >= $('#'+$.aplayer.idElMedia+ElNum)[0].duration)
				{
					$('#'+$.aplayer.idElMedia+ElNum).each(function(){
						this.pause();
						this.currentTime = 0;
						$.aplayer.ControlBar.elMediaOnCanPlay(ElNum);
					});
					return;
				}
				$('#'+$.aplayer.idSearch+ElNum).slider('value', tDur*10);
				Math.round(tDur);
				var tStr = $.aplayer.ControlBar.FormatTime(tDur);

                $('#'+$.aplayer.idCurrentTime+ElNum).html(tStr);
			},


			elMediaOnCanPlay:function(ElNum){
				var MediaElt = $('#'+$.aplayer.idElMedia+ElNum)[0];
				if(MediaElt==undefined) return;
				var tDur = Math.round(MediaElt.duration);
				var tStr = $.aplayer.ControlBar.FormatTime(tDur);

                $('#'+$.aplayer.idDuration+ElNum).html(tStr);
				$('#'+$.aplayer.idSearch+ElNum).slider({'max': tDur*10 });
				tDur = Math.round($('#'+$.aplayer.idElMedia+ElNum)[0].currentTime);
				tStr = $.aplayer.ControlBar.FormatTime(tDur);
				$('#'+$.aplayer.idCurrentTime+ElNum).html(tStr);
			},

			elMediaOnPlay:function(ElNum){
                var me = $('#'+$.aplayer.idElMedia+ElNum);
                me.volume = $('#'+$.aplayer.idVolume+ElNum).slider('value')/40;

				$('#'+$.aplayer.idPlay+ElNum).hide();
				$('#'+$.aplayer.idPause+ElNum).show();
			},
			elMediaOnPause:function(ElNum){
                if($('#'+$.aplayer.idSearch+ElNum).attr('isPlaying')!=undefined) return;
				$('#'+$.aplayer.idPlay+ElNum).show();
				$('#'+$.aplayer.idPause+ElNum).hide();
			},
			elMediaOnEnded:function(ElNum){
				$('#'+$.aplayer.idPlay+ElNum).show();
				$('#'+$.aplayer.idPause+ElNum).hide();
			},
			elDurationChanged:function(ElNum){
				var tDur = Math.round($('#'+$.aplayer.idElMedia+ElNum)[0].duration);
				var tStr = $.aplayer.ControlBar.FormatTime(tDur);
			},


            //Обработчики событий контролов
			soundOnClickHandler: function(ElNum){
               $('#'+$.aplayer.idElMedia+ElNum).each(function(){ this.muted=false; });
			   $('#'+$.aplayer.idSoundOff+ElNum).show();
			   $('#'+$.aplayer.idSoundOn+ElNum).hide();
            },

			soundOffClickHandler : function(ElNum){
               $('#'+$.aplayer.idElMedia+ElNum).each(function(){ this.muted=true; });
			   $('#'+$.aplayer.idSoundOff+ElNum).hide();
			   $('#'+$.aplayer.idSoundOn+ElNum).show();
            },

            playClickHandler : function(ElNum){
               $('#'+$.aplayer.idElMedia+ElNum).each(function(){ this.play(); });
            },

            pauseClickHandler : function(ElNum){
               $('#'+$.aplayer.idElMedia+ElNum).each(function(){ this.pause(); });
            },

			stopClickHandler : function(ElNum){
               $('#'+$.aplayer.idElMedia+ElNum).each(function(){
					this.pause();
					try{
					this.currentTime = 0;
					}catch(error){
						console.log(error.message);
					}
					$.aplayer.ControlBar.elMediaOnCanPlay(ElNum);
			   });
            },

            
            //Обработчик клика кнопок масштаба
            scaleClickHandler : function(e){
            	var btn = $(e.target);
				//плеер
				var plNo = $(e.target).parent().attr('id').replace($.aplayer.idScale, '');
				var cur_player = $('#'+$.aplayer.idContainer+plNo);
				var width = $(cur_player).width();
				var height = $(cur_player).height();
				//медиа элемент
				var me = $('#'+$.aplayer.idElMedia+plNo );
				var me_width = $(me).width();
				var me_height = $(me).height();
				
				// шаг увеличения размерa
				var wm = width*$.aplayer.scaleFactor;
				var hm = height*$.aplayer.scaleFactor;

				if($(btn).hasClass('increase')){
			 		//если +
					me_width+=wm;
					me_height+=hm;
			 	}else{
			 		//если -
					me_width-=wm;
					me_height-=hm;
			 	}
				
				//Изменение размеров медиа-элемента плеера 
				$(cur_player).parent().aplayerSetSizeMediaElt({
					'width':  me_width,
					'height': me_height
				} );
				
				if(me_width<=width){
					$(me).css({'left':'0px'});
				}
				if(me_height<=height){
					$(me).css({'top':'0px'});
				}
            },
            
            //Обработчик колеса мыши - изменение масштаба
            scaleWhelHandler : function(e, delta){
				//плеер
				var plNo = $(e.currentTarget).parent().attr('id').replace($.aplayer.idContainer, '');
				var cur_player = $('#'+$.aplayer.idContainer+plNo);
				var width = $(cur_player).width();
				var height = $(cur_player).height();
				
				//медиа элемент
				var me = $('#'+$.aplayer.idElMedia+plNo );
				var me_width = $(me).width();
				var me_height = $(me).height();
				
				// шаг увеличения размерa
				var wm = width*$.aplayer.scaleFactor;
				var hm = height*$.aplayer.scaleFactor;
				
				if (delta > 0) {
			 		//если +
					me_width+=wm;
					me_height+=hm;
				}else{
			 		//если -
					me_width-=wm;
					me_height-=hm;
			 	}
			 					
				//Изменение размеров медиа-элемента плеера 
				$(cur_player).parent().aplayerSetSizeMediaElt({
					'width':  me_width,
					'height': me_height
				} );
				
				if(me_width<=width){
					$(me).css({'left':'0px'});
				}
				if(me_height<=height){
					$(me).css({'top':'0px'});
				}
            },
            

			searchOnStartHandler : function(Elem){
                var me = $('#'+$.aplayer.idElMedia+$(Elem).attr('No'))[0];
                if(!me.paused) $(Elem).attr({'isPlaying':'true'});
			    else $(Elem).attr({'isPlaying':'false'});
				me.pause();
            },


			searchOnStopHandler : function(Elem){
                var me = $('#'+$.aplayer.idElMedia+$(Elem).attr('No'))[0];
				$(me).each(function(){
					var setTime = ($(Elem).slider('value'))/10;
					this.currentTime = setTime;
					var tStr = $.aplayer.ControlBar.FormatTime(setTime);
				$('#'+$.aplayer.idCurrentTime+$(Elem).attr('No')).html(tStr);
			   });
               $(me).each(function(){
					if($(Elem).attr('isPlaying')=='true')me.play();
					$(Elem).removeAttr('isPlaying');
			   });
            },

			searchOnSlideHandler : function(Elem){
                var me = $('#'+$.aplayer.idElMedia+$(Elem).attr('No'))[0];
				$(me).each(function(){
					var setTime = ($(Elem).slider('value'))/10;
					this.currentTime = setTime;
					var tStr = $.aplayer.ControlBar.FormatTime(setTime);
				$('#'+$.aplayer.idCurrentTime+$(Elem).attr('No')).html(tStr);
			   });
            },

            //формирование строки времени
            FormatTime : function(Seconds){
                return  (Math.round(Seconds/(60*60)))+':'+((Math.round(
						Seconds/60)%60)<10? '0'+(Math.round(Seconds/60)%60):(Math.round(
						Seconds/60)%60))+':'+(Math.round(Seconds%60)<10? '0'+Math.round(
						Seconds%60):Math.round(Seconds%60));
            },

			volumeSlideHandler : function(Elem){
                var me = $('#'+$.aplayer.idElMedia+$(Elem).attr('No'))[0];
                me.volume = $(Elem).slider('value')/40;
            },

            volumeStopHandler : function(Elem){
                var me = $('#'+$.aplayer.idElMedia+$(Elem).attr('No'))[0];
                me.volume = $(Elem).slider('value')/40;
                $(Elem).hide();
            }
        },
        
        

		//Установка контролов
		setControls : function(container, settings)
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
    };



}