function pv_previous() {
    var songElements = SubListView.view.children;

    if (this.currentIndex <= 0)
      return;

    this.currentIndex--;

    this.play(songElements[this.currentIndex].firstElementChild);
  }