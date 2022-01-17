function(){
      var latestSearch;
      var currentFilterParams;

      Cell.subscribeMultipleValues(function (term, filterParams) {
        latestSearch = term;
        currentFilterParams = filterParams;
      }, self.lookupIdCell, self.filter.filterParamsCell);

      docsLookup.keyup(function (e) {
        var docsLookupVal = $.trim($(this).val());
        if (latestSearch === docsLookupVal) {
          return true;
        }
        if (!docsLookupVal) {
          delete currentFilterParams.startkey;
          delete currentFilterParams.endkey;
          self.lookupIdCell.setValue(undefined);
        } else {
          self.lookupIdCell.setValue(docsLookupVal);
          var start = JSON.stringify(docsLookupVal);
          var end = JSON.stringify(docsLookupVal + String.fromCharCode(0xffff));
          if (currentFilterParams.descending && currentFilterParams.descending === 'true') {  
            currentFilterParams.startkey = end;
            currentFilterParams.endkey = start;
          } else {
            currentFilterParams.startkey = start;
            currentFilterParams.endkey = end;
          }
        }
        self.filter.rawFilterParamsCell.setValue($.isEmptyObject(currentFilterParams) ? undefined : $.param(currentFilterParams, true));
        self.documentsPageNumberCell.setValue(0);
      });
    }