function(){
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