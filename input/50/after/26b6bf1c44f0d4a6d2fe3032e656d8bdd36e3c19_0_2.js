function () {
  log.debug("Connected. Disabling connect button and enabling the disconnect");

//  1. Enable the disconnect button
  $('#disconnectBtn').click(CDOT.disconnect).removeClass('disabled');

//  2. Update the local user id label
  $('#localUserIdLbl').html(connDescriptor.token);

}