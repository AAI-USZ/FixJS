function (field) {
      if (field === null) {
        // If field is null set to empty string
        field = '';
      } else if (typeof field === "string" && rxNeedsQuoting.test(field)) {
        // Convert string to delimited string
        field = delimiter + field + delimiter;
      } else if (typeof field === "number") {
        // Convert number to string
        field = field.toString(10);
      }

      return field;
    }