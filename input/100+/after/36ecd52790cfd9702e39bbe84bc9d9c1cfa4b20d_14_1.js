function(event)
  {

    var parents = [];      
    var cur = event.target;
    while (cur)
      parents.push(cur = cur.parentNode);

    // Hide the currently visible context menu, if any
    this.dismiss();

    Tooltips.handle_contextmenu_event(event);

    CstSelectBase.close_opened_select();

    if (/*!window.getSelection().isCollapsed ||*/ event.shiftKey) // Shift key overrides for debugging
    {
      return;
    }

    // Prevent the normal context menu from showing up
    event.preventDefault();

    var ele = event.target;
    // The previous calls could have removed the event.target from the DOM.
    // In this case we re-dispatch the event if any element in 
    // the parent node chain is still in the DOM.
    // (It would be better to get the new target with elementFromPoint 
    //  but that is currently broken in XML documents.)
    if (!document.documentElement.contains(ele))
    {
      var new_target = null;
      while (new_target = parents.shift())
      {
        if (document.documentElement.contains(new_target))
          break;
      }
      
      if (new_target)
      {
        var new_event = document.createEvent("MouseEvent");
        new_event.initMouseEvent(event.type,
                                 event.bubbles,
                                 event.cancelable,
                                 event.view,
                                 event.detail,
                                 event.screenX,
                                 event.screenY,
                                 event.clientX,
                                 event.clientY,
                                 event.ctrlKey,
                                 event.altKey,
                                 event.shiftKey,
                                 event.metaKey,
                                 event.button,
                                 event.relatedTarget);
        new_target.dispatchEvent(new_event);
      }  
      return;
    }

    var all_items = [];
    var menu_id = null;
    var last_found_menu_id = '';
    var collected_menus = [];
    var items = null;
    // This traverses up the tree and collects all menus it finds, and
    // concatenates them with a separator between each menu. It stops if it
    // finds a data-menu attribute with a blank value.
    while (ele && ele != document && (menu_id = ele.getAttribute("data-menu")) !== "")
    {
      items = null;
      if (menu_id)
      {
        last_found_menu_id = menu_id;
      }
      // Make sure the same menu is never collected twice
      if (collected_menus.indexOf(menu_id) == -1) {
        collected_menus.push(menu_id);

        var menus = this._registered_menus[menu_id];
        if (menus && menus.length)
        {
          var items = this._expand_all_items(menus, event, menu_id);
          if (items.length)
          {
            if (all_items.length)
              all_items.push(ContextMenu.separator);

            all_items = all_items.concat(items);
          }
        }
      }
      ele = ele.parentNode;
    }

    // This should preferably not be done inside ContextMenu.
    var spec = event.target.get_attr("parent-node-chain", "data-spec");
    if (spec)
    {
      var speclinks = SpecLinks.get_instance();
      var specs = speclinks.get_spec_links(spec);
      if (specs.length)
      {
        items = specs.map(function(spec)
        {
          return {
            label: ui_strings.M_CONTEXTMENU_SPEC_LINK.replace("%s", spec.prop),
            handler: function(event, target) {
              speclinks.open_spec_link(spec.url);
            },
            id: spec.prop,
            menu_id: "spec"
          };
        });
        this.register("spec", items);

        if (all_items.length)
        {
          all_items.push(ContextMenu.separator);
        }
      }
      
      if (items)
      {
        all_items = all_items.concat(items);
      }
    }
/*
    var res_id_or_url = event.target.get_attr("parent-node-chain", "data-resource-id") ||
                        event.target.get_attr("parent-node-chain", "data-resource-url");
    var line_number = event.target.get_attr('parent-node-chain', 'data-resource-line-number');
    if (res_id_or_url)
    {
      if (last_found_menu_id == "dom")
      {
        var rt_id = event.target.get_attr('parent-node-chain', 'rt-id');
        res_id_or_url = helpers.resolveURLS(runtimes.getURI(rt_id), res_id_or_url);
      }
      var broker = cls.ResourceDisplayBroker.get_instance();
      var rid = parseInt(res_id_or_url, 10);
      if (rid)
      {
        // data-resource-line-number
        var fun = function()
        {
          broker.show_resource_for_id(rid, line_number);
        }
      }
      else
      {
        var fun = function()
        {
          broker.show_resource_for_url(res_id_or_url, line_number);
        }
      }

      if (all_items.length)
      {
        all_items.push(ContextMenu.separator);
      }

      all_items.push(
        {
          label: ui_strings.M_CONTEXTMENU_SHOW_RESOURCE,
          handler: fun,
          id: res_id_or_url,
          menu_id: "resource"
        }
      )
    }
*/
    this._current_items = all_items;

    if (all_items.length)
    {
      // Prevent scrolling by mouse wheel when menu is visible
      window.onmousewheel = function(event) { event.preventDefault(); }

      this._current_event = event;
      this.show(all_items, event.clientX, event.clientY);
      this.is_visible = true;
    }
  }