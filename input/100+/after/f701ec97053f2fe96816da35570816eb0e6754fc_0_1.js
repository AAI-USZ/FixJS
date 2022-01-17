function(componentid, inputId, defaultText) {

  var me = eXo.wiki.UIWikiTemplateForm;

  me.component = document.getElementById(componentid);

  var input = gj(me.component).find('#' + inputId)[0];

  gj(input).attr('autocomplete', 'off');

  gj(this).val(defaultText); 

  gj(input).keyup(function(evt) {

    evt = window.event || evt;

    eXo.wiki.UIWikiTemplateForm.pressHandler(evt, this);

  });

  gj(input).click(function() {

    if (gj(this).val() == defaultText) {

      gj(this).val('');

      gj(this).css('color','black');

    }

  });

  gj(input).blur(function() {

    if (gj(this).val() == '') {

      gj(this).val(defaultText);

      gj(this).css('color','#9A9A9A');

    }

  });

  input.form.onsubmit = function() {

    return false;

  }

}