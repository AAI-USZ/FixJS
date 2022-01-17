function(elementData) {
    var element=new LinkedListElement(elementData,this.last,null);
    if (this.length!=0) this.last.next=element;
    this.last=element;
    if (this.length==0) this.first=element;
    this.length++;
    return element;
  }