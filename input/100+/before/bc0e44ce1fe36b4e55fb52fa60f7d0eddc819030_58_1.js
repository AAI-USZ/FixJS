function lv_update(option, result) {
    if (result === null)
      return;

    if (this.dataSource.length === 0)
      document.getElementById('nosongs').style.display = 'none';

    this.dataSource.push(result);

    var li = document.createElement('li');
    li.className = 'song';

    var a = document.createElement('a');
    a.href = '#';

    switch (option) {
      case 'album':
        a.textContent = result.metadata.album;
        a.dataset.keyRange = result.metadata.album;
        a.dataset.option = option;

        break;
      case 'artist':
        a.textContent = result.metadata.artist;
        a.dataset.keyRange = result.metadata.artist;
        a.dataset.option = option;

        break;
      case 'playlist':
        a.textContent = result.metadata.title;
        a.dataset.keyRange = 'all';
        a.dataset.option = 'title';

        break;
      default:
        return;
    }

    li.appendChild(a);

    this.view.appendChild(li);
  }