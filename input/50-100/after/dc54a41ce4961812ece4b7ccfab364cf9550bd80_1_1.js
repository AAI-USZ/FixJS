function ClientTcpServer(port,adaptor){
    console.log("ClientAdaptor is starting a server on port 3000");
    var net   	= require('net');
    this.server = net.createServer(
        function (socket){
            sutil.newOutlet(socket,thisAdaptor,loginCallback);
        }
    );
    this.server.listen(port);
}