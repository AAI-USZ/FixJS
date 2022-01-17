function img_click(clicked_div) {
	
//   var pl_cont = $('img',clicked_div);
	var pl_cont = $('.pl_cont',clicked_div);
	
   var tmp_div;
   var clicked_div_jq = $(clicked_div);
   var win_geo; 
   var i;
   //номер ячейки
   var win_nr = parseInt(($(clicked_div).attr('id')).match(/\d+/gi));

   //устанавливаемый src
   var current_src=null;
   
   //если номер камеры не определен
   if(win_nr == null ) return;
   
   if ( FS_WIN_DIV ) {
      // current - fullscreen

	      //меняем на источник для ячейки
	      if (active_cams_srcs[win_nr]['type']!='avregd'){
	    	  if(active_cams_srcs[win_nr]['cell']!=null || active_cams_srcs[win_nr]['cell']!='')
	    		  current_src = get_cam_alt_url(active_cams_srcs[win_nr]['cell'], win_nr, true) ;
	      }
	   
	   
      if ( WIN_DIV_W == undefined ) {
         //в режиме FS был ресайз CANVAS'a
         change_wins_geo();
         
		   //если в режиме просмотра одной камеры происходил ресайз окна браузера
         if ( MSIE ){
        	 if(current_src!=null) $('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src ) ;
          }else{
        	  if(current_src!=null) $('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src );
          }
         
      } else {
   
    	  //востанавливаем исходные размеры отображения камеры
     	 var border_w = clicked_div.offsetWidth - clicked_div.clientWidth;
          var border_h = clicked_div.offsetHeight - clicked_div.clientHeight;
          $(clicked_div)
          .width(WIN_DIV_W + border_w )
          .height(WIN_DIV_H + border_h);
          
          $('.pl_cont',clicked_div_jq)
 	      .width(IMG_IN_DIV_W)
 	      .height(IMG_IN_DIV_H);

          if ( MSIE ){
      		$('.pl_cont',clicked_div_jq)
      		.aplayerSetSize({'height':IMG_IN_DIV_H, 'width': IMG_IN_DIV_W});
      		if(current_src!=null)  $('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src ) ;
          }else{
         	 $('.pl_cont',clicked_div_jq)
         	 .aplayerResizeToParent();
         	if(current_src!=null) $('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src );
          }
          
        $(clicked_div).css({'left': WIN_DIV_LEFT + 'px', 'top': WIN_DIV_TOP + 'px' });
         
      }

      for (i=0;i<WIN_DIVS.length;i++) {
          tmp_div=WIN_DIVS[i];
          if ( tmp_div == clicked_div ){
         	 continue;
          }else{
         	 //отображаем остальные камеры
         	 $(tmp_div).show();
          }
       }
      
  	//меняем кнопку на Развернуть
      $('img.fs_tc', '#cell_header_'+win_nr)
      .height($('#cell_header_'+win_nr).height()-4)
      .attr({
      	'src': imgs['fs'].src,
      	'title':'Развернуть',
      });

      
       FS_WIN_DIV = undefined;
      
   } else {
	 //Если включен режим - просмотра камер в раскладке
      // current - NO fullscreen
	      for (i=0;i<WIN_DIVS.length;i++) {
	          tmp_div=WIN_DIVS[i];
	          if(tmp_div == clicked_div ){
	         	 continue;
	          }else{
	         	 //прячем остальные камеры
	         	 $(tmp_div).hide();
	          }
	       }

	  WIN_DIV_H = clicked_div.clientHeight;
      WIN_DIV_W = clicked_div.clientWidth;
      WIN_DIV_LEFT=clicked_div.offsetLeft;
      WIN_DIV_TOP=clicked_div.offsetTop;
      IMG_IN_DIV_W=pl_cont.width();
      IMG_IN_DIV_H=pl_cont.height();

      NAME_DIV_H = $('#cell_header_'+win_nr, clicked_div_jq).height();
      if(NAME_DIV_H==null)NAME_DIV_H=0;
      
      win_geo = new calc_win_geo(CANVAS_W, CANVAS_H, CamsAspectRatio, 1, 1, 1);

      clicked_div_jq.css('top',  calc_win_top (win_geo, 0));
      clicked_div_jq.css('left', calc_win_left(win_geo, 0));
  
      $('.pl_cont',clicked_div_jq)
	      .width(win_geo.cam_w+CORRECT_W)
	      .height(win_geo.cam_h+CORRECT_H);

      //меняем на источник для ячейки
      if (active_cams_srcs[win_nr]['type']!='avregd'){
    	  if(active_cams_srcs[win_nr]['fs']!=null || active_cams_srcs[win_nr]['fs']!='')
    		  current_src = get_cam_alt_url(active_cams_srcs[win_nr]['fs'], win_nr ,true) ;
      }

    	if ( MSIE ){
    		$(clicked_div_jq).width(win_geo.win_w+CORRECT_W).height(win_geo.win_h+CORRECT_H);
    		$('.pl_cont',clicked_div_jq)
    		.aplayerSetSize({'height':win_geo.cam_h+CORRECT_H, 'width': win_geo.cam_w+CORRECT_W});
    		if(current_src!=null) {
    			$('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src );
    		}
        }else{
        	$(clicked_div_jq).width(win_geo.win_w).height(win_geo.win_h);
        	$('.pl_cont',clicked_div_jq)
        	.aplayerResizeToParent();
        	if(current_src!=null){
        		$('.pl_cont',clicked_div_jq).aplayerSetMjpegSrc( current_src );
        	}
        }
    	
    	//меняем кнопку на Свернуть
        $('img.fs_tc', '#cell_header_'+win_nr)
        .height($('#cell_header_'+win_nr).height()-4)
        .attr({
        	'src': imgs['tc'].src,
        	'title':'Свернуть'
        });
 
        
        
      FS_WIN_DIV = clicked_div;
      
   }
   
   //Устанавливаем текущий масштаб
   var aplayer_id=$('.aplayer',pl_cont).attr('id');
   
   if( controls_handlers.original_size[aplayer_id]!=null && controls_handlers.original_size[aplayer_id] ){
	   $('#'+aplayer_id).parent().aplayerMediaSetSrcSizes();
   }
   
   var scl = $.aplayer.scale[aplayer_id];
   $.aplayer.scale[aplayer_id]=0;
   if(scl>0){
	   for(i=0;i<scl;i++){
		   $.aplayer.zoomIn(aplayer_id);
	   }
   }
   else if(scl<0){
	   scl*=-1;
	   for(i=0;i<scl;i++){
		   $.aplayer.zoomOut(aplayer_id);
	   }
   }

   
}