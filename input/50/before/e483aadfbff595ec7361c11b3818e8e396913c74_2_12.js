function(element){
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
    }