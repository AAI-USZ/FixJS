function(origin_dir,target_dir,callback){
	fs.rename(origin_dir,target_dir,function(err){
		callback(err);
	})
}