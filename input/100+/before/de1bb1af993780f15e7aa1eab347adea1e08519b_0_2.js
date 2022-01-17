function(start) {
    var date = new Date(start);
    if (this.zone && date.setTimezone)
      date.setTimezone(start.getTimezone());
    
    //sanity check
    var i = 1000;
    while(--i) {
      var diff = date - start;
      
      if (!(date.getMonth() in this.month)) {
        date.setMonth(date.getMonth()+1);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        continue;
      }

      if (!(date.getDate() in this.dayOfMonth)) {
        date.setDate(date.getDate()+1);
        date.setHours(0);
        date.setMinutes(0);
        continue;
      }

      if (!(date.getDay()+1 in this.dayOfWeek)) {
        date.setDate(date.getDate()+1);
        date.setHours(0);
        date.setMinutes(0);
        continue;
      }
      
      if (!(date.getHours() in this.hour)) {
        date.setHours(date.getHours() == 23 && diff > 24*60*60*1000 ? 0 : date.getHours()+1);
        date.setMinutes(0);
        continue;
      }
      
      if (!(date.getMinutes() in this.minute)) {
        date.setMinutes(date.getMinutes() == 59 && diff > 60*60*1000 ? 0 : date.getMinutes()+1);
        date.setSeconds(0);
        continue;
      }
      
      if (!(date.getSeconds() in this.second)) {
        date.setSeconds(date.getSeconds() == 59 && diff > 60*1000 ? 0 : date.getSeconds()+1);
        continue;
      }
      
      break;
    }
    
    return date;
  }