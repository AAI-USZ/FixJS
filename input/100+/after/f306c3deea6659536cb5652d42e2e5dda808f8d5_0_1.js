function () {
            var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
            scope.$apply();
            expect(scope.foo).toBe(undefined);
            expect($.trim(element.siblings().text())).toBe('');
            scope.foo = null;
            scope.$apply();
            expect(scope.foo).toBe(null);
            expect($.trim(element.siblings().text())).toBe('');
        }