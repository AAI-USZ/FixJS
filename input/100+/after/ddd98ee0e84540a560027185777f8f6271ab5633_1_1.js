function() {
        it('should throw an error', function() {
            inject(function ($compile) {
                function compileWithObject() {
                    $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                    scope.foo = {};
                    scope.$apply();
                }
                function compileWithArray() {
                    $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                    scope.foo = [];
                    scope.$apply();
                }
                expect(compileWithObject).toThrow();
                expect(compileWithArray).toThrow();
            });
        });
    }