function load_puppet_class_parameters(item) {
  var $item = $(item);
  var id = $item.attr('data-class-id');
  if ($('#puppetclass_' + id + '_params_loading').length > 0) return; // already loading
  if ($('[id^="#puppetclass_' + id + '_params\\["]').length > 0) return; // already loaded
  var name = $item.prevAll('span').text();
  var type = $item.attr('data-type');
  var url = $item.siblings('a[data-tag="edit"]').attr('data-url');
  if (url == undefined) return; // no parameters
  var target = $('#puppetclasses_parameters');
  var placeholder = $('<tr id="puppetclass_'+id+'_params_loading">'+
      '<td>'+name+'</td>'+
      '<td colspan="5"><p><img src="/images/spinner.gif" alt="Wait" /> Loading parameters...</p></td>'+
      '</tr>');
  target.append(placeholder);
  $.ajax({
    url: url,
    success: function(result, textstatus, xhr) {
      var params = $(result);
      placeholder.replaceWith(params);
      params.find('a[rel="popover"]').popover();
      var link = $item.siblings('[data-tag="edit"]');
      link.removeClass('warning').removeClass('error');
      if (params.find('.error').length > 0)
        link.addClass('error');
      else if (params.find('.warning').length > 0)
        link.addClass('warning');
    }
  });
}