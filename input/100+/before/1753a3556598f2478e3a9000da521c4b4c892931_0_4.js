function(){
      var tb = kbtoolbar.offsetHeight;
      var lh = this.position.left?this.position.left.offsetHeight:0;
      var rh = this.position.left?this.position.right.offsetHeight:0;
      var ch = this.position.center? this.position.center.offsetHeight:0;
      var sh = !lh && !rh?$('.kb-wrapper > .kb-section').outerHeight():0;
      this.colWrapper.style.height = (lh>rh?lh:rh) + 'px';
      console.log(this.html.offsetHeight + ':' +(sh+lh+tb) + ' or ' + (sh+rh+tb));
      this.html.style.height = tb + ((lh>rh?lh:rh)+sh+ch)+'px';
    }