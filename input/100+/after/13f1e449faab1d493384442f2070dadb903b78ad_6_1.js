function() {
    var testComplete = false;
    var playlist = new this.Tapedeck
                           .Backend
                           .Collections
                           .Playlist(this.testTracks);

    var viewScript = this.Tapedeck
                         .Backend
                         .TemplateManager
                         .getViewScript("PlaylistList");

    var playlistList = new this.Tapedeck
                               .Backend
                               .Collections
                               .PlaylistList([playlist]);

    var view = new viewScript({ playlistList: playlistList });
    view.render(function(listDOM) {
      var rows  = $(listDOM).find(".row");
      expect(rows.length).toEqual(1);

      playlistList = new this.Tapedeck
                             .Backend
                             .Collections
                             .PlaylistList([playlist, playlist]);

      view = new viewScript({ playlistList: playlistList });
      view.render(function(doubleListDOM) {

        var rows  = $(doubleListDOM).find(".row");
        expect(rows.length).toEqual(2);
        testComplete = true;
      });

    });

    waitsFor(function() { return testComplete }, "Waiting for PlaylistLists to be built", 2000);
    runs(function() {
      expect(testComplete).toBeTruthy();
    })

  }