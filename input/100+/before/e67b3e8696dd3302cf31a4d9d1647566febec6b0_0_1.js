function(ret) {
      console.log(ret.items);
      for (var v=0; v<ret.items.length; v++) { 
        s = ret.items[v]['seconds'];
        console.log(s);
        then = new Date();
        then.setSeconds(then.getSeconds() + s)
        var inTime = parseTimeDiff(new Date, then);
        console.log(inTime);

        $(liStr).text('');

        var li = document.createElement('li');
        $(li).text(inTime);
        $(li).appendTo($(liStr));
      }
    }