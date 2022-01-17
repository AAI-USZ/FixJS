function fetch_photos(elem){
  if(window.monitter['timer']==false){
      //alert("false");
      setTimeout(function(){fetch_photos(elem)},2000);
      return false;
  }
  elem=$(elem);
  user=elem.attr('user');
  album=elem.attr('album');
  if(album!=window.monitter['text-'+album]){
    window.monitter['last_id'+album]=0;
    window.monitter['text-'+album]=album;
    window.monitter['count-'+album]=12;;
  }
  if(window.monitter['count-'+album]>10){
    //elem.prepend('<div class="tweet"><img src="http://monitter.com/widget/favicon.gif" align="absmiddle" />real time twitter by: <a href="http://monitter.com" target="_blank">monitter.com</a></div>');
    window.monitter['count-'+album]=0;
  }

  // Picasa Web Album API: https://picasaweb.google.com/data/feed/api/user/
  var url="https://picasaweb.google.com/data/feed/api/user/"+user+"/albumid/"+album+"?alt=json&limit="+window.monitter['count-'+album]+"&callback=?";

  $.getJSON(url,function(json){
      $('div.tweet:gt('+window.monitter['limit']+')',elem).each(function(){$(this).fadeOut('slow')});
      $(json.feed.entry).each(function(){
          //feed.entry[{content:{src:hoge}}]
          if($('#tw'+this.gphoto$id.$t,elem).length==0){
            window.monitter['cotunt-'+album]++;
            //var thedate=new Date(Date.parse(this.created_at));
	    var thedate = new Date();
	    var thedatestr = thedate.getHours()+':'+thedate.getMinutes();
            //var thedatestr=thedate.getHours()+':'+thedate.getMinutes();
            var divstr='<div id="tw'+this.gphoto$id.$t+'" class="tweet"><img width="512" height="384" src="'+this.content.src+'" ><p class="text">hogehoge<br />&nbsp;<b><a href="google.com" target="_blank">user</a></b> &nbsp;-&nbsp;<b>'+thedatestr+'</b></p></div>';
           window.monitter['last_id'+album]=this.gphoto$id.$t;
            elem.prepend(divstr);
            $('#tw'+this.gphoto$id.$t,elem).hide();
            $('#tw'+this.gphoto$id.$t+' img',elem).hide();
            $('#tw'+this.gphoto$id.$t+' img',elem).fadeIn(4000);
            $('#tw'+this.gphoto$id.$t,elem).fadeIn('slow');
          }
       }
      );
      album=escape(album);
      rrp=1;
      setTimeout(function(){fetch_photos(elem)},2000);
   }
  );
  return(false);
}