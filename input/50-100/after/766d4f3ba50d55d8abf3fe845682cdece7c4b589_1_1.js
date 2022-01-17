function(chat){
	this.chat=chat;	//ChatClientオブジェクト
	this.lastid = this.sessionid = sessionStorage.sessionid || void 0;
	//子供たち(ports)
	this.children=[];
	//終了時に子どもも消す
	window.addEventListener("unload",function(ev){
		var c=this.children;
		for(var i=0,l=c.length;i<l;i++){
			c[i].window.close();
		}
	}.bind(this),false);
}