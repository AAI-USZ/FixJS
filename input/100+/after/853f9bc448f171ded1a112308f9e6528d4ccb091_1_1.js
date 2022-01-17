function () {
        it('should update the IDE with an empty string', function () {
            inject(function ($compile) {
                var codemirror,
                    fromTextArea = CodeMirror.fromTextArea;
                spyOn(CodeMirror, 'fromTextArea').andCallFake(function () {
                    codemirror = fromTextArea.apply(this, arguments);
                    return codemirror;
                });
                var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                scope.$apply();
                expect(scope.foo).toBe(undefined);
                expect(element.siblings().text().trim()).toBe('');
            });
        });
    }