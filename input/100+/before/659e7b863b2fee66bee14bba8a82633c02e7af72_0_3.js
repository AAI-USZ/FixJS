function(that){

      this.layer.attributes['visible'] = !this.layer.attributes['visible'];

      var
      title       = this.layer.get('title'),
      title_color = this.layer.get('title_color'),
      title_subs  = this.layer.get('title_subs'),
      slug        = title.replace(/ /g, "_").replace("-", "_").toLowerCase(),
      visible     = this.layer.get('visible'),
      tableName   = this.layer.get('table_name'),
      category    = this.layer.get('category_name'),
      visibility  = this.layer.get('visible');
      id          = this.layer.get('id');

      if (category === null || !category) {
        category = 'Protected Areas';
      }


      var // special layers
      semi_monthly  = GFW.app.datalayers.LayersObj.get(569),
      annual        = GFW.app.datalayers.LayersObj.get(568),
      sad           = GFW.app.datalayers.LayersObj.get(567);

      if (category != 'Forest clearing') {
        Legend.toggleItem(id, title, category, title_color, title_subs, visible);
      }

      if (slug === 'semi_monthly' || slug === "annual" || slug === "brazilian_amazon") {

        if (slug === 'semi_monthly' && showMap ) {
          Timeline.show();
        } else {
          Timeline.hide();
        }

        GFW.app.currentBaseLayer = slug;

        GFW.app._updateBaseLayer();

        if ( slug == 'semi_monthly') {
          semi_monthly.attributes['visible']  = true;
        } else if (slug == 'annual') {
          annual.attributes['visible']  = true;
        } else if (slug == 'brazilian_amazon') {
          sad.attributes['visible']  = true;
        }

        Legend.reset(id, title, category, title_color, title_subs);

      } else {

        if (visible) {
          GFW.app._addLayer(this.layer);
        } else {
          GFW.app._removeLayer(this.layer);
        }
        Filter.toggle(id);
      }

    }