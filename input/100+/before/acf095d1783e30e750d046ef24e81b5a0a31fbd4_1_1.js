function() {
      expect(keys(angular.element.cache)).toEqual([]);

      var div = angular.element('<div></div>');

      div.bind('click', angular.noop);
      div.bind('mousemove', angular.noop);
      div.data('some', 'data');
      expect(keys(angular.element.cache).length).toBe(1);

      angular.mock.clearDataCache();
      expect(keys(angular.element.cache)).toEqual([]);
      expect(div.data('some')).toBeUndefined();

      div.remove();
    }