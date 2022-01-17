function(model, target, editable, no_contextmenu)

  {

    var data = model.getData();

    var tree = "<div class='padding dom-tree'" +

               (editable ? " edit-handler='edit-dom'" : "") + 

               " rt-id='" + model.getDataRuntimeId() + "'" +

               " data-model-id='" + model.id + "'" +

               ">";

    var i = 0;

    var node = null;

    var length = data.length;

    var attrs = null, attr = null, k = 0, key = '', attr_value = '';

    var is_open = false;

    var has_only_text_content = false;

    var one_child_text_content = '';

    var current_depth = 0;

    var child_pointer = 0;

    var child_level = 0;

    var children_length = 0;

    var closing_tags = [];

    var force_lower_case = model.isTextHtml() && window.settings.dom.get('force-lowercase');

    var show_comments = window.settings.dom.get('show-comments');

    var class_name = '';

    var re_formatted = /script|style|#comment/i;

    var style = null;

    var is_script_node = true;

    var is_debug = ini.debug;

    var disregard_force_lower_case_depth = 0;

    var depth_first_ele = model.get_depth_of_first_element();

    var show_pseudo_elements = window.settings.dom.get("show-pseudo-elements");

    var is_expandable = false;



    for ( ; node = data[i]; i += 1)

    {

      while (current_depth > node[DEPTH])

      {

        tree += closing_tags.pop();

        current_depth--;

      }

      current_depth = node[DEPTH];

      children_length = node[CHILDREN_LENGTH];

      is_expandable = children_length || (show_pseudo_elements &&

                                          node[PSEUDO_ELEMENT_LIST]);

      child_pointer = 0;



      if (force_lower_case && disregard_force_lower_case(node))

      {

        disregard_force_lower_case_depth = node[DEPTH];

        force_lower_case = false;

      }

      else if (disregard_force_lower_case_depth &&

               disregard_force_lower_case_depth == node[DEPTH])

      {

        disregard_force_lower_case_depth = 0;

        force_lower_case = model.isTextHtml() && window.settings.dom.get('force-lowercase');

      }



      switch (node[TYPE])

      {

        case PSEUDO_NODE:

        {

          if (show_pseudo_elements)

          {

            tree += "<div " + this._margin_style(node, depth_first_ele) +

                              "ref-id='" + node[ID] + "' " +

                              "handler='spotlight-node' " +

                              "data-pseudo-element='" + node[NAME] + "' " +

                              "class='spotlight-node'>" +

                      "<node class='pseudo-element'>" +

                        "&lt;::" + node[NAME] + "&gt;" +

                      "</node>" +

                    "</div>";

          }

          break;

        }

        case ELEMENT_NODE:

        {

          var node_name = (node[NAMESPACE] ? node[NAMESPACE] + ':' : '') + node[NAME];

          node_name = helpers.escapeTextHtml(node_name);

          if (force_lower_case)

          {

            node_name = node_name.toLowerCase();

          }          

          is_script_node = node[NAME].toLowerCase() == 'script';

          attrs = '';

          for (k = 0; attr = node[ATTRS][k]; k++)

          {

            attr_value = helpers.escapeAttributeHtml(attr[ATTR_VALUE]);

            attrs += " <key>" +

              ((attr[ATTR_PREFIX] ? attr[ATTR_PREFIX] + ':' : '') +

              /* Regarding escaping "<". It happens that there are very 

                 strange keys in broken html. Perhaps we will have to extend 

                 the escaping to other data tokens as well */

              (force_lower_case ? attr[ATTR_KEY].toLowerCase()

                                : attr[ATTR_KEY])).replace(/</g, '&lt;') +

              "</key>=<value" +

                (/^href|src$/i.test(attr[ATTR_KEY])

                  ? " handler='open-resource-tab' class='dom-resource-link' " +

//                  ? " handler='dom-resource-link' class='dom-resource-link' " +

                     "data-resource-url='" + attr_value + "' "

                  : "") + ">\"" +

                attr_value +

                "\"</value>";

          }



          child_pointer = i + 1;

          is_open = (data[child_pointer] && (node[DEPTH] < data[child_pointer][DEPTH]));

          if (is_open)

          {

            one_child_text_content = '';

            has_only_text_content = false;

            child_level = data[child_pointer][DEPTH];

            for ( ; data[child_pointer] && data[child_pointer][DEPTH] == child_level;

                    child_pointer += 1)

            {

              has_only_text_content = true;

              if (data[child_pointer][TYPE] != TEXT_NODE)

              {

                has_only_text_content = false;

                one_child_text_content = '';

                break;

              }

              // perhaps this needs to be adjusted. a non-closed (e.g. p) tag

              // will create an additional CRLF text node, that means the text nodes are not normalized.

              // in markup view it doesn't make sense to display such a node, still we have to ensure

              // that there is at least one text node.

              // perhaps there are other situation with not-normalized text nodes,

              // with the following code each of them will be a single text node,

              // if they contain more than just white space.

              // for exact DOM representation it is anyway better to use the DOM tree style.

              if (!one_child_text_content || !/^\s*$/.test(data[child_pointer][VALUE]))

              {

                one_child_text_content += "<text" +

                  " ref-id='" + data[child_pointer][ID] + "' " +

                  ">" + helpers.escapeTextHtml(data[child_pointer][VALUE]) + "</text>";

              }

            }

            if (has_only_text_content)

            {

              class_name = " class='spotlight-node";

              if (re_formatted.test(node_name))

              {

                class_name += " pre-wrap";

                if (is_script_node)

                {

                  class_name += " non-editable";

                }

              }

              class_name += "'";

              tree += "<div " + (node[ID] == target ? "id='target-element'" : '') +

                      this._margin_style(node, depth_first_ele) +

                      "ref-id='" + node[ID] + "' handler='spotlight-node' " +

                      (no_contextmenu ? "" : "data-menu='dom-element' ") +

                      class_name + ">" +

                          "<input handler='get-children' type='button' class='open' />" +

                          "<node>&lt;" + node_name + attrs + "&gt;</node>" +

                              one_child_text_content +

                          "<node>&lt;/" + node_name + "&gt;</node>" +

                          (is_debug && (" <d>[" + node[ID] + "]</d>" ) || "") +

                      "</div>";

              i = child_pointer - 1;

            }

            else

            {



              tree += "<div " + (node[ID] == target ? "id='target-element'" : '') +

                      this._margin_style(node, depth_first_ele) +

                      "ref-id='" + node[ID] + "' handler='spotlight-node' " +

                      (no_contextmenu ? "" : "data-menu='dom-element' ") +

                      "class='spotlight-node " + (is_script_node ? "non-editable" : "") + "'>" +

                      (is_expandable ?

                          "<input handler='get-children' type='button' class='open' />" : '') +

                          "<node>&lt;" + node_name + attrs + "&gt;</node>" +

                      (is_debug && (" <d>[" + node[ID] + "]</d>" ) || "") +

                      "</div>"; 



              closing_tags.push("<div" + this._margin_style(node, depth_first_ele) +

                                  "ref-id='" + node[ID] + "' handler='spotlight-node' " +

                                  "class='spotlight-node' " +

                                  (no_contextmenu ? "" : "data-menu='dom-element' ") +

                                  "><node>" +

                                  "&lt;/" + node_name + "&gt;" +

                                "</node></div>");

            }

          }

          else

          {

              tree += "<div " + (node[ID] == target ? "id='target-element'" : '') +

                      this._margin_style(node, depth_first_ele) +

                      "ref-id='" + node[ID] + "' handler='spotlight-node' " +

                      (no_contextmenu ? "" : "data-menu='dom-element' ") +

                      "class='spotlight-node " + (is_script_node ? "non-editable" : "") + "'>" +

                      (is_expandable ?

                          "<input handler='get-children' type='button' class='close' />" : '') +

                          "<node>&lt;" + node_name + attrs + (is_expandable ? '' : '/') + "&gt;</node>" +

                      (is_debug && (" <d>[" + node[ID] + "]</d>" ) || "") +

                      "</div>";

          }

          break;

        }



        case PROCESSING_INSTRUCTION_NODE:

        {

          tree += "<div" + this._margin_style(node, depth_first_ele) +

            "class='processing-instruction'>&lt;?" + node[NAME] + ' ' +

            formatProcessingInstructionValue(node[VALUE], force_lower_case) + "?&gt;</div>";

          break;

        }



        case COMMENT_NODE:

        {

          if (show_comments)

          {

            if (!/^\s*$/.test(node[VALUE]))

            {

              tree += "<div" + this._margin_style(node, depth_first_ele) +

                               "ref-id='" + node[ID] + "' " + 

                               "class='comment pre-wrap'>" +

                               "&lt;!--" + 

                                   helpers.escapeTextHtml(node[VALUE]) + 

                               "--&gt;</div>";

            }

          }

          break;

        }



        case DOCUMENT_NODE:

          // Don't show this in markup view

          break;



        case DOCUMENT_TYPE_NODE:

        {

          tree += "<div" + this._margin_style(node, depth_first_ele) + "class='doctype'>" +

                  "&lt;!DOCTYPE " + node[NAME] +

                    this._get_doctype_external_identifier(node) +

                  "&gt;</div>";

          break;

        }



        default:

        {

          if (!/^\s*$/.test(node[ VALUE ]))

          {

            // style and script elements are handled in 

            // the 'has_only_text_content' check, 

            // so we don't need to check here again for 'pre-wrap' content



            tree += "<div" + this._margin_style(node, depth_first_ele) + 

                             (no_contextmenu ? "" : "data-menu='dom-element' ") + 

                             ">" +

                    "<text ref-id='"+ node[ID] + "' " + 

                    ">" + helpers.escapeTextHtml(node[VALUE]) + "</text>" +

                    "</div>";

          }

        }

      }

    }



    while (closing_tags.length)

    {

      tree += closing_tags.pop();

    }

    tree += "</div>";

    return tree;

  }