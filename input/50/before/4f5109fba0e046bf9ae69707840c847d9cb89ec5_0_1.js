function failure_message(issue) {
      return "line " + issue.line + ", char " + issue.character + ": " + encode(issue.reason);
    }