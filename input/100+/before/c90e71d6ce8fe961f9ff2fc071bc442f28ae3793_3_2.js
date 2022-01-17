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
      //FIXME Error : pretty much means we are trying to remove an object that is not part of the list. Happens when there is too much overlap
      if (linkedlistelement.next==null || linkedlistelement.previous==null) backtrace();
      else {
        linkedlistelement.next.previous=linkedlistelement.previous;
        linkedlistelement.previous.next=linkedlistelement.next;
      }
    }
    this.length--;
  }