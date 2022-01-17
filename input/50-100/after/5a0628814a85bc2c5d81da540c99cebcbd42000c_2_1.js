function(){
      var u = this.get("confidential").encrypt(JSON.stringify(this.get("userPrivate").toJSON()));
      localStorage.setItem("encryptedUser", u);
      window.appView.addSavedDoc(this.get("userPrivate").id);
    }