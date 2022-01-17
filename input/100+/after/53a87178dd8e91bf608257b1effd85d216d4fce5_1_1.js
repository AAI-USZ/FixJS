function(options){
	Hook.call(this, options);
	var self = this;
	
	if(!self.path){
		self.path = './';
	}
	
	self.path = path.resolve(self.path);
	
	fs.watchFile(self.path, fileEventListener);
	
	self.emit('async-fs::file::watching', self.path);
	
	function fileEventListener(curr, prev) {
    	self.emit('async-fs::file::access', {path: self.path, curr: curr, prev: prev});
      
	    if (curr.nlink === 0) {
	      self.emit('async-fs::file::destroy', {path: self.path, curr: curr, prev: prev});
	    }
    	//console.log(self.fileListCache);
    	if (+curr.mtime != +prev.mtime) {  
      		if (curr.isDirectory() && prev.isDirectory()) {
        		if (curr.nlink > prev.nlink) {
        			if(self.fileListCache){
        				fs.readdir(self.path, function(err, files) {
        					var addedFiles = _.difference(files, self.fileListCache);
        					_.each(addedFiles, function(filename){
        						self.emit('async-fs::file::add', {path: self.path+'/'+filename, curr: curr, prev: prev});
        					});
        				});
        			}else{
        				self.emit('async-fs::file::add', {path: self.path, curr: curr, prev: prev});	
        			}
        		} else if (curr.nlink < prev.nlink) {
        			if(curr.isDirectory()){
        				fs.readdir(self.path, function(err, files) {
        					self.fileListCache = files;
        					self.emit('async-fs::file::delete', {path: self.path, curr: curr, prev: prev});
        				});
        			}else{
        				self.emit('async-fs::file::delete', {path: self.path, curr: curr, prev: prev});	
        			}
        		}
      		}
      
      		self.emit('async-fs::file::change', {path: self.path, curr: curr, prev: prev});
    	}
  	}
}