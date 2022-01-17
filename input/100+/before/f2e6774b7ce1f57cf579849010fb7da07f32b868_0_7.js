function browser_drawHistoryEntry(visit) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + visit.uri + '"><span>' +
        (visit.title ? visit.title : visit.uri) +
        '</span><small>' + visit.uri + '</small></a>';
      this.history.lastChild.appendChild(li);
  }