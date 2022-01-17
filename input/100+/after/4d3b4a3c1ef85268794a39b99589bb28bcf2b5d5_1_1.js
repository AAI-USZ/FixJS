function() {

          this.workView = new cdb.ui.common.TabPane({
            el: this.$('.panes')
          });

          this.tableTab = new cdb.admin.TableTab({
            model: this.table
          });

          this.mapTab = new cdb.admin.MapTab({
            model: this.map
          });


          this.workView.addTab('table', this.tableTab.render());
          this.workView.addTab('map', this.mapTab.render());
          this.mapTab.enableMap();

          this.workView.active('table');

        }