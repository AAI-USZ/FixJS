function () {
  this.div = $('<div style="position: absolute; top: 0px; left: 0px; display: none; zIndex: 10000"></div>');
  this.div[0].annotateHide = true;
  this.div.html('<div style="'+styles.base+styles.border+'">' +
    '<textarea id="webannotate-text" style="width: 100%; height: 5em"></textarea> <br>' +
    '<button style="'+styles.button+'" type="button" id="webannotate-save">Save</button>' +
    '<button style="'+styles.button+'" type="button" id="webannotate-clear">Clear/Cancel</button>');
  document.body.appendChild(this.div[0]);
  this.text = $(document.getElementById('webannotate-text'));
  this.saveButton = $(document.getElementById('webannotate-save'));
  this.saveButton.click(this.save.bind(this));
  this.clearButton = document.getElementById('webannotate-clear');
  this.clearButton.click(this.clear.bind(this));
}