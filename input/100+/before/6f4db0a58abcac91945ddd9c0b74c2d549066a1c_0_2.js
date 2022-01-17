function () {

    var apiBaseUrl  = findApiBaseUrl();

    var constants = {

        buttonCssClass : "gitforked-button",

        watchersCssClass: "gitforked-watchers",

        forksCssClass: "gitforked-forks",

        splitterCssClass: "gitforked-splitter",

        containerCssClass : "gitforked-button-container",

        bubbleCssClass: "gitforked-bubble",

        bubbleInnerCssClass: "gitforked-bubble-inner",

        cssUrl: apiBaseUrl + "button.css",

        githubRepoQuery: "http://github.com/api/v2/json/repos/show/"

    };



    init();

    return {

        createButton: createButton

    };



    function init() {

        addStylesheet();

        var links = findForkLinks();

        var i = links.length;

        while (i--) {

            createButton(links[i]);

        }

    }

    

    function findApiBaseUrl() {

        var scripts = document.getElementsByTagName("script");

        var i = scripts.length;

        while (i--) {

            var src = scripts[i].getAttribute("src");

            var match = /^(.*gitforked.*\/api\/.*\/)button\.js/.exec(src);

            if (match) {

                return match[1];

            }

        }

        return null;

    }



    function addStylesheet() {

        var link = document.createElement("link");

        link.setAttribute("href", constants.cssUrl);

        link.setAttribute("type", "text/css");

        link.setAttribute("rel", "stylesheet");

        var heads = document.getElementsByTagName("head");

        if (heads.length > 0) {

            heads[0].appendChild(link);

        }

        // No <head>? No service!

    }



    function findForkLinks() {

        var forkLinks = [];

        var buttonClassRegex = (new RegExp("\\b" + constants.buttonCssClass + "\\b"));

        var links = document.getElementsByTagName("a");

        var i = links.length;

        while (i--) {

            var link = links[i];

            if (!link.getAttribute("href")) continue;

            var cssClass = link.getAttribute("class");

            if (buttonClassRegex.test(cssClass)) {

                forkLinks.push(link);

            }

        }

        return forkLinks;

    }



    function createButton(link) {

        var container = wrapInContainer(link);

        var title = link.getAttribute("title");

        if (title) {

            title += " - Button by gitforked.com";

        } else {

            title = "Button by gitforked.com";

        }

        link.setAttribute("title", title);



        var repoUrl = link.getAttribute("href");

        var showForks = hasClass(link, constants.forksCssClass);

        var showWatchers = hasClass(link, constants.watchersCssClass);

        if (showForks || showWatchers) {

            getRepoInfo(repoUrl, function(repository) {

                var bubble = createBubble(

                    repoUrl, 

                    showForks ? repository.forks    : 0,

                    showWatchers ? repository.watchers : 0

                );

                container.appendChild(bubble);

            });

        }



        function createBubble(repoUrl, forks, watchers) {

            var bubbleOuter = document.createElement("span");

            bubbleOuter.setAttribute("class", constants.bubbleCssClass);

            var bubbleInner = document.createElement("span");

            bubbleInner.setAttribute("class", constants.bubbleInnerCssClass);



            var nodes = [];

            if (forks > 0) {

                nodes.push(createLink(forks, repoUrl + "/network", "Forks"));

            }

            if (watchers > 0) {

                if (nodes.length > 0) {

                    nodes.push(createSplitter());

                }

                nodes.push(createLink(watchers, repoUrl + "/watchers", "Watchers"));

            }



            for (var i = 0, l = nodes.length; i < l; i++) {

                bubbleInner.appendChild(nodes[i]);

            }

            bubbleOuter.appendChild(bubbleInner);



            return bubbleOuter;



            function createLink(content, href, title) {

                var a = document.createElement("a");

                a.setAttribute("href", href);

                a.setAttribute("title", title);

                a.appendChild(document.createTextNode(content.toString()));

                return a;

            }



            function createSplitter() {

                var splitter = document.createElement("span");

                splitter.setAttribute("class", constants.splitterCssClass);

                return splitter;

            }

        }



        function wrapInContainer(link) {

            var container = document.createElement("span");

            container.setAttribute("class", constants.containerCssClass);

            link.parentNode.insertBefore(container, link);

            container.appendChild(link);

            return container;

        }

    }



    function hasClass(element, name) {

        var cssClass = element.getAttribute("class");

        return cssClass && cssClass.match(new RegExp("\\b" + name + "\\b"));

    }



    function getRepoInfo(repoUrl, callback) {

        var path = repoUrl.match(/[^/]+\/[^/]+$/)[0];

        getRepoInfo.nextId = (getRepoInfo.nextId || 0) + 1;

        var callbackName = "forkButtonCallback" + getRepoInfo.nextId;

        var url = constants.githubRepoQuery + path + "?callback=" + callbackName;



        var script = document.createElement("script");

        script.setAttribute("src", url);

        document.body.appendChild(script);



        window[callbackName] = function (data) {

            callback(data.repository);

            

            try {

                delete window[callbackName];

            } catch (epicIEFail) {

                window[callbackName] = null;

            }

            script.parentNode.removeChild(script);

        };

    }



}