function () {
        beforeEach(function () {
            buildQuery = function (user) {
                return baseUrl + 'users/' + user + queryParams;
            };
            httpBackend.whenJSONP(buildQuery(testUser)).respond({});
            routeParams.user = testUser;
            createController(UserCtrl);
            verifyRequestAndModel = buildVerifyRequestAndModel(UserCtrl);
        });

        it('should define pluralization for Public repo', function () {
            verifyForms(scope, 'publicRepoForms', 'Public Repo',
                'Public Repos');
        });

        it('should define pluralization for Followers', function () {
            verifyForms(scope, 'followerForms', 'Follower', 'Followers');
        });

        it('should send request when created and store it in user_info',
            function () {
                verifyRequestAndModel(buildQuery(testUser), testUser,
                    'user_info', fakeData);
            });

        it('should not use hardcoded requests or data in user_info',
            function () {
                verifyRequestAndModel(buildQuery(anotherUser), anotherUser,
                    'user_info', otherFakeData);
            });
    }