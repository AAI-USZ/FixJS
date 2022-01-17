function () {
  log.debug("Establishing a connection to the Cloudeo Streaming Server");

//  1. Disable the connect button to avoid a cascade of connect requests
  $('#connectBtn').unbind('click').addClass('disabled');

//  2. Get the scope id and generate the user id.
  CDOT.scopeId = $('#scopeIdTxtField').val();
  CDOT.userId = CDOT.genRandomUserId();

//  3. Define the result handler - delegates the processing to the
//     postConnectHandler
  var connDescriptor = CDOT.genConnectionDescriptor();
  var onSucc = function () {
    CDOT.postConnectHandler();
  };

//  4. Define the error handler - enabled the connect button again
  var onErr = function () {
    $('#connectBtn').click(CDOT.connect()).removeClass('disabled');
  };

//  5. Request the SDK to establish a connection
  CDO.getService().connect(CDO.createResponder(onSucc, onErr), connDescriptor);
}