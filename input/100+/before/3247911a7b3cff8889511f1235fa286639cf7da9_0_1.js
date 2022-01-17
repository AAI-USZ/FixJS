function resizeFileBase(){
  var fileBaseBox = $$('.celements3_filebase')[0];
  var filesBox = $('c2_ml_content');
  var scrollBox = filesBox.down('.c3_import_scrollable');
  
  var uploadHeight = 0;
  if($$('.c3_filebase_upload') && ($$('.c3_filebase_upload').length > 0)) {
    uploadHeight = $$('.c3_filebase_upload')[0].offsetHeight;
  }
  var mainPadding = parseInt($$('.main')[0].getStyle('padding-top'));
  var mainMargin = parseInt($$('.main')[0].getStyle('margin-top'));
  var mainBorders = 2 * (mainPadding + mainMargin);
  
  var siblingHeight = 0;
  if(scrollBox){
    scrollBox.siblings().each(function(sibl){
      if(sibl.getStyle('position') != 'absolute'){
        siblingHeight += sibl.offsetHeight;
      }
    });
  }
  
  var winHeight = 0;
  if(typeof(window.innerWidth) == 'number') {
    winHeight = window.innerHeight;
  } else if(document.documentElement && document.documentElement.clientHeight) {
    winHeight = document.documentElement.clientHeight;
  } else if(document.body && document.body.clientHeight) {
    winHeight = document.body.clientHeight;
  }
  
  var fileBaseBoxSize = winHeight - mainBorders;
  var filesBoxSize = fileBaseBoxSize - uploadHeight;
  var scrollableSize = filesBoxSize - siblingHeight;
  fileBaseBox.setStyle({ height: Math.max(50, fileBaseBoxSize) + "px" });
  filesBox.setStyle({ height: Math.max(50, filesBoxSize) + "px" });
  if(scrollBox){
    scrollBox.setStyle({ height: Math.max(50, scrollableSize) + "px" });
  }
//  alert(fileBaseBoxSize + " - " + filesBoxSize + " - " + scrollableSize);
//  alert(fileBaseBox.getHeight() + " - " + filesBox.getHeight() + " - " + scrollBox.getHeight());
}