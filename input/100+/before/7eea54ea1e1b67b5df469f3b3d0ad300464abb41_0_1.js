function(ydt) {
      if (ydt == null) return '';
      var year  = ydt.getFullYear();
      var month = ydt.getMonth()+1;
      var date  = ydt.getDate();
      var hour  = ydt.getHours() < 10 ? '0'+ydt.getHours() : ydt.getHours();
      var min   = ydt.getMinutes() < 10 ? '0'+ydt.getMinutes() : ydt.getMinutes();;
      var sec   = ydt.getSeconds() < 10 ? '0'+ydt.getSeconds() : ydt.getSeconds();;
      // return year+'/'+month+'/'+date+' '+hour+':'+min+':'+sec;
      return hour+':'+min+':'+sec;
    }