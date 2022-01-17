function slv_update(result) {
    if (result === null)
      return;

    this.dataSource.push(result);

    var li = document.createElement('li');
    li.className = 'list-song-item';

    var a = document.createElement('a');
    a.href = '#';

    var songTitle = (result.metadata.title) ? result.metadata.title :
      navigator.mozL10n.get('unknownTitle');

    a.dataset.index = this.index;

    var titleSpan = document.createElement('span');
    titleSpan.className = 'list-song-title';
    titleSpan.textContent = (this.index + 1) + '. ' + songTitle;
    a.appendChild(titleSpan);

    li.appendChild(a);

    this.anchor.appendChild(li);

    this.index++;
  }