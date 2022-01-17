function toggleParserEditor() {
  console.log('toggling');
  var parserEditorWrapper = document.getElementById('parsereditor');
  var contentEditor = document.getElementById('editor');
  var applyButton = document.getElementById('apply');

  if(parserEditorWrapper.style.visibility == 'hidden') {
    console.log('up');
    parserEditorWrapper.style.visibility = 'visible';
    applyButton.style.visibility = 'visible';

    contentEditor.style.height = window.innerHeight * 0.8;
  } else {
    console.log('down');
    parserEditorWrapper.style.visibility = 'hidden';
    applyButton.style.visibility = 'hidden';

    contentEditor.style.height = window.innerHeight;
  }
}