function(msg) {

    var body = msg.toString(msg);

    var x509 = getX509Token(msg.key);



    var friendlyName = getFriendlyName(x509);

    if(msg.userName == undefined) {

        msg.userName = friendlyName;

    }



    var soapMsg = getSoapMsg(body);

    var signature = getSignature(x509, msg.references);



    var ctx = {

             request: soapMsg

           ,  replyTo: msg.replyTo

           , url: msg.url

           , action: msg.serviceProperties.action

           , contentType: "text/xml"

    };



    var handlers = [

                  new ws.Addr("http://www.w3.org/2005/08/addressing")

                , new ws.Security({}, [new ws.UsernameToken({ username: msg.userName }), x509, signature])

                , new ws.Http()

                ];



    ws.send(handlers, ctx, msg.handler);

}