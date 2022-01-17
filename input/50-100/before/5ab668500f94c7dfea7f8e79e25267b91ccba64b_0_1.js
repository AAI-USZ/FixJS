function(ctx) {
    var p = player.position();
    var c = this.camera();
    if( p.y < 0 ) {
      this.camera({x: 0, y: p.y - 7 });
    }
    
  }