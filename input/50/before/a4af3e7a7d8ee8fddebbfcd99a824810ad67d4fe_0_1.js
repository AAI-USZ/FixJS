function(){
		newdir = fs.add( cwd.join(''), prompt("New folder name"), 'dir' );
		newdir && addIcon(newdir);
	}