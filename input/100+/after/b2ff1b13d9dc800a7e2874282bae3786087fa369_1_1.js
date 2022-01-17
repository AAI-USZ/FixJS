function(){
      switch (false) {
      case !able(this.tokens):
        return 'CLONEPORT';
      case last[0] !== '(':
        return 'BIOP';
      default:
        return 'WITH';
      }
    }