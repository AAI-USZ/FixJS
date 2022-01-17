function(bestSize, details) {
        var res, result, size;
        res = "<h2>Results</h2>";
        res += "Measured Sizes (these sizes depend from the screen size)";
        res += "<ul>";
        for (size in details) {
          result = details[size];
          res += "<li>\n  size: " + size + "px, score: " + (Math.round(result.score * 100)) + " %<br/>\n  Reaction time: average: " + result.reactionTimeAverage + ", standard deviation: " + result.reactionTimeStDev + "<br/>\n  Move time: average: " + result.moveTimeAverage + ", standard deviation: " + result.moveTimeStDev + "\n </li>";
        }
        res += "</ul>";
        res += "<p>Minimum size resulted in " + bestSize + "</p>";
        jQuery('#results').html(res);
        return this.console.info('ideal size:', size, 'detailed results:', details);
      }