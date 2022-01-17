function(i, value){
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
   			cam_url = get_cam_alt_url(GCP_cams_params[layout_wins[i][0]]['cell_url_alt_1'], cam_nr, true);
   	   		active_cams_srcs[i]['type']='alt_1';
   	   		active_cams_srcs[i]['cell']=cam_url;
   	   		active_cams_srcs[i]['fs']=get_cam_alt_url(GCP_cams_params[cam_nr]['fs_url_alt_1'],cam_nr, true);
   			break;
   		case '3': //alt 2
   			cam_url =get_cam_alt_url(GCP_cams_params[layout_wins[i][0]]['cell_url_alt_2'], cam_nr, true);
   	   		active_cams_srcs[i]['type']='alt_1';
   	   		active_cams_srcs[i]['cell']=cam_url;
   	   		active_cams_srcs[i]['fs']= get_cam_alt_url(GCP_cams_params[cam_nr]['fs_url_alt_2'], cam_nr, true);
   			break;
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
   	}