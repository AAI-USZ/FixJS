function() {
    if (this.scroller) {
      var snapshot = {
        y : this.scroller.y,
        maxScrollY : this.scroller.maxScrollY,
        scrollerH : this.scroller.scrollerH,
        wrapperH : this.scroller.wrapperH
      };
      this.scroller.refresh();
      console.log(this.scroller);
      this.scroller.scrollTo(snapshot.x, snapshot.y);
    }
  }