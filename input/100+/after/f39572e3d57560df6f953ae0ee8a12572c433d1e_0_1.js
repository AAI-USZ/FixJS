f  var value = null;

  // Complete template data for template function
  tpldata = tpldata || {};
  tpldata.idx = tpldata.idx ||
    (arrayPath ? arrayPath[arrayPath.length-1] : 1);
  tpldata.value = tpldata.value || '';
  tpldata.getValue = tpldata.getValue || function (key) {
    return getInitialValue(formObject, key, arrayPath, tpldata);
  };

  // Helper function that returns the form element that explicitly
  // references the given key in the schema.
  var getFormElement = function (elements, key) {
    var formElement = null;
    if (!elements || !elements.length) return null;
    _.each(elements, function (elt) {
      if (formElement) return;
      if (elt === key) {
        formElement = { key: elt };
        return;
      }
      if (_.isString(elt)) return;
      if (elt.key === key) {
        formElement = elt;
      }
      else if (elt.items) {
        formElement = getFormElement(elt.items, key);
      }
    });
    return formElement;
  };
  var formElement = getFormElement(formObject.form || [], key);

  if (formObject.value) {
    // If values were previously submitted, use them directly if defined
    value = getObjKey(formObject.value, applyArrayPath(key, arrayPath));
  }
  if ((typeof value === 'undefined') || (value === null)) {
    if (formElement && (typeof formElement['value'] !== 'undefined')) {
      // Extract the definition of the form field associated with
      // the key as it may override the schema's default value
      value = formElement['value'];
    }
    else {
      // Simply extract the default value from the schema
      var schemaElement = getSchemaKey(
        formObject.schema.properties, key);
      if (schemaElement) {
        value = schemaElement['default'] || '';
      }
    }
    if (value && value.indexOf('{{values.') !== -1) {
      // This label wants to use the value of another input field.
      // Convert that construct into {{getValue(key)}} for
      // Underscore to call the appropriate function of formData
      // when template gets called (note calling a function is not
      // exactly Mustache-friendly but is supported by Underscore).
      value = value.replace(
        /\{\{values\.([^\}]+)\}\}/g,
        '{{getValue("$1")}}');
    }
    if (value) {
      value = _.template(value, tpldata, valueTemplateSettings);
    }
  }

  // Apply titleMap if needed
  if ((typeof value !== 'undefined') && (value !== null) &&
    formElement && formElement.titleMap &&
    formElement.titleMap[value]) {
    value = _.template(formElement.titleMap[value],
      tpldata, valueTemplateSettings);
  }
  if (typeof value === 'undefined') return null;
  else return value;
};
