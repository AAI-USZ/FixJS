function() {
          this.tableList = new cdb.admin.dashboard.TableList({
            el: this.$('#tablelist'),
            model: this.tables
          });

          // D3 API Requests
          var stats = this.stats = new cdb.admin.D3Stats({
            el: this.$("div.stats")
          });

          // User settings
          var settings = this.settings = new cdb.admin.Dropdown({
            target: 'a.account',
            model: {username: username},
            template_base: "dashboard/views/settings_item"
          })
          .on("optionClicked",function(ev){})

          cdb.god.bind("closeDialogs", settings.hide, settings);

          this.$el.append(this.settings.render().el);
        }