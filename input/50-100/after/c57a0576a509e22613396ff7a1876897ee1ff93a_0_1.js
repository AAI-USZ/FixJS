function(rowUID, message){
    var templateTR = this.getTemplateTR('creating').addClass('working');
    templateTR.attr('data-row_uid', rowUID);
    templateTR.find('td .row_title').html(message);
    templateTR.insertAfter($(this.selectors.table).find('tbody tr.template').last());
    $(this.selectors.table).find('tr.no-data').hide();
  }