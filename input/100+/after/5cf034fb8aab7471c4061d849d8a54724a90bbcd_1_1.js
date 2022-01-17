function () {
  // Load data
  var siteContent = instaedit.getSiteContent();
  var parserScript = instaedit.getParserCode();

  // Set initial content
  var parserEditorElem = document.getElementById('parsereditor');
  var contentEditor = document.getElementById('editor');

  contentEditor.innerHTML = siteContent;
  parserEditorElem.innerHTML = parserScript;

  // Style it
  contentEditor.style.height = (window.innerHeight - 45).toString() + 'px';
  parserEditorElem.style.height = (window.innerHeight * 0.4 - 45).toString() + 'px';

  // Turn to ace editors
  var contentEditor = ace.edit("editor");
  var parsereditor = ace.edit("parsereditor");

  parsereditor.getSession().setMode("ace/mode/javascript");

  contentEditor.resize();
  parsereditor.resize();

  // Export data
  var data = {};

  // Editors
  data.contentEditor = contentEditor;
  data.parserEditor = parsereditor;

  // Initial data
  data.parserScript = parserScript;
  data.siteContent = siteContent;
  data.onError = this.handleError;
  this.setEditor(data);
  
  instaedit.setEditor(data);
}