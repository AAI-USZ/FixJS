function(date) {
      var today = this.today,
          month = date.getMonth() == today.getMonth(),
          day = date.getDate() == today.getDate(),
          year = date.getYear() == today.getYear();


      if (month && day && year) {
         return true;
      }

      return false;
    }