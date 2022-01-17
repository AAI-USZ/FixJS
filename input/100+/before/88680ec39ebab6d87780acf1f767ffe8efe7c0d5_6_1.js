function(pageEditFormId) {  
  var pageEditForm = document.getElementById(pageEditFormId);
  var titleContainer = eXo.core.DOMUtil.findFirstDescendantByClass(pageEditForm, 'div', 'UIWikiPageTitleControlForm_PageEditForm');
  var titleInput = eXo.core.DOMUtil.findDescendantsByTagName(titleContainer, 'input')[0];

  eXo.wiki.UIWikiPageEditForm.changed = false;

  titleInput.onchange = function() {
    eXo.wiki.UIWikiPageEditForm.changed = true;
    titleInput.onchange = null;
  }
  
  var textAreaContainer = eXo.core.DOMUtil.findFirstDescendantByClass(pageEditForm, 'div', 'UIWikiPageContentInputContainer');
  if (textAreaContainer != null) {
    var textArea = eXo.core.DOMUtil.findDescendantsByTagName(textAreaContainer, 'textarea')[0];    
    textArea.onchange = function() {
      eXo.wiki.UIWikiPageEditForm.changed = true;
      textArea.onchange = null;
    }
  } else {
    eXo.wiki.UIWikiPageEditForm.changed = true;
  }
}