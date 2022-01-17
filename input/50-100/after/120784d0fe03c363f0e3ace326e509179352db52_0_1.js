function(data, state) {
          var sanitizedData, specs;
          if (state !== apf.SUCCESS) {
            return;
          }
          sanitizedData = data.replace(/^\./gm, "");
          sanitizedData = sanitizedData.replace(/^\/node_modules\/.*/gm, "");
          specs = sanitizedData.match(/^.*\.spec\.(js|coffee)$/gm);
          if (specs != null) {
            return _this.addFiles(specs, modelTestsJasmine.queryNode("repo[1]"));
          }
        }