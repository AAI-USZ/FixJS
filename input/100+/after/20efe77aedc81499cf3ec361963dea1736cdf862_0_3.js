function() {
    var elems, dogblock, subscriber;
    elems = document.getElementsByTagName('dog');
    Utilities.assert(elems.length, 'Missing <dog> .. </dog> templates section');
    dogblock = elems[0];
    dogblock.style.display = 'none';

    asks = {},
    oneachs = {},
    listens = {},
    notifys = {};

    // **Scan for Dog tags in the templates section**
    elems = dogblock.getElementsByTagName('form');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['ask']) {
        asks[ elem.attributes['ask'].value ] = elem;
      } else if (elem.attributes['listen']) {
        listens[ elem.attributes['listen'].value ] = elem;
      }
    });
    elems = dogblock.getElementsByTagName('section');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['notify']) {
        notifys[ elem.attributes['notify'].value ] = elem;
      } else if (elem.attributes['oneach']) {
        oneachs[ elem.attributes['oneach'].value ] = elem;
      }
    });

    // **Setup polling**

    // root stream
    subscriber = new Poller('/dog/stream', pollinterval, pollcount);
    subscriber.on('poll', onpoll);
    subscriber.poll();

  }