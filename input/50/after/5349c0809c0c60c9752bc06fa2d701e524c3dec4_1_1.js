function resetResponse(){
    res = {
      redirect: function(url){
        throw Error('Redirection to '+url);
      }
    };
  }