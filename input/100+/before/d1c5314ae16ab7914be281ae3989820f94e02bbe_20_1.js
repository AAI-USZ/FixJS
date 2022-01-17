function(s) {
        switch (s) {
          case '%a': return [
              "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ][d.getDay()];
          case '%A': return [
              "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
              "Saturday"
            ][d.getDay()];
          case '%h':
          case '%b': return [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
              "Oct", "Nov", "Dec"
            ][d.getMonth()];
          case '%B': return [
              "January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"
            ][d.getMonth()];
          case '%c': return d.toLocaleString();
          case '%C': return padz2(Math.floor(d.getFullYear() / 100) % 100);
          case '%d': return padz2(d.getDate());
          case '%x':
          case '%D': return padz2(d.getMonth() + 1)
                    + "/" + padz2(d.getDate())
                    + "/" + padz2(d.getFullYear() % 100);
          case '%e': return pads2(d.getDate());
          case '%H': return padz2(d.getHours());
          case '%I': {
            var h = d.getHours() % 12;
            return h ? padz2(h) : 12;
          }
          // TODO %j: day of year as a decimal number [001,366]
          case '%m': return padz2(d.getMonth() + 1);
          case '%M': return padz2(d.getMinutes());
          case '%n': return "\n";
          case '%p': return d.getHours() < 12 ? "AM" : "PM";
          case '%T':
          case '%X':
          case '%r': {
            var h = d.getHours() % 12;
            return (h ? padz2(h) : 12)
                    + ":" + padz2(d.getMinutes())
                    + ":" + padz2(d.getSeconds())
                    + " " + (d.getHours() < 12 ? "AM" : "PM");
          }
          case '%R': return padz2(d.getHours()) + ":" + padz2(d.getMinutes());
          case '%S': return padz2(d.getSeconds());
          case '%Q': return padz3(d.getMilliseconds());
          case '%t': return "\t";
          case '%u': {
            var w = d.getDay();
            return w ? w : 1;
          }
          // TODO %U: week number (sunday first day) [00,53]
          // TODO %V: week number (monday first day) [01,53] ... with weirdness
          case '%w': return d.getDay();
          // TODO %W: week number (monday first day) [00,53] ... with weirdness
          case '%y': return padz2(d.getFullYear() % 100);
          case '%Y': return d.getFullYear();
          // TODO %Z: timezone name or abbreviation
          case '%%': return "%";
        }
        return s;
      }