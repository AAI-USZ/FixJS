function(date) {
      return date.getMonth() == this.today.getMonth() &&
             date.getDate() == this.today.getDate() &&
             date.getFullYear() == this.today.getFullYear();
    }