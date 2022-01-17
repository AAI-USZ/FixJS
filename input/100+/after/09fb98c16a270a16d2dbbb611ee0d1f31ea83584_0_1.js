function(){
    var bw=parseInt(document.body.clientWidth);
    var Iw=parseInt(this.img.width);
    if(Iw<bw){
      this.hidectx.drawImage(this.img,0,0);
    }else{
      var ratio=bw*0.8/Iw;
      var canvas_width = this.img.width * ratio;
      var canvas_height = this.img.height * ratio;
      this.hidectx.drawImage(this.img, 0, 0, this.hidepad.width, this.hidepad.height, 0, 0,canvas_width, canvas_height);
    }
  }