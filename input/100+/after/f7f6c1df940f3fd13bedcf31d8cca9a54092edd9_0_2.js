function(x, y) {

  var hit = false;

  // guard
  if( this.editor.selectedPathList.length == 0) { return false; };

  var handles = this.getResizeGuideHandles();

  var i;
  for(i = 1; i < handles.x.length; i++) {
    // Resize Handle starts from 1; see const.js

    if( this.hitHandle(handles.x[i], handles.y[i], x, y) ) {
      hit = true;
      break;
    }

  }

  if(hit) {
    var ret = {};
    ret.position = i;

    return ret;
  } else {
    return false;
  }

}