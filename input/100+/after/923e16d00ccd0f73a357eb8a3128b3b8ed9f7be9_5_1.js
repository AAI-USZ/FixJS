function(id, name, container_class, data_reference)

  {

    this.required_services = ["cookie-manager", "ecmascript-debugger"];

    this.init(id, name, container_class, null, "cookiemanager-container");



    this.shared_shortcuts = "storage";

    ActionHandlerInterface.apply(this);

    this._handlers = {

      "submit": this._submit.bind(this),

      "cancel": this._cancel.bind(this),

      "remove-item": this._remove_item.bind(this),

      "select-row": this.select_row.bind(this),

      "enter-edit-mode": this.enter_edit_mode.bind(this),

      "add-cookie": this.click_add_cookie_button.bind(this)

    };



    this.onclick = function(event)

    {

      var is_editing = this.mode == MODE_EDIT;

      /**

        * Prevent exiting edit mode when

        * add button was clicked (so more rows can be added at a time) OR

        * the click was within an edit container (to allow changing fields)

        */

      var is_add_button = event.target.hasClass("add_storage_button");

      var has_edit_parent = event.target.get_ancestor(".edit_mode");

      if (!is_add_button && !has_edit_parent)

      {

        this._handlers["submit"]();

      }

      if (is_editing)

      {

        return false;

      }

    };

    ActionBroker.get_instance().register_handler(this);



    this.data = data_reference;

    this._bound_update_expiry = this._update_expiry.bind(this);



    var contextmenu = ContextMenu.get_instance();

    contextmenu.register(id, [

      {

        label: ui_strings.S_LABEL_STORAGE_UPDATE,

        handler: this.data.refetch.bind(this.data)

      }

    ]);

    contextmenu.register("cookie_context", [

      {

        callback: this._create_context_menu.bind(this)

      }

    ]);



    this._tabledef = {

      groups: {

        runtime: {

          label: ui_strings.S_LABEL_COOKIE_MANAGER_GROUPER_RUNTIME,

          use_ellipsis: true,

          grouper: function(obj) {

            return obj._rt_id;

          },

          renderer: function(groupvalue, obj) {

            return templates.cookie_manager.runtime_group_render(obj[0]._rt_protocol,

                                                                 obj[0]._rt_hostname,

                                                                 obj[0]._rt_path);

          }

        }

      },

      column_order: ["domain", "name", "value", "path", "expires", "isSecure", "isHTTPOnly"],

      idgetter: function(res) { return res._objectref },

      columns: {

        domain: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_COOKIE_DOMAIN),

          classname: "col_domain",

          renderer: this._domain_renderer.bind(this),

          summer: function(values, groupname, getter) {

            return [

              "span", ui_strings.S_LABEL_COOKIE_MANAGER_ADD_COOKIE,

              "class", "add_storage_button ui-button",

              "handler", "cookiemanager-add-cookie-row",

              "unselectable", "on",

              "tabindex", "1"

            ];

          },

          sorter: this._make_sorter("domain")

        },

        name: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_COOKIE_NAME),

          classname: "col_name",

          renderer: function(obj) {

            if (obj._is_runtime_placeholder)

            {

              return;

            }

            return templates.cookie_manager.editable_name(obj.name);

          },

          sorter: this._make_sorter("name")

        },

        value: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_COOKIE_VALUE),

          classname: "col_value",

          renderer: function(obj) {

            if (obj._is_runtime_placeholder)

            {

              return;

            }

            return templates.cookie_manager.editable_value(obj.value);

          },

          sorter: this._make_sorter("value")

        },

        path: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_COOKIE_PATH),

          classname: "col_path",

          renderer: function(obj) {

            if (obj._is_runtime_placeholder)

            {

              return;

            }

            return templates.cookie_manager.editable_path(obj.path);

          },

          sorter: this._make_sorter("path")

        },

        expires: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_COOKIE_EXPIRES),

          classname: "col_expires",

          renderer: function(obj) {

            if (obj._is_runtime_placeholder)

            {

              return;

            }

            return templates.cookie_manager.editable_expires(obj.expires, obj._objectref);

          },

          sorter: this._make_sorter("expires")

        },

        isSecure: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_SECURE_CONNECTIONS_ONLY),

          classname: "col_secure",

          renderer: this._is_secure_renderer.bind(this),

          align: "center",

          sorter: this._make_sorter("isSecure")

        },

        isHTTPOnly: {

          label: templates.storage.wrap_ellipsis(ui_strings.S_LABEL_COOKIE_MANAGER_HTTP_ONLY),

          classname: "col_httponly",

          renderer: this._is_http_only_renderer.bind(this),

          align: "center",

          sorter: this._make_sorter("isHTTPOnly")

        }

      },

      options: {

        no_group_changing: true

      }

    };

    this._sortable_table = new SortableTable(this._tabledef, 

                                             null, 

                                             null, 

                                             "domain", 

                                             "runtime", 

                                             true, 

                                             "cookie-inspector");



    this._sortable_table.add_listener("before-render", this._before_table_render.bind(this));

    this._sortable_table.add_listener("after-render", this._after_table_render.bind(this));

  }