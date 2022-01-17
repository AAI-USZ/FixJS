function() {
      expect(keys(angular.element.cache)).toEqual([]);
      var log = '';
      var div = angular.element('<div></div>');

      // crazy IE9 requires div to be connected to render DOM for click event to work
      // mousemove works even when not connected. This is a heisen-bug since stepping
      // through the code makes the test pass. Viva IE!!!
      angular.element(document.body).append(div)

      div.bind('click', function() { log += 'click1;'});
      div.bind('click', function() { log += 'click2;'});
      div.bind('mousemove', function() { log += 'mousemove;'});

      browserTrigger(div, 'click');
      browserTrigger(div, 'mousemove');
      expect(log).toEqual('click1;click2;mousemove;');
      log = '';

      angular.mock.clearDataCache();

      browserTrigger(div, 'click');
      browserTrigger(div, 'mousemove');
      expect(log).toEqual('');
      expect(keys(angular.element.cache)).toEqual([]);

      div.remove();
    }