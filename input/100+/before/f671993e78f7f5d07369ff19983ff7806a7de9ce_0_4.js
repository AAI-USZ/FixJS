function(){
      var tb = kbtoolbar.offsetHeight;
      var lh = this.position.left.offsetHeight;
      var rh = this.position.right.offsetHeight;
      console.log(this.html.offsetHeight + ':' +(lh+tb) + ' or ' + (rh+tb));
      this.html.style.height = tb + (lh>rh?lh:rh)+'px';
    }