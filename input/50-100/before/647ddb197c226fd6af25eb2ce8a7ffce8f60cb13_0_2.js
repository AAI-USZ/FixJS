function(){
		var bb=new BlobBuilder;
		bb.append(download);
		var filesaver=saveAs(bb.getBlob("text/html;charset=utf-8"),board.name+"_"+board.formatDate()('now')+".html");
	}