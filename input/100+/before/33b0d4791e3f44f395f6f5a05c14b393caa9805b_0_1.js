function RequestTile(id, added,by,title, description, likes,tags,cover,track1,track2,track3,track4,track5){
		// 5 tracks is just quick(not even that quick) hack .. should use array like for tags
		this.id = id;
		this.title= title;
		this.by=by;
		this.added=added;
		this.description= description;
		this.likes = likes;
		this.tags = new Array();
		this.tags[0]= tags[0];
		this.tags[1]= tags[1];
		this.tags[2]= tags[2];
		this.cover = cover;
		this.track1=track1;
		this.track2=track2;
		this.track3=track3;
		this.track4=track4;
		this.track5=track5;
		this.wHTML = wHTML;
		//this.respond = respond;
		this.render = render;
		}