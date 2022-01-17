function(retval, rt_id, search_term)
  {
    var value_template = [];
    var value = "";
    var type = types[retval.value.type];
    switch (retval.value.type)
    {
    case TYPE_UNDEFINED:
    case TYPE_NULL:
      if (type.contains(search_term))
      {
        value_template.push(
          ["item",
            ["value",
              type,
             "class", type
            ]
          ]
        );
      }
      break;

    case TYPE_TRUE:
    case TYPE_FALSE:
    case TYPE_NAN:
    case TYPE_PLUS_INFINITY:
    case TYPE_MINUS_INFINITY:
      value = names[retval.value.type];
      if (value.contains(search_term))
      {
        value_template.push(
          ["item",
            ["value",
              value
            ],
           "class", type
          ]
        );
      }
      break;

    case TYPE_NUMBER:
      value = String(retval.value.number);
      if (value.contains(search_term))
      {
        value_template.push(
          ["item",
            ["value",
              value,
             "class", type
            ]
          ]
        );
      }
      break;

    case TYPE_STRING:
      value = retval.value.str;
      if (value.contains(search_term))
      {
        var short_value = value.length > STRING_MAX_VALUE_LENGTH
                        ? value.slice(0, STRING_MAX_VALUE_LENGTH) + "…"
                        : null;
        if (short_value)
        {
          value_template.push(
            ["item",
              ["input",
               "type", "button",
               "handler", "expand-value",
               "class", "folder-key"
              ],
              ["value",
                "\"" + short_value + "\"",
               "class", type,
               "data-value", "\"" + value + "\"",
              ]
            ]
          );
        }
        else
        {
          value_template.push(
            ["item",
              ["value",
                "\"" + value + "\"",
               "class", type
              ]
            ]
          );
        }
      }
      break;

    case TYPE_OBJECT:
      var object = retval.value.object;
      var name = object.className === "Function" && !object.functionName
               ? ui_strings.S_ANONYMOUS_FUNCTION_NAME
               : object.functionName;
      value = window.templates.inspected_js_object(retval.value.model, true, null, search_term);
      if (value !== "")
        value_template.push(value);
      break;
    }

    var object = retval.functionFrom;
    var func_model = new cls.InspectableJSObject(rt_id,
                                                 object.objectID,
                                                 object.functionName || ui_strings.S_ANONYMOUS_FUNCTION_NAME,
                                                 object.className);
    var func_search_term = value_template.length ? null : search_term;
    var func = window.templates.inspected_js_object(func_model, true, null, func_search_term);

    // If there is no function or value, don't show anything
    if (func === "" && !value_template.length)
      return [];

    var from_uri = window.helpers.get_script_name(retval.positionFrom.scriptID);
    from_uri = from_uri ? window.helpers.basename(from_uri) : ui_strings.S_UNKNOWN_SCRIPT;
    var to_uri = window.helpers.get_script_name(retval.positionTo.scriptID);
    to_uri = to_uri ? window.helpers.basename(to_uri) : ui_strings.S_UNKNOWN_SCRIPT;

    return [
      ["li",
        ["div",
          ["span",
            "↱",
           "class", "return-value-arrow return-value-arrow-from",
           "handler", "goto-script-line",
           "title", ui_strings.S_RETURN_VALUES_FUNCTION_FROM.replace("%s", from_uri)
                                                            .replace("%s", retval.positionFrom.lineNumber),
           "data-script-id", String(retval.positionFrom.scriptID),
           "data-script-line", String(retval.positionFrom.lineNumber)
          ],
          [func],
         "class", "return-function-from"
        ],
        (value_template.length
        ? ["div",
            ["span",
              "↳",
             "class", "return-value-arrow return-value-arrow-to",
             "handler", "goto-script-line",
             "title", ui_strings.S_RETURN_VALUES_FUNCTION_TO.replace("%s", to_uri)
                                                            .replace("%s", retval.positionTo.lineNumber),
             "data-script-id", String(retval.positionTo.scriptID),
             "data-script-line", String(retval.positionTo.lineNumber)
            ],
            value_template,
           "class", "return-value"
          ]
        : [])
      ]
    ];
  }