function setUpParamsForSocialTracking(facebook_action, action_id) {
  var params = {petition_id: VK.petition_id, facebook_action: facebook_action};
  if (VK.signature_id !== "") {
    params = $.extend(params, {signature_id: VK.signature_id});
  }
  if (action_id !== "") {
    params = $.extend(params, {action_id: action_id});
  }

  return params;
}