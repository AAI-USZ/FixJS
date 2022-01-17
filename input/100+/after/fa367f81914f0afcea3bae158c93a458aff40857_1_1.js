function () {
        var scope,
            controller,
            location,
            httpBackend,
            routeParams,
            buildQuery,
            testUser;

        beforeEach(module('ghContrib.services'));

        beforeEach(inject(
            function ($rootScope, $controller, $location, $routeParams, $httpBackend) {
                buildQuery = function (user) {
                    return 'https://api.github.com/users/' + user +
                        '?callback=JSON_CALLBACK&per_page=100';
                };
                scope = $rootScope.$new();
                location = $location;
                httpBackend = $httpBackend;
                controller = $controller;
                routeParams = $routeParams;
                testUser = 'baz';
                httpBackend.whenJSONP(buildQuery(testUser)).respond({});
                routeParams.user = testUser;
            }
        ));

        it('should request for user data when created and store it in user_info',
            function () {
                var userCtrl,
                    fakeData = ['response one'],
                    fakeResponse = {'data': fakeData},
                    user = 'foo';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                userCtrl = controller(UserCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.user_info.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });

        it('should not use hardcoded requests or data in user_info',
            function () {
                var userCtrl,
                    fakeData = ['another response'],
                    fakeResponse = {'data': fakeData},
                    user = 'bar';
                httpBackend.expectJSONP(buildQuery(user)).
                        respond(fakeResponse);
                routeParams.user = user;
                userCtrl = controller(UserCtrl, {$scope: scope});
                httpBackend.flush(1);
                expect(scope.user_info.data).toEqual(fakeData);

                httpBackend.verifyNoOutstandingRequest();
            });

        it('should define pluralization for Public repo', function () {
            var userCtrl = controller(UserCtrl, {$scope: scope});
            httpBackend.flush(1);
            expect(scope.publicRepoForms['1']).toEqual('Public repo');
            expect(scope.publicRepoForms.other).toEqual('Public repos');
        });

        it('should define pluralization for Followers', function () {
            var userCtrl = controller(UserCtrl, {$scope: scope});
            httpBackend.flush(1);
            expect(scope.followerForms['1']).toEqual('Follower');
            expect(scope.followerForms.other).toEqual('Followers');
        });
    }