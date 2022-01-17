function get_cam_alt_url(alt_src, $cam_nr, append_abenc){
   	   var url = alt_src;
   	   if(url==null)return null;
   	   reg = /\?camera=\d*/;
   	  if(!reg.test(url)){
   		 url += "?camera="+$cam_nr;  
   	   }
   	   if (append_abenc && user_info_USER.length>0 ) {
   	      url += '&ab='+base64_encode_user_info_USER+':'+PHP_AUTH_PW;
   	   }
   	   return url;
   }