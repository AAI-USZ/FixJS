function(dndEvent) {
  if (dndEvent.dragObject) {
    dndEvent.dragObject.parentNode.removeChild(dndEvent.dragObject) ;
  }
  try {
    
    if (this.foundTargetObjectCatch) {
      this.foundTargetObjectCatch.style[eXo.cs.TableDnD.scKey] = this.foundTargetObjectCatchStyle ;
    }
    this.foundTargetObjectCatch = dndEvent.foundTargetObject ;
    if (this.foundTargetObjectCatch) {
      var tableMan = eXo.cs.TableMan ;    
      var x1 = tableMan.cellIndexOf(this.foundTargetObjectCatch) ;
      var x2 = tableMan.cellIndexOf(dndEvent.clickObject) ;
      tableMan.swapColumn(x1, x2) ;
    }
  } catch(e) {}
  eXo.core.DragDrop.destroy() ;
  return true ;
}