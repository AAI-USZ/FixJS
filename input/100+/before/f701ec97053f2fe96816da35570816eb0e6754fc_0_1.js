function(componentid, inputId) {

  var me = eXo.wiki.UIWikiTemplateForm;

  me.component = document.getElementById(componentid);

  var input = gj(me.component).find('#'+inputId)[0];

  input.setAttribute('autocomplete', 'off');

  input.onkeyup = function(evt) {

    evt = window.event || evt;

    eXo.wiki.UIWikiTemplateForm.pressHandler(evt, this);

  }

  input.form.onsubmit = function() {

    return false;

  }

}