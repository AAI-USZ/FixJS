function(){
      var tb = kbtoolbar.offsetHeight;
      var lh = this.position.left?this.position.left.offsetHeight:null;
      var rh = this.position.left?this.position.right.offsetHeight:null;
      var sh = !lh && !rh?$('.kb-wrapper > .kb-section').outerHeight():null;
      console.log(this.html.offsetHeight + ':' +(sh+lh+tb) + ' or ' + (sh+rh+tb));
      this.html.style.height = tb + (lh>rh?lh:(lh||rh?rh:sh))+'px';
    }