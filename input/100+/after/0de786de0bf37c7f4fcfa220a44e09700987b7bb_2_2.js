function showRecents(recents) {
recents = [
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
  { date: Date.now(), number: '+33686834379', type: 'missed' },
];
      if (recents.length == 0) {
        self.view.innerHTML = '';
        return;
      }

      var content = '';
      var currentDay = '';
      for (var i = 0; i < recents.length; i++) {
        var day = self.getDayDate(recents[i].date);
        if (day != currentDay) {
          if (currentDay != '') {
            content += '</ol></section>';
          }
          currentDay = day;

          content +=
            '<section data-timestamp="' + day + '">' +
            '  <h2>' + headerDate(day) + '</h2>' +
            '  <ol id="' + day + '" class="log-group">';
        }
        content += self.createRecentEntry(recents[i]);
      }
      self.view.innerHTML = content;
    }