function next(){
		var key=keyArr.shift();
		if(key){
			if(/\.css$/.test(key)){ //js-ed css file
				fs.readFile('../style/jx.'+key,cssCallback);
			}else{
				fs.readFile('../src/jx.'+key+'.js',jsCallback);
			}
		}else{
			res.end();
		}
	}