function(){
    $(this.html).find('.kbletter').click(function(){
      cS = $(kb.focusBox).caret().start, cE = $(kb.focusBox).caret().end;
      str = $(kb.focusBox).attr('value');
      sub1 = str.substring(0,cS);
      sub2 = str.substring(cE);
      $(kb.focusBox).attr('value', sub1 + $(this).attr('letter') + sub2);
      $(kb.focusBox).focus();
      cS = cS+$(this).attr('letter').length;
      cE = cS;
      $(kb.focusBox).caret(cS,cS);
    });
  }