function(name, val){
    val = utils.sign(val, this.req.secret);
    return utils.serializeCookie(name, val, this.data);
  }