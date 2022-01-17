function(e){
  chrome.extension.sendRequest({action: "display_message", message: "Your advertisement views are now counting towards " + $(this).attr('data-name') + ".", time:2500}, function(response){
    noty(response.formated_message);
  });
  chrome.extension.sendRequest({action: "set_charity", "charity": $(this).attr('data-cid'), "name": $(this).attr('data-name')});
  update_current_charity();
}