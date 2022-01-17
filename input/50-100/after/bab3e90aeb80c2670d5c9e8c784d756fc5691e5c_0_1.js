function () {
            var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
            scope.foo = 'bar';
            scope.$apply();
            expect($.trim(element.siblings().text())).toBe(scope.foo);
        }