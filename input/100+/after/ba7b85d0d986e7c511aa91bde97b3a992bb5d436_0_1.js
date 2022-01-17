function(){

  $(".one_click_select").live("click", function(){
    $(this).select();
  });


  $('body').on('ajax:complete, ajax:beforeSend, submit', 'form', function(e){
    var buttons = $('[type="submit"]', this);
    switch( e.type ){
      case 'ajax:beforeSend':
      case 'submit':
        buttons.attr('disabled', 'disabled');
      break;
      case ' ajax:complete':
      default:
        buttons.removeAttr('disabled');
      break;
    }
  })

  $(".account-box").mouseenter(showMenu);
  $(".account-box").mouseleave(resetMenu);

  $("#projects-list .project").live('click', function(e){
    if(e.target.nodeName != "A" && e.target.nodeName != "INPUT") {
      location.href = $(this).attr("url");
      e.stopPropagation();
      return false;
    }
  });

  $("#issues-table .issue").live('click', function(e){
    if(e.target.nodeName != "A" && e.target.nodeName != "INPUT") {
      location.href = $(this).attr("url");
      e.stopPropagation();
      return false;
    }
  });

  /**
   * Focus search field by pressing 's' key
   */
  $(document).keypress(function(e) {
    if( $(e.target).is(":input") ) return;
    switch(e.which)  {
      case 115:  focusSearch();
        e.preventDefault();
    }
  });

  /**
   * Commit show suppressed diff
   *
   */
  $(".supp_diff_link").bind("click", function() {
    showDiff(this);
  });
}