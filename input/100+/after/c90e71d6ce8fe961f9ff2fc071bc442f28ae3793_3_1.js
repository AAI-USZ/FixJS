function(elementData) {
    var element=new LinkedListElement(elementData,this.last,null,this);
    if (this.length!=0) {
      if (this.last!=null) {
        this.last.next=element;
      }
      else {
        postMortemDebug="Arrived in a cell of length "+this.length+" that has a null last and first="+this.first;
        backtrace();
      }
    }
    this.last=element;
    if (this.length==0) this.first=element;
    this.length++;
    return element;
  }