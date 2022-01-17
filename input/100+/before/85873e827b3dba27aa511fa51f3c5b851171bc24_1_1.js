function smart_var_dialog(item) {
  var id = $(item).attr('data-class-id');
  var target = $('#puppetclass_' + id + '_params');
  if (target.length == 0) return; // no parameters
  var name = $(item).prevAll('span').text();
  var type = $(item).attr('data-type');
  var placeholder = $('<div class="control-group">'+
      '<label class="control-label">'+name+'</label>'+
      '<div class="controls"><img src="/images/edit.png" alt="Currently under edition..." /></div>'+
      '</div>');
  target.replaceWith(placeholder);
  target.children('.control-label').addClass('hide');
  var box = $('<div class="modal scrollable modal10 fade"><a class="close" data-dismiss="modal">&times;</a><h3 class="modal-header">'+$(item).prevAll('span').text()+'</h3></div>');
  box.on('hidden', function() {
    target.children('.control-label').removeClass('hide');
    target.removeClass('modal-body');
    placeholder.replaceWith(target);
    placeholder.remove();
    box.remove();
  });
  box.append(target.detach());
  target.addClass('modal-body');
  box.modal('show');
}