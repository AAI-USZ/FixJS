function (exports) {
  'use strict';

  // `dogjs` is an augmented EventEmitter instance
  var dogjs = new EventEmitter(),
    tasks, notifys, listens, oneachs, notifyseen = {}, handlerseen = {};

  var pollinterval, pollcount;
  pollinterval = 1000;
  pollcount = 2; // FIXME More total polls needed, naturally

  function extractview(item) {
    var bag = {};
    if (item.properties && Utilities.isArray(item.properties)) {
      item.properties
      .filter(function (el) { return el.direction === 'output' })
      .forEach(function (prop) {
        bag[prop.identifier] = prop.value;
      });
    }
    return bag;
  }

  function sourcetotarget(sourcenode, item) {
    var targetnode, newnode, method, view;
    Utilities.assert(sourcenode.attributes['holder'], 'No holder for source element');
    targetnode = document.querySelector( sourcenode.attributes['holder'].value );
    method = targetnode.attributes['method'] && targetnode.attributes['method'].value;
    newnode = sourcenode.cloneNode(true);
    view = extractview(item);
    if (!Utilities.isEmpty(view)) {
      newnode.innerHTML = Mustache.render(sourcenode.innerHTML, view);
    } else {
      newnode.innerHTML = sourcenode.innerHTML;
    }
    switch(method) {
      case 'append':
      targetnode.appendChild(newnode);
      break;
      case 'replace':
      default:
      if ( Utilities.trim(targetnode.innerHTML) ) {
        return null;
      }
      targetnode.appendChild(newnode);
    }
    return newnode;
  }

  function onpoll(data) {
    data['items'].forEach(function (item) {
      var sourcenode, newnode;
      Utilities.assert(item.name.length, 'No name for item');
      switch(item.type) {
        // case 'Dog::RoutedTask':
        case 'ask':
        sourcenode = tasks[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No ask template for item');
        // case 'Dog::RoutedEvent':
        case 'listen':
        sourcenode = sourcenode || listens[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No listen template for item');
        newnode = sourcetotarget( sourcenode, item );
        if (newnode) {
          newnode.method = 'post';
          newnode.action = '/dog/stream/' + item.id;
          // use AJAX for `form` submission
          Utilities.ajaxify(newnode);
          // FIXME can't just check without the 's'
          if (Utilities.last(item.name).slice(0,-1) in notifys) {
            var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
            subscriber.on('poll', onpolllist);
            subscriber.poll();
          }
        }
        break;
        // case 'Dog::RoutedMessage':
        case 'notify':
        sourcenode = notifys[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No notify template for item');
        if (!(item.id in notifyseen)) {
          newnode = sourcetotarget( sourcenode, item );
          notifyseen[ item.id ] = true;
        }
        break;
        default:
        throw new Error('Invalid type specification for item');
      }
    });
  }

  function onpolllist(data) {
    data['items'].forEach(function (item) {
      if (!(item.id in handlerseen)) {
        var req = new Request();
        req.on('success', onpoll);
        req.get('/dog/stream/' + item.id);
        handlerseen[ item.id ] = true;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var elems, dogblock, subscriber;
    elems = document.getElementsByTagName('dog');
    Utilities.assert(elems.length, 'Missing <dog> .. </dog> templates section');
    dogblock = elems[0];
    dogblock.style.display = 'none';

    tasks = {},
    oneachs = {},
    listens = {},
    notifys = {};
    elems = dogblock.getElementsByTagName('form');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['task']) {
        tasks[ elem.attributes['task'].value ] = elem;
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

    // repoll functionality abstracted out
    subscriber = new Poller('/dog/stream', pollinterval, pollcount);
    subscriber.on('poll', onpoll);
    subscriber.poll();

  }, false);

  exports.dogjs = dogjs;

}