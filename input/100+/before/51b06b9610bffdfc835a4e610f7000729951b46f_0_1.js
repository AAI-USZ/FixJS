function() {
        var _self;
        _self = this;
        commands.addCommand({
          name: "livecoffee",
          hint: "start livecoffee plugin",
          bindKey: {
            mac: "Command-K",
            win: "Ctrl-K"
          },
          exec: function() {
            return _self.livecoffee();
          }
        });
        this.nodes.push(menus.addItemByPath("Edit/~", new apf.divider(), DIVIDER_POSITION));
        this.nodes.push(menus.addItemByPath("Edit/LiveCoffee", new apf.item({
          command: "livecoffee"
        }), MENU_ENTRY_POSITION));
        this.hotitems['livecoffee'] = [this.nodes[1]];
      }