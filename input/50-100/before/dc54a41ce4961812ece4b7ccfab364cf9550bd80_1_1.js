function ClientTcpServer(port,adaptor){
    console.log("Starting server on 3000");
    var net   	= require('net');
    this.server = net.createServer(
        function (socket){
            sutil.newOutlet(socket,thisAdaptor,loginCallback);
        }
    );
    this.server.listen(port);
}