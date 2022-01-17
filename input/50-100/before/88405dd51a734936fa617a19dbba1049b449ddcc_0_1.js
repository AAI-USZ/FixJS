function _create(aField) {   
      if (Array.isArray(aField)) {
        for (let i = 0; i < aField.length; i++) {
          if (typeof aField[i] !== "string")
            aField[i] = String(aField[i]);
        }
        return aField;
      } else if (aField != null) {
        return [String(aField)];
      }
    }