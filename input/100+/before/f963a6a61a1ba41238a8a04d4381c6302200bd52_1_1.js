function img_mouseover(cell, win_nr) {
	
   if ( WINS_DEF[win_nr] == undefined ) return;

   var img_jq = $('.pl_cont',cell);

   var cam_nr = WINS_DEF[win_nr].cam.nr;
   var orig_w = WINS_DEF[win_nr].cam.orig_w;
   var orig_h = WINS_DEF[win_nr].cam.orig_h;
   var url = WINS_DEF[win_nr].cam.url;

   hint = '<table style="font-weight:bold;" cellspacing="0" border="0" cellpadding="1"><tbody><tr>\n' +
      '<td align="right">Камера:<\/td>\n' +
      '<td>#'+cam_nr+' ' +  WINS_DEF[win_nr].cam.name + '<\/td>\n' +
      '<\/tr><tr>\n' +
      '<td align="right">URL:<\/td>\n' +
      '<td>'+url+'<\/td>\n' +
      '<\/tr><tr>\n' +
      '<td align="right">Размер:<\/td>\n' +
      '<td>'+orig_w+'x'+orig_h+' (исходный), ' + img_jq.width()+'x'+img_jq.height()+' (на экране)<\/td>\n' +
      '<\/tr><\/tbody><\/table>\n';

   ddrivetip();
}