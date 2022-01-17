function (userid, password) {
         var self = this;
            var xmppServerAddress = "http://localhost:3333/app/dsadsa/http-bindours/";
         //var xmppServerAddress = "http://www.cluj-info.com/smsfeedback/nocontroller/http-bindours/";
         self.conn = new Strophe.Connection(xmppServerAddress);
         self.userid = userid;
         self.password = password;
         window.app.xmppConn = this;

         self.conn.connect(userid, password, self.connectCallback);
      }