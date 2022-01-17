function (exports) {
  'use strict';

  // `dogjs` is an augmented EventEmitter instance
  var dogjs = new EventEmitter(),
    asks, notifys, listens, oneachs, streamobjectseen = {};

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
        sourcenode = asks[ Utilities.last(item.name) ];
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
        }
        break;
        // case 'Dog::RoutedMessage':
        case 'notify':
        sourcenode = notifys[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No notify template for item');
        if (!(item.id in streamobjectseen)) {
          newnode = sourcetotarget( sourcenode, item );
          streamobjectseen[ item.id ] = true;
        }
        break;
        // case 'Dog::Track'
        case 'track':
        if (!(item.id in streamobjectseen)) {
          var req = new Request();
          req.on('success', onpoll);
          req.get('/dog/stream/' + item.id);
          streamobjectseen[ item.id ] = true;
        }
        break;
        case 'oneach':
        sourcenode = oneachs[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No oneach template for item');
        if (sourcenode.attributes['subscribe'] && sourcenode.attributes['subscribe'].value.match(/true/i)) {
          var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
          subscriber.on('poll', onpoll);
          subscriber.poll();
        }
        break;
        default:
        throw new Error('Invalid type specification for item');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
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

  }, false);

  exports.dogjs = dogjs;

}