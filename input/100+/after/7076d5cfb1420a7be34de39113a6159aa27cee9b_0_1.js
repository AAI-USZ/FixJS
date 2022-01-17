function () {
    var reqData = {};

    switch (this.filter) {

      case "checks":
        if (this.checks.length) {
         reqData.checks = this.checks.join(",");
        }
        break;

      case "search":
        reqData.search = this.searchText;

        // Override defaults if any fields have been specified
        if (this.searchFields.length) {
          reqData.sfields = this.searchFields;
        } else {
          reqData.sfields = ["source", "target"];
        }
        break;

      case "suggestions":
        reqData.matchnames = 'hassuggestion'
        break;

      case "mysuggestions":
        reqData.matchnames = 'ownsuggestion'
        break;

      case "all":
        break;

      case "incomplete":
        reqData.unitstates = "untranslated,fuzzy";
        break;

      default:
        reqData.unitstates = this.filter;
        break;
    }

    return reqData;
  }