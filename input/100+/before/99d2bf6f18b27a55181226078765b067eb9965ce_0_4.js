function(e, delta){
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
            }