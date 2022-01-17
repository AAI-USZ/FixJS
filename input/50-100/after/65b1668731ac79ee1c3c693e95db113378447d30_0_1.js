function(row) {
        var $ministat;
        $ministat = $(this).children('td.title').children('.ministat');
        $ministat.css("background-color", bgColors[row]);
        return $ministat.children('.minibar').css("background-color", barColors[row]);
      }