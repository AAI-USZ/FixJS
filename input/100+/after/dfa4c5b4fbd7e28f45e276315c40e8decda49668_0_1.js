function(i,item){
    			
    			    //create image urls
    			    var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_' + options.image_size + '.jpg';
    			    var thumbURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_t.jpg';
    			    var photoLink = "http://www.flickr.com/photos/" + (data.photoset ? data.photoset.owner : item.owner) + "/" + item.id + "/";
    			   	
    			    if (i == 0){
    			    	options.slides.splice(0,1,{ image : photoURL, thumb : thumbURL, title : item.title , url : photoLink });
    			    }else{
    			    	options.slides.push({ image : photoURL, thumb : thumbURL, title : item.title , url : photoLink });
    			    }
    			    
    			 }