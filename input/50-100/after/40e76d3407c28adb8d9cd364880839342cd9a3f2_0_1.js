function ($compile) {
                var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                scope.$apply();
                expect(scope.foo).toBe(undefined);
                expect(element.siblings().text().trim()).toBe('');
            }