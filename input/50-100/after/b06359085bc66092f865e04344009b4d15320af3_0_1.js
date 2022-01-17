function(){
    // show comments
    $(this).attr('data-text', $(this).text());
    $(this).text('收起回复');
    $(this).parent().parent().next().show();
    $('#textbox-'+$(this).attr('data-mail-id')).focus();
  }