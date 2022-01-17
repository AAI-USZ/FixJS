function(err, result) {
    if(err) {
      callback({ err: 'there was an error for Player.where()' }, undefined);
    } else {
      console.log("DB RESULT");
      console.log(result);
      console.log(result.length());

      var mail = message;
      mail.subject = "Anzahl Spieler";
      mail.text = result.length();

      smtpTransport.sendMail(mail, function(error, response) {
          callback(undefined, result);
      });
    }
  }