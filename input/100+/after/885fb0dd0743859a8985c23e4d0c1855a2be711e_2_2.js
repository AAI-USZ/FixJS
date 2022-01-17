function($templateCache, $rootScope, $location) {
      $rootScope.$on('$beforeRouteChange', logger('$beforeRouteChange'));
      $rootScope.$on('$afterRouteChange', logger('$afterRouteChange'));
      $rootScope.$on('$viewContentLoaded', logger('$viewContentLoaded'));

      $templateCache.put('tpl.html', [200, '{{value}}', {}]);
      $location.path('/foo');
      $rootScope.$digest();

      expect(element.text()).toBe('bound-value');
      expect(log).toEqual([
        '$beforeRouteChange', 'init-ctrl', '$viewContentLoaded', '$afterRouteChange' ]);
    }