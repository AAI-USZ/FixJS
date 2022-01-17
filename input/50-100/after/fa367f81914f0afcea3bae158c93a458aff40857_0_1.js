function UserCtrl($scope, $routeParams, githubResource) {
    'use strict';

    $scope.user_info = githubResource.get({user: $routeParams.user, repo: ''});

    $scope.publicRepoForms = {
        '1': 'Public repo',
        'other': 'Public repos'
    };
    $scope.followerForms = {
        '1': 'Follower',
        'other': 'Followers'
    };
}