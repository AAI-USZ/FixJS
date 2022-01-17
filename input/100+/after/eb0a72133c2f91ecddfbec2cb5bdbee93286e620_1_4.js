function(containerdiv, onchange) {
  this.containerdiv = containerdiv;
  this.onchange = onchange;
  this.viewerdiv = null;
  this.viewer = null;
  this.viewerwidth = 800;
  this.viewerheight = 600;
  this.initialViewerDistance = 50;
  this.processing = false;
  this.currentObject = null;
  this.hasValidCurrentObject = false;
  this.hasOutputFile = false;
  this.worker = null;
  this.paramDefinitions = [];
  this.paramControls = [];
  this.script = null;
  this.hasError = false;
  this.debugging = false;
  this.createElements();
}