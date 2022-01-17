function drawing(imgid){
  
       var image;
	   var atag;
	   var id = imgid;
	   no = 0;
	   for(var i = 0 ; i < 12 ; i++){
	   atag  = document.getElementById('a'+(i+1));
	   image = document.getElementById('img'+(i+1));
    // サムネイル画像のURL
		if(imgresults[id] !== null){
	   image.src = imgresults[id][2];
	   atag.href = imgresults[id++][1];
	   console.log(atag.href);
	   }
	   }
	   console.log("page no:"+page);
  }