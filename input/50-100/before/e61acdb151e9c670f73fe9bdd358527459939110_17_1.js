function() { 
    	var src = $(this).attr("src");
    	var src = src.split('.');
    	//alert(src[0]);
        $(".img_sorce").attr("src", src[0]+"."+src[1]+".600x600_q85_crop.jpg");
        $(".img_sorce").parent("a").attr("href", src[0]+"."+src[1])
    }