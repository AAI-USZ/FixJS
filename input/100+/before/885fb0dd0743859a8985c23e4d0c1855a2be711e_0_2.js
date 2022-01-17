function update() {
        var template = $route.current && $route.current.template,
            thisChangeId = ++changeCounter;

        function clearContent() {
          // ignore callback if another route change occured since
          if (thisChangeId === changeCounter) {
            element.html('');
            destroyLastScope();
          }
        }

        if (template) {
          $http.get(template, {cache: $templateCache}).success(function(response) {
            // ignore callback if another route change occured since
            if (thisChangeId === changeCounter) {
              element.html(response);
              destroyLastScope();

              var link = $compile(element.contents()),
                  current = $route.current,
                  controller;

              lastScope = current.scope = scope.$new();
              if (current.controller) {
                controller = $controller(current.controller, {$scope: lastScope});
                element.contents().data('$ngControllerController', controller);
              }

              link(lastScope);
              lastScope.$emit('$viewContentLoaded');
              lastScope.$eval(onloadExp);

              // $anchorScroll might listen on event...
              $anchorScroll();
            }
          }).error(clearContent);
        } else {
          clearContent();
        }
      }