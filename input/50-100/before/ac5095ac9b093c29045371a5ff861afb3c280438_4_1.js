function(separator) {
      if(separator === undefined) separator = '-';
      var str = this.normalize();
      str = str.replace(/[^a-z0-9\-_]+/gi, separator)
      if(separator) {
        str = str.replace(new RegExp('^{sep}+|{sep}+$|({sep}){sep}+'.assign({ 'sep': RegExp.escape(separator) }), 'g'), '$1');
      }
      return str.toLowerCase();
    }