function() {

          this.header = new cdb.admin.Header({
            el: this.$('header'),
            model: this.table
          });

          this.tabs = new cdb.admin.Tabs({
            el: this.$('nav')
          });

          this.workView = new cdb.ui.common.TabPane({
            el: this.$('.panes')
          });

          this.tableTab = new cdb.admin.TableTab({
            model: this.table
          });

          this.mapTab = new cdb.admin.MapTab({
            model: this.map,
            baseLayers: this.baseLayers,
            dataLayer: this.dataLayer,
            table: this.table,
            infowindow: this.infowindow
          });

          this.menu = new cdb.admin.RightMenu({});
          this.$el.append(this.menu.render().el);
          this.menu.hide();

          // lateral menu modules
          var sql = new cdb.admin.mod.SQL({ model: this.table });
          var carto = new cdb.admin.mod.Carto({ model: this.dataLayer });
          var infowindow = new cdb.admin.mod.InfoWindow({ 
            table: this.table,
            model: this.infowindow
          });
          this.menu.addModule(sql.render(), ['table', 'map']);
          this.menu.addModule(carto.render(), 'map');
          this.menu.addModule(infowindow.render(), 'map');

          //sql.bind('sqlQuery', this.table.sql);


          this.workView.addTab('table', this.tableTab.render());
          this.workView.addTab('map', this.mapTab.render());
          this.workView.bind('tabEnabled:map', this.mapTab.enableMap, this.mapTab);

          this.workView.bind('tabEnabled', this.tabs.activate);
          this.workView.active('table');

        }