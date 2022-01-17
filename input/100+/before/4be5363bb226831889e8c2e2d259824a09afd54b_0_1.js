function () {
    'use strict';

    var APP_NAME = 'HorseWiki';
    var APP_VERSION = 0.1;

    window.PageCtrl = function ($scope, $routeParams, $location, Page, OldPage, Changes, UniqueIdentifier) {

        /**
         * Sets the "active" page if we are on a special page Home/About/Contact
         */
        function setActive() {
            $scope.$parent.active = {
                home: angular.isDefined($scope.page) && $scope.page._id === 'Home' ? 'active' : '',
                about: angular.isDefined($scope.page) && $scope.page._id === 'About' ? 'active' : '',
                contact: angular.isDefined($scope.page) && $scope.page._id === 'Contact' ? 'active' : ''
            };
        }

        /**
         * Finds the initial sequence info from CouchDB then asks the Changes service to grab any
         * changes using long polling.
         * TODO: investigate how to detect changes for JUST the current page, because I think
         * this detects changes across the entire site.
         */
        function getChanges() {
            Changes.findInitialSeq(function (seq) {
                Changes.getChanges(function (res) {
                    angular.forEach(res.results, function (result) {
                        // if the changes we got back include this particular page
                        if (result.id === $scope.page._id) {
                            // we only care about latest change
                            var change = result.changes[result.changes.length - 1];
                            var currentRevNo = $scope.page._rev.split('-')[0];
                            var revNo = change.rev.split('-')[0];
                            if (revNo > currentRevNo) {
                                // we do not need to update the parent scope because the parent scope
                                // only cares about the title, which is immutable.
                                if ($scope.editing || $scope.conflict) {
                                    $scope.conflict = true;
                                    $scope.conflictingRevision = change.rev;
                                } else {
                                    $scope.page = Page.get({id: $scope.page._id, rev: change.rev});
                                }
                            }
                            return false;
                        }
                    });
                }, seq);
            });
        }

        /**
         * Examines the attachments for old revisions and throws them in an array.
         * Sorted in descending order.
         */
        function findRevisions() {
            var attachments = $scope.page._attachments;
            if (angular.isDefined(attachments)) {
                $scope.revs = [];
                angular.forEach(attachments, function (attachment, rev) {
                    $scope.revs.push(rev);
                });
                $scope.revs.sort().reverse();
                $scope.selectedRevision = $scope.revs[0];
            }
        }

        // application name
        $scope.app_name = APP_NAME;

        // version
        $scope.app_version = APP_VERSION;

        // object containing flags if a particular paragraph is being edited
        $scope.edit = {};

        // if we have a conflict (as reported by the Changes service)
        $scope.conflict = false;

        // if we are currently editing a pargagraph
        $scope.editing = false;

        // current page id (same as title)
        var id = $routeParams.pageId;

        // If we have defined a revision in the route, this sets it in the scope.
        if (angular.isDefined($routeParams.rev)) {
            $scope.rev = $routeParams.rev;
        }

        // try to get the current page.  if we can't, create it!
        if (angular.isDefined(id)) {

            // if we have a revision, get that revision using OldPage service
            if (angular.isDefined($scope.rev)) {
                $scope.page = $scope.$parent.page = OldPage.get({id: id, rev: $scope.rev}, function () {
                    setActive();
                    findRevisions();
                });
            }
            else {
                // otherwise get the page
                $scope.page = $scope.$parent.page = Page.get({id: id}, function (page) {
                    setActive();
                    getChanges();
                    findRevisions();
                    $scope.previousPage = angular.copy(page);
                }, function () {
                    // .. and upon failure, create the page.
                    Page.create({id: id}, {title: id, createdon: Date.now()}, function (res) {
                        $scope.page = $scope.$parent.page = {_id: id, title: id, _rev: res.rev};
                        setActive();
                        getChanges();
                        $scope.previousPage = angular.copy($scope.page);
                    });
                });
            }
        }

        /**
         * Enables the editor.  Does nothing if we are at an old revision, which should be readonly.
         * Sets editing flag to true.
         * @param id Paragraph ID
         */
        $scope.enableEditor = function (id) {
            if (angular.isUndefined($scope.rev)) {
                $scope.edit[id] = $scope.editing = true;
            }
        };

        /**
         * Disables the editor.  Sets editing flag to false.
         * @param id Paragraph ID.
         */
        $scope.disableEditor = function (id) {
            $scope.edit[id] = $scope.editing = false;
        };

        /**
         * Adds a paragraph to the page
         */
        $scope.addParagraph = function () {

            // if the page data is empty, we will create the data array
            if (!angular.isArray($scope.page.data)) {
                $scope.page.data = [];
            }

            // boilerplate paragraph
            $scope.page.data.push({
                text: 'Insert text here.',
                id: UniqueIdentifier()
            });

            // save the page and update the revision number of the document
            Page.save($scope.page, function (res) {
                $scope.page._rev = res.rev;
            });
        };

        /**
         * "Keeps" the current revision of a page if there si a conflict.
         */
        $scope.keep = function () {
            $scope.page._rev = $scope.conflictingRevision;
            Page.save($scope.page, function (res) {
                $scope.page._rev = res.rev;
                $scope.conflict = false;
                delete $scope.conflictingRevision;
            });
        };

        /**
         * "Discards" what you have edited if there is a conflict.
         */
        $scope.discard = function () {
            $scope.page = Page.get({id: $scope.page._id, rev: $scope.conflictingRevision}, function () {
                $scope.conflict = false;
                delete $scope.conflictingRevision;
            });
        };

        /**
         * For debugging purposes; creates a conflict on the backend without updating the model on the
         * client side.
         */
        $scope.createConflict = function () {
            $scope.conflict = true;
            var page = {
                _id: $scope.page._id,
                title: $scope.page._id,
                data: angular.copy($scope.page.data),
                _rev: $scope.page._rev
            };
            page.data.push({
                text: 'Conflicting paragraph',
                id: UniqueIdentifier()
            });
            Page.save(page, function (res) {
                $scope.conflictingRevision = res.rev;
            });
        };

        /**
         * Views a particular revision.  Note this is NOT a CouchDB revision; we are saving
         * revisions as attachments to the document.
         */
        $scope.viewRevision = function () {
            $location.url('/' + $scope.page._id + '/rev/' + $scope.selectedRevision);
        };

    };
    window.PageCtrl.$inject = ['$scope', '$routeParams', '$location', 'Page', 'OldPage', 'Changes', 'UniqueIdentifier'];


}