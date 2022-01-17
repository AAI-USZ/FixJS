function (wsuri, onconnect, onhangup, options) {

   var peer = {};
   peer.wsuri = wsuri;

   if (!options) {
      peer.options = {};
   } else {
      peer.options = options;
   }

   if (peer.options.retryDelay == undefined) {
      peer.options.retryDelay = 5000;
   }

   if (peer.options.maxRetries == undefined) {
      peer.options.maxRetries = 10;
   }

   if (peer.options.skipSubprotocolCheck == undefined) {
      peer.options.skipSubprotocolCheck = false;
   }

   if (!onconnect) {
      throw "onConnect handler required!";
   } else {
      peer.onConnect = onconnect;
   }

   if (!onhangup) {
      peer.onHangup = function (code, reason) {
         console.log(reason);
      }
   } else {
      peer.onHangup = onhangup;
   }

   peer.connects = 0; // total number of successful connects
   peer.retryCount = 0; // number of retries since last successful connect

   ab._connect(peer);
}