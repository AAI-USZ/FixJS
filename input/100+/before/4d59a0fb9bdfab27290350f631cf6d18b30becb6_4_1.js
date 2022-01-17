function(result) {
      var google_results, has_results, idx, key, obj, result_order, results_count, results_list, val, _i, _j, _len, _len1;
      results_list = '';
      results_count = 0;
      has_results = false;
      result_order = ['community', 'organization', 'need', 'resource'];
      for (_i = 0, _len = result_order.length; _i < _len; _i++) {
        key = result_order[_i];
        val = result[key];
        if ((val != null ? val.length : void 0) && key !== 'google') {
          results_list += "<li>\n<div class='search-header " + key + "' >\n    <img src='/static/img/" + key + ".png' >\n    <div class='search-type-header' >\n        " + titles[key] + "\n        <span class='search-results-count'>\n            " + (interpolate(ngettext('%s result', '%s results', val.length), [val.length])) + "\n        </span>\n    </div>\n</div>\n<ul class='search-result-entries'>";
          for (idx in val) {
            obj = val[idx];
            results_list += "<li>\n    <a href='" + obj.link + "'> " + obj.name + " </a>\n    <div class=\"right\">\n        <a href=\"#\" onclick=\"seeOnMap('" + key + "', JSON.parse(localStorageGet('komoo_search').results['" + key + "'][" + idx + "].geojson));return false;\"><i class=\"icon-see-on-map\"></i></a>\n    </div>\n</li>";
            results_count++;
          }
          results_list += '</ul></li>';
          has_results |= true;
        } else {
          has_results |= false;
        }
      }
      google_results = JSON.parse(result.google).predictions;
      if (google_results != null ? google_results.length : void 0) {
        key = 'google';
        results_list += "<li>\n<div class=\"search-header google\">\n    <img src=\"/static/img/" + key + ".png\" >\n    <div class=\"search-type-header\" >\n        " + titles[key] + "\n        <span class=\"search-results-count\">\n            " + (interpolate(ngettext("%s result", "%s results", google_results.length), [google_results.length])) + "\n        </span>\n    </div>\n</div>\n<ul class=\"search-result-entries\">";
        for (_j = 0, _len1 = google_results.length; _j < _len1; _j++) {
          obj = google_results[_j];
          results_list += "<li>\n    <a href=\"#\" > " + obj.description + "</a>\n    <div class=\"right\">\n        <a href=\"#\" onclick=\"seeOnMap('google', '" + obj.description + "');return false;\"><i class=\"icon-see-on-map\"></i></a>\n    </div>\n</li>";
          results_count++;
        }
        results_list += '</ul></li>';
        has_results |= true;
      } else {
        has_results |= false;
      }
      if (!has_results) {
        results_list = "<div class=\"search-no-results\"> " + (gettext('No results found!')) + "</div>";
      }
      $('#search-results-box').data('popover').options.title = "" + results_count + " Results <span id=\"search-box-close\" >x</span>";
      $('#search-results-box').data('popover').options.content = results_list;
      showPopover();
      return cl.hide();
    }