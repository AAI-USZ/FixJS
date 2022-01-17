function($compile) {
        var element;
        element = $compile("<div ui-template ng-model='mymodel'></div>")(scope);
        scope.$apply(function() {
          scope.mymodel = 'MODELVAL';
        });
        expect(element.text()).toEqual('MODELVAL');
      }