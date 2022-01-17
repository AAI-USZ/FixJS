function LinkedListElement(elementData,previous,next,parent) {
  this.data=elementData;
  this.next=next;
  this.previous=previous;
  this.parent=parent;
  this.deleted=false;
}