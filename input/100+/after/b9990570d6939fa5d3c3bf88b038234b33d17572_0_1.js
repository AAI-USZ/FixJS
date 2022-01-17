function(data) {
      var self = this,
          $shell = $('#shell'),
          $oldInputContainer = $shell.find("#shell-oldinput-container"),
          $waiting = $shell.find('.shell-wait'),
          $input = $shell.find("#shell-command-input"),
          history = self.options.history,
          html,
          $contentInner,
          result;

      $waiting.remove();
      $input.attr("disabled", "");

      if ($oldInputContainer.find('.shell-history-line').length >= 15) {
        $oldInputContainer.find('.shell-history-line').first().remove();
        $oldInputContainer.find('.shell-history-result-line').first().remove();
      }

      if (!data) {
        html = self._buildResultLine("shell-error shell-history-result-line", "Internal error - Undefined result.");
        $oldInputContainer.append(html);
        return;
      }

      if (data.code && data.code === "error") {
        html = self._buildResultLine("shell-error shell-history-result-line", "Error: " + data.reason);
        $oldInputContainer.append(html);
        return;
      }

      if (!data.op) {
        self._logToConsole("Found no data.op or other suitable data");
        return;
      }

      if (data.code === "success") {
        result = "Completed in " + data.ms + "ms";

        switch (data.op) {
          case "count":
            result += self._buildCountResult(data.result);
            break;
          case "distinct":
            result += self._buildDistinctResult(data.result);
            break;
          case "distribution":
            result += self._buildDistributionResult(data.result);
            break;
        }

        if (data.op === "findresult") {
          $contentInner = $("#content-inner");
          $contentInner.html(data.content);
        }

        html = self._buildResultLine("shell-success shell-history-result-line", result);
        $oldInputContainer.append(html);
      }
    }