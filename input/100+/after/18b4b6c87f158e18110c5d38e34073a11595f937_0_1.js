function drawing(imgid,flag){
  
       var image;
	   var atag;
	   var id = imgid;
	   
	   console.log("flag:"+flag);
	   
	   if(flag==0){
			no = 0;
	   }
	   
	   for(var i = 0 ; i < 12 ; i++){
	   atag  = document.getElementById('a'+(i+1));
	   image = document.getElementById('img'+(i+1));
    // サムネイル画像のURL
		if(imgresults[id]){
	   image.src = imgresults[id][2];
	   atag.href = imgresults[id++][1];
	   console.log(atag.href);
	   }
	   }
	   console.log("page no:"+page);
  }