function(pageEditFormId) {  
  var pageEditForm = document.getElementById(pageEditFormId);
  var titleContainer = gj(pageEditForm).find('div.UIWikiPageTitleControlForm_PageEditForm')[0];
  var titleInput = gj(titleContainer).find('input')[0];

  eXo.wiki.UIWikiPageEditForm.changed = false;

  titleInput.onchange = function() {
    eXo.wiki.UIWikiPageEditForm.changed = true;
    titleInput.onchange = null;
  }
  
  var textAreaContainer = gj(pageEditForm).find('div.UIWikiPageContentInputContainer')[0];
  if (textAreaContainer != null) {
    var textArea = gj(textAreaContainer).find('textarea')[0];
    textArea.onchange = function() {
      eXo.wiki.UIWikiPageEditForm.changed = true;
      textArea.onchange = null;
    }
  } else {
    eXo.wiki.UIWikiPageEditForm.changed = true;
  }
}