function(result){
	    
	    var override = {
	        og_image: conf.app.host + "/images/" + result[0].path +"."+ result[0].ext,
	        og_url: conf.app.host + "/photo/" + result[0]._id
	    };
	    
		res.render('imageDetails', {
		    locals:{
                image: result,
                config: mergeStruct(conf.app, override)
		}});
	}