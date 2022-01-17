function (elementData) {
    var element, previous=null, next=null;
    next=this.first;
    element=new LinkedListElement(elementData,previous,next,storeMatrixObject);
    if (this.length!=0) this.first.previous=element;
    this.first=element;
    if (this.length==0) this.last=element;
    this.length++;
  }