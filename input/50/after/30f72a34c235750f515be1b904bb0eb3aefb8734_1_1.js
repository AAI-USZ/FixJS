function next(){
		var key=keyArr.shift();
		if(key!==undefined){
			fs.readFile('../style/jx.'+key+'.css',callback);
		}else{
			res.end();
		}
	}