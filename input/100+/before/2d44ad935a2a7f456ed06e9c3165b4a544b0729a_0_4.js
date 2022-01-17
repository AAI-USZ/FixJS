function smart_var_dialog(item) {
  var id = $(item).attr('data-class-id');
  var target = $('#puppetclasses_parameters');
  var name = $(item).prevAll('span').text();
  var type = $(item).attr('data-type');
  var placeholder = $('<div><img src="/images/edit.png"/>Currently under edition...</div>');
  target.replaceWith(placeholder);
  target.addClass('hide-first-col');
  target.find('tr[id^="puppetclass_"][id*="_params\\["]').addClass('hide');
  target.find('tr[id^="puppetclass_'+id+'_params\\["]').removeClass('hide');
  var box = $('<div class="modal scrollable modal10 fade"><a class="close" data-dismiss="modal">&times;</a><h3 class="modal-header">'+$(item).prevAll('span').text()+'</h3></div>');
  box.on('hidden', function() {
    target.removeClass('hide-first-col');
    target.find('tr[id^="puppetclass_"][id*="_params\\["]').removeClass('hide');
    target.removeClass('modal-body');
    placeholder.replaceWith(target);
    // Apparently not needed here... //target.find('a[rel="popover"]').popover(); // fix .data() gone when moving the target
    box.remove();
  });
  var body = $('<div class="modal-body"></div>');
  body.append(target);
  target.find('a[rel="popover"]').popover(); // fix .data() gone when moving the target
  box.append(body);
  box.modal('show');
}