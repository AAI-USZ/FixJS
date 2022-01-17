function change_layout(mon_nr){
   	//Если был включен режим - 1 камера на весь экран
   	FS_WIN_DIV = null;
   	//целевая раскладка
   	var layout=null;
   	//кол-во элементов для отображения камер в целевой раскладке
   	var wins_nr = 0;
   	//структура целевой раскладки
   	var l_defs = null;
   	//Пропорции
   	var AspectRatio;

   	
   	cur_layout = mon_nr;
   	
   	//Устанавливаем целевую раскладку
   	$.each(layouts_list, function(i, value){
   		if(value['MON_NR']==mon_nr){
   			layout = value;
   			return;
   		}
   	});
   	
   	//Чистим канвас
   	$('#canvas').empty();

   	l_defs = layouts_defs[layout['MON_TYPE']];

   	//кол-во элементов для отображения камер
    wins_nr = l_defs[0];

   	//пересоздаем объект текущей раскладки
   	WINS_DEF = new MakeArray(wins_nr);

   	//размеры камер
   	major_win_cam_geo = null;
   	
   	layout_wins = $.parseJSON(layout['WINS']);
   	active_cams_srcs = new Array();
   	
   	//и перезаполняем новыми значениями
   	$.each(WINS_DEF, function(i, value){
   		if(layout_wins[i]==null || GCP_cams_params[layout_wins[i][0]]==null ) return;
   		//Параметры текущего типа раскладки
   		var l_wins = l_defs[3][i];
   		var cam_nr = layout_wins[i][0];
   		//установка url камеры
   		active_cams_srcs[i] = new Array();
   		var cam_url = '';
   		switch(layout_wins[i][1]){
   		case '0':
   		case '1': //avregd
   			cam_url =  get_cam_http_url(conf, cam_nr,'mjpeg', true);
   	   		active_cams_srcs[i]['type']='avregd';
   	   		active_cams_srcs[i]['cell']=cam_url;
   	   		active_cams_srcs[i]['fs']=cam_url;
   	   		break;
   		case '2': //alt 1
   			cam_url = get_cam_alt_url(GCP_cams_params[layout_wins[i][0]]['cell_url_alt_1'], true);
   	   		active_cams_srcs[i]['type']='alt_1';
   	   		active_cams_srcs[i]['cell']=cam_url;
   	   		active_cams_srcs[i]['fs']=get_cam_alt_url(GCP_cams_params[cam_nr]['fs_url_alt_1'], true);
   			break;
   		case '3': //alt 2
   			cam_url =get_cam_alt_url(GCP_cams_params[layout_wins[i][0]]['cell_url_alt_2'], true);
   	   		active_cams_srcs[i]['type']='alt_1';
   	   		active_cams_srcs[i]['cell']=cam_url;
   	   		active_cams_srcs[i]['fs']= get_cam_alt_url(GCP_cams_params[cam_nr]['fs_url_alt_2'], true);
   			break;

//   		case '1': //avregd
//   			cam_url =  get_cam_http_url(conf, cam_nr,'mjpeg', false );
//   	   		active_cams_srcs[i]['type']='avregd';
//   	   		active_cams_srcs[i]['cell']=cam_url;
//   	   		active_cams_srcs[i]['fs']=cam_url;
//   	   		break;
//   		case '2': //alt 1
//   			cam_url = GCP_cams_params[layout_wins[i][0]]['cell_url_alt_1'];
//   	   		active_cams_srcs[i]['type']='alt_1';
//   	   		active_cams_srcs[i]['cell']=cam_url;
//   	   		active_cams_srcs[i]['fs']=GCP_cams_params[cam_nr]['fs_url_alt_1'];
//   			break;
//   		case '3': //alt 2
//   			cam_url =GCP_cams_params[layout_wins[i][0]]['cell_url_alt_2'];
//   	   		active_cams_srcs[i]['type']='alt_1';
//   	   		active_cams_srcs[i]['cell']=cam_url;
//   	   		active_cams_srcs[i]['fs']=GCP_cams_params[cam_nr]['fs_url_alt_2'];
//   			break;
   		}
   		
   		var wxh = GCP_cams_params[ layout_wins[i][0] ]['geometry'];
   		var cam_width = parseInt(wxh.slice(0, wxh.indexOf('x')));
   		var cam_height = parseInt(wxh.slice(wxh.indexOf('x')+1));
   		if(cam_width==null || cam_width==0) cam_width = 640;
   		if(cam_height==null || cam_height==0) cam_height = 480;
   		//Возможно неверно интерпретировано: if(!empty($GCP_cams_params[$cam_nr]['Hx2'])) $height*=2;
   		if( GCP_cams_params[layout_wins[i][0]]['Hx2']!=0 && GCP_cams_params[layout_wins[i][0]]['Hx2']!=null ) cam_height *=2;
   		
   		if (major_win_cam_geo == null /* || major_win_nr === win_nr */ )
   		      major_win_cam_geo = new Array(cam_width, cam_height);
   		
   		var net_cam_host=null;
   		if (operator_user && ( GCP_cams_params[layout_wins[i][0]]['cam_type'] == 'netcam' ) ){
   			      net_cam_host = GCP_cams_params[layout_wins[i][0]]['InetCam_IP'];
   		}
   	   else{
   		   net_cam_host = null;
   	   }
   		//устанавливаем параметры и камеру для ячейки
   		WINS_DEF[i] = {
   				row : l_wins[0],
   			    col : l_wins[1],
   			    rowspan : l_wins[2],
   			    colspan : l_wins[3],
   			    cam: {
   			    	nr:   cam_nr,
   			        name: GCP_cams_params[layout_wins[i][0]]['text_left'] ,
   			        url:  cam_url, 
   			        orig_w: cam_width,
   			        orig_h: cam_height,
   			        netcam_host: net_cam_host
   			    }
   		};
   	});
   	
   	//Вывод в шапке элемента отображения камеры - названия камеры
   	PrintCamNames = (layout['PRINT_CAM_NAME']=='t' || layout['PRINT_CAM_NAME']==true)? true : false;
   	NAME_DIV_H = PrintCamNames?20:0;
   	
   	//Установка пропорций
   	AspectRatio = layout['PROPORTION'];
   	
   	//если растягивается на весь экран
   	if(AspectRatio=='fs' ) {
   		   CamsAspectRatio = 'fs';
   	} //если сохраняем пропорции
   	else {
   		var rex = new RegExp("[0-9]+", "g");
   		if (AspectRatio=='calc'){
   		      ar = calcAspectForGeo(major_win_cam_geo[0], major_win_cam_geo[1]);
   		      CamsAspectRatio = { num : ar[0] , den : ar[1] };
   		   //Если пропропорции заданы в БД
   		   } else if ( rex.test(AspectRatio) ) {
   			   var m = AspectRatio.match(rex); 
   			   CamsAspectRatio = { 'num': m[0], 'den': m[1] };
   		   }
   		   else
   		      CamsAspectRatio = 'fs';
   		}
   	
   	WINS_NR = wins_nr ;
   	ROWS_NR = l_defs[1];
   	COLS_NR = l_defs[2];
   	
   	fill_canvas();
   	
   }