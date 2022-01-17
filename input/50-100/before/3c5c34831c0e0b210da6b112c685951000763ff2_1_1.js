function($compile) {
        var element;
        element = $compile("<ui-template ng-model='mymodel'></ui-template>")(scope);
        scope.$apply(function() {
          scope.mymodel = 'MODELVAL';
        });
        expect(element.text()).toEqual('MODELVAL');
      }