function () {
            var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
            scope.foo = 'bar';
            scope.$apply();
            expect(element.siblings().text().trim()).toBe(scope.foo);
        }