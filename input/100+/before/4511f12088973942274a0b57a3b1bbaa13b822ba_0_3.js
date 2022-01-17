function (viewing) {
  var turnOn, turnOff;
  if (viewing != 'hide' && this.viewingState == 'hide') {
    this.showAnnotations();
  }
  this.viewingState = viewing;
  if (viewing == 'annotate') {
    this.turnOn(this.annotateButton);
    this.turnOff(this.viewButton);
    this.turnOff(this.hideButton, 'Hide');
    document.addEventListener('click', this.clickListener, true);
    document.addEventListener('selectionchange', this.changeListener, true);
  } else if (viewing == 'view') {
    this.turnOn(this.viewButton);
    this.turnOff(this.annotateButton);
    this.turnOff(this.hideButton, 'Hide');
    this.annotationForm.hide();
    document.removeEventListener('click', this.clickListener, true);
    document.removeEventListener('selectionchange', this.changeListener, true);
  } else if (viewing == 'hide') {
    this.turnOn(this.hideButton, 'Show');
    this.turnOff(this.annotateButton);
    this.turnOff(this.viewButton);
    this.annotateButton.style.display = 'none';
    this.viewButton.style.display = 'none';
    this.hideAnnotations();
    this.annotationForm.hide();
    document.removeEventListener('click', this.clickListener, true);
    document.removeEventListener('selectionchange', this.changeListener, true);
  }
}