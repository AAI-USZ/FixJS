function(linkedlistelement) {
    if (linkedlistelement==this.first && linkedlistelement==this.last) {
      this.first=null;
      this.last=null;
    } else if (linkedlistelement==this.first) {
      this.first=linkedlistelement.next;
      this.first.previous=null;
    }
    else if (linkedlistelement==this.last) {
      this.last=linkedlistelement.previous;
      this.last.next=null;
    }
    else {
      //Error : pretty much means we are trying to remove an object that is not part of the list
      if (linkedlistelement.next==null || linkedlistelement.previous==null) backtrace();
      linkedlistelement.next.previous=linkedlistelement.previous;
      linkedlistelement.previous.next=linkedlistelement.next;
    }
    this.length--;
  }