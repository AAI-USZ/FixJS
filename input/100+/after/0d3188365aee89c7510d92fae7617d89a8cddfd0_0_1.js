function()
    {
      padutils.bindCheckboxChange($("#options-linenoscheck"), function()
      {
        pad.changeViewOption('showLineNumbers', padutils.getCheckbox($("#options-linenoscheck")));
      });
      padutils.bindCheckboxChange($("#options-colorscheck"), function()
      {
        pad.changeViewOption('showAuthorColors', padutils.getCheckbox("#options-colorscheck"));
      });
      $("#viewfontmenu").change(function()
      {
        pad.changeViewOption('useMonospaceFont', $("#viewfontmenu").val() == 'monospace');
      });
    }