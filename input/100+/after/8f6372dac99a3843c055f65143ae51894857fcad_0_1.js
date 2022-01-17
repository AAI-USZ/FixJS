function() {
          this.tableList = new cdb.admin.dashboard.TableList({
            el: this.$('.content > ul'),
            model: this.tables
          });

          // User settings
          var settings = this.settings = new cdb.ui.common.Dropdown({
            target: 'a.account',
            model: {username: username},
            template_base: "dashboard/views/settings_item",
            onClick: function() {
              console.log("how does it look?");
            }
          });
          this.$el.append(this.settings.render().el);
        }