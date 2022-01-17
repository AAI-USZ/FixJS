function memoizeFocusedSpec() {
      if (specName) {
        return;
      }

      var paramMap = [];
      var params = jasmine.HtmlReporter.parameters(doc);

      for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        paramMap[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
      }

      specName = paramMap.spec;
    }