function(res) {
    if (res == undefined) {
      output("Internal error - Undefined result.");
      return;
    }

    if (res.code == "success") {
      x = "Completed in " + res.ms + "ms";

      switch (res.op) {
        case "count":
          x += " - Count result: " + "<span class=\"shell-result-string\">" + htmlEncode(res.result) + "</span>";
          break;
        case "distinct":
          x += " - Distinct result: " + "<span class=\"shell-result-string\">";
          if (res.result.length == 0) {
            x += "No matches.";
          } else {
            for (key in res.result) {
              x += htmlEncode(res.result[key]) + ", ";
            }
            x = x.substring(0, x.length - 2); // Remove last comma and whitespace.
            x += "</span>"
          }
          break;
        case "distribution":
          x += " - Distribution result: " + "<span class=\"shell-result-string\">";
          if (res.result.length == 0) {
            x += "No matches.";
          } else {
            for (key in res.result) {
              x += htmlEncode(res.result[key]["distinct"]) + "(" + parseInt(res.result[key]["count"]) + "), ";
            }
            x = x.substring(0, x.length - 2); // Remove last comma and whitespace.
            x += "</span>"
          }
          break;
      }

      output(x);

      if (res.op == "find") {
        render_result_content(res);
      }
    } else {
      output("Error: " + htmlEncode(res.reason));
    }
  }