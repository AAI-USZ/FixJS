function (userid, password) {
         var self = this;
            //var xmppServerAddress = "http://localhost:3333/app/dsadsa/http-bindours/";
          var xmppServerAddress = "http://176.34.122.48:7070/http-bind/";
         self.conn = new Strophe.Connection(xmppServerAddress);
         self.userid = userid;
         self.password = password;
         window.app.xmppConn = this;

         self.conn.connect(userid, password, self.connectCallback);
      }