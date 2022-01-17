function () {
        $('#howto').hide();
        console.log(window.addInfo);
        addInfo('Du hast ein Rennen gestartet!');
        window.scrollTo(0, 0);

        if(firstPlay) {
          postToWall("hat das LAMBDA Outrun-Edition Gewinnspiel gestartet. Gewinne auch Karten für unsere nächste Party: http://www.facebook.com/events/326641780751708/");
          attendEvent();
          firstPlay = false;
        }
      }