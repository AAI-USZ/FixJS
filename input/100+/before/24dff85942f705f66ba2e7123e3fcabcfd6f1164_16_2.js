function slv_update(result) {
    if (result === null)
      return;

    this.dataSource.push(result);

    var li = document.createElement('li');
    li.className = 'song';

    var a = document.createElement('a');
    a.href = '#';

    var songTitle = (result.metadata.title) ? result.metadata.title :
      navigator.mozL10n.get('unknownTitle');

    a.dataset.index = this.index;
    a.textContent = (this.index + 1) + '. ' + songTitle;

    this.index++;

    li.appendChild(a);

    this.view.appendChild(li);
  }