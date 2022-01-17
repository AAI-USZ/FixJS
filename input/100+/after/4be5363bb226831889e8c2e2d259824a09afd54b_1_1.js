function () {
    'use strict';

    // main module; requires ngResource to use $resource service
    var wiki = angular.module('wiki', ['ngResource']);

    /**
     * Page factory.  Gets/creates/saves pages.
     *
     * Custom method 'create' uses a PUT request to make a page.  CouchDB uses
     * PUT requests when you specify the ID of the document; if you do not want
     * to specify an ID and have CouchDB create one for you, use POST.
     */
    wiki.factory('Page', ['$resource', function ($resource) {
        return $resource(COUCHDB_URL + '/:id', {}, {
            create: {method: 'PUT'},
            save: {method: 'PUT'}
        });
    }]);

    wiki.factory('OldPage', ['$resource', function ($resource) {
        return $resource(COUCHDB_URL + '/:id/:rev');
    }]);

    /**
     * Changes factory.  Uses long polling to report changes in real-time.
     */
    wiki.factory('Changes', ['$http', function ($http) {

        var last_seq; // store for the last sequence we saw.  we need to keep it if we timeout.

        /**
         * Finds the initial sequence number.  Should be called once.
         *
         * @param callback Callback to pass the initial sequence number to.
         */
        function findInitialSeq(callback) {
            var url = COUCHDB_URL + '/_changes';
            $http({method: 'GET', url: url}).success(function (data) {
                // store the initial last sequence
                last_seq = data.last_seq;
                callback(data.last_seq);
            });
        }

        /**
         * Recursively polls the database for changes.
         *
         * @param callback Callback to pass data to
         * @param seq Sequence number to poll at.
         */
        function getChanges(callback, seq) {
            var url = COUCHDB_URL + '/_changes?feed=longpoll&since=' + seq;
            $http({method: 'GET', url: url}).success(function (data) {
                callback(data);
                // we can have an empty response from server. if it isn't empty, update last seq.
                if (angular.isDefined(data.last_seq)) {
                    last_seq = data.last_seq;
                }
                getChanges(callback, last_seq);
            });
        }

        return {
            getChanges: getChanges,
            findInitialSeq: findInitialSeq
        };

    }]);

    /**
     * Factory to generate a GUID.
     */
    wiki.factory('UniqueIdentifier', function () {

        /**
         * Guid generator.  I stole this from the interwebs.
         * @return {String} GUID
         */
        function guidGenerator() {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }

        return guidGenerator;
    });

    /**
     * Configures route provider.  Basically anything like this http://server/dir/#/Page will
     * load the 'page' partial.  Default page is Home.
     */
    wiki.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/:pageId', {templateUrl: 'partials/page.html', controller: window.PageCtrl})
            .when('/:pageId/rev/:rev', {templateUrl: 'partials/page.html', controller: window.PageCtrl})
            .otherwise({redirectTo: '/Home'});
    }]);

    /**
     * Parses wiki text and rewrites links to pages [[if they look like this]].
     */
    wiki.filter('markup', function () {
        var rxp = /\[\[(.+?)\]\]/g;
        return function (text) {
            return text.replace(rxp, '<a href="/#/$1">$1</a>');
        };
    });

    /**
     * Provides a CodeMirror editor.
     */
    wiki.directive('chEditor', ['$filter', 'Page', 'UniqueIdentifier', function ($filter, Page, UniqueIdentifier) {

        /**
         * Postprocesses paragraph data.  Does three things:
         * 1. Trims stuff.
         * 2. It finds empty paragraphs and removes them.
         * 3. It splits up paragraphs, removes the original and creates new ones if you happen to put \n\n in an edit.
         * @param data Paragraph data
         * @return {*} New improved paragraph data
         */
        function postProcessParagraphs(data) {

            angular.forEach(data, function (paragraph) {
                paragraph.text = $.trim(paragraph.text);
            });

            // remove empty ones
            data = $filter('filter')(data, function (paragraph) {
                return '' !== paragraph.text;
            });

            // insert new ones
            var newData = data.concat();
            angular.forEach(data, function (paragraph, index) {
                var paragraphs = paragraph.text.split('\n\n');
                if (paragraphs.length > 1) {
                    newData.splice(index, 1);
                    angular.forEach(paragraphs, function (paragraph) {
                        newData.splice(index, 0, {
                            text: paragraph,
                            id: UniqueIdentifier()
                        });
                        index++;
                    });
                }
            });
            return newData;
        }

        return {
            restrict: 'A',
            link: function (scope, element, attribs) {

                function close() {
                    var id = scope.$parent.paragraph.id;
                    scope.$parent.$parent.edit[id] = scope.$parent.$parent.editing = false;
                }

                /**
                 * This watch triggers when we insert attribs.ngModel into the DOM.
                 * It's like a one-time thing though so I don't know what the hell I'm doing
                 * with this watch statement.
                 */
                scope.$watch(attribs.ngModel, function () {
                    var changed = false;
                    var editor = CodeMirror.fromTextArea(element[0], {
                        mode: 'htmlmixed',
                        theme: 'neat',
                        lineWrapping: true,
                        /**
                         * If we change the text, set changed to true.
                         */
                        onChange: function () {
                            if (scope.$parent.paragraph.text !== editor.getValue()) {
                                scope.$parent.paragraph.text = editor.getValue();
                                changed = true;
                            }
                        },
                        /**
                         * If changed is true, we postprocess the data and send it off to the database.
                         *
                         * In addition, we blast the editor.
                         */
                        onBlur: function () {
                            if (changed) {

                                // grab the page from the grandfather scope
                                var page = scope.$parent.$parent.page;
                                page.data = postProcessParagraphs(page.data);

                                // if we don't have an _attachments key in our page model, add it
                                if (!page.hasOwnProperty('_attachments')) {
                                    page._attachments = {};
                                }

                                // set some timestamps
                                page.updatedon = Date.now();
                                if (!page.hasOwnProperty('createdon')) {
                                    page.createdon = page.updatedon;
                                }

                                // determine the revision number of the old page
                                var revision = page.updatedon;
                                // plunk it into the _attachments object with a base64 encoded json
                                // obj of the previous page data
                                page._attachments[revision] = {
                                    content_type: 'application/json',
                                    data: Base64.encode(angular.toJson(scope.$parent.$parent.previousPage))
                                };

                                // now, save page.
                                Page.save({id: page._id}, page, function (res) {

                                    // we must update our revision with the revision returned from the server
                                    page._rev = res.rev;

                                    // also we need to stub out any attachments so we don't hog memory
                                    page._attachments[revision].stub = true;
                                    delete page._attachments[revision].data;

                                    // finally, save the previous page data.  remove attachments from it
                                    // TODO: don't remove ALL attachments once we get img support.
                                    var previousPage = angular.copy(page);
                                    delete previousPage._attachments;
                                    scope.$parent.$parent.previousPage = previousPage;

                                    // close the editor
                                    close();
                                    changed = false;
                                }, function () {

                                    // on error just close the editor
                                    close();
                                    changed = false;
                                });
                            } else {
                                // if we haven't changed anything, close the editor.
                                close();

                                // i don't know why i'm calling this but it seems to work
                                scope.$apply();
                            }
                        },
                        /**
                         * Hitting 'return' or 'enter' will blur the editor.
                         * @param editor Editor instance
                         * @param evt Keypress event
                         */
                        onKeyEvent: function (editor, evt) {
                            if (evt.keyCode === 13 && evt.type === 'keyup' && !evt.shiftKey) {
                                close();
                                scope.$apply();
                            }
                        }
                    });
                    editor.focus();
                });
            }
        };
    }]);

    /**
     * Fancy replacement for ngShow directive.  SLOWLY hides and shows.
     */
    wiki.directive('chShow', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attribs) {
                scope.$watch(attribs.chShow, function (value) {
                    if (value) {
                        element.show('slow');
                    }
                    else {
                        element.hide('slow');
                    }
                });
            }
        };
    });

    /**
     * Stick 'ch-debug' on any tag to hide it if debug mode is off.
     */
    wiki.directive('chDebug', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                if (DEBUG) {
                    element.show();
                } else {
                    element.hide();
                }
            }
        };
    });

}