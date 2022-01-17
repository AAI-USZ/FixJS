function() {
      expect(angular.element.cache).toEqual({});
      var div = angular.element('<div></div>');
      div.data('name', 'angular');
      expect(keys(angular.element.cache)).not.toEqual([]);
      angular.mock.clearDataCache();
      expect(keys(angular.element.cache)).toEqual([]);
    }