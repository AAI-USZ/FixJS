function(b){
    if(re.is(b)){
      this.attr({_image:b, sizeX:b.width, sizeY:b.height});
  		return this;
    }
    return this._image;
	}