function(properties) {

    var x509 = getX509Token(properties.key);



    var friendlyName = getFriendlyName(x509);

    if(properties.userName == undefined) {

        properties.userName = friendlyName;

    }



    var soapMsg = getSoapMsg(properties.payload);

    var signature = getSignature(x509, properties.references);



    var ctx = {

        request: soapMsg

           , replyTo: properties.replyTo

           , url: properties.url

           , action: properties.serviceProperties.action

           , contentType: "text/xml"

    };



    var handlers = [

                  new ws.Addr("http://www.w3.org/2005/08/addressing")

                , new ws.Security({}, [new ws.UsernameToken({ username: properties.userName }), x509, signature])

                , new ws.Http()

                ];



    ws.send(handlers, ctx, properties.handler);

}