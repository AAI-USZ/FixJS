function(){
  Ext.define('ContentModelViewer.widgets.OverviewPanel', {
    extend: 'Ext.panel.Panel',
    itemId: 'overview',
    title: 'Overview',
    layout: {
      type: 'border'
    },
    items: [{
      xtype: 'panel',
      autoScroll: true,
      html: '<div>Loading...</div>',
      loader: {
        url: ContentModelViewer.properties.url.object.overview,
        //renderer: 'data',
        renderer: function(loader, response, active) {
          var json = Ext.JSON.decode(response.responseText);
          loader.getTarget().update(json.data);
          if(json.settings !== null) { // Update settings.
            jQuery.extend(Drupal.settings, json.settings);
            Drupal.attachBehaviors();
          }
          if(json.func) {
            eval(json.func)();
          }
          return true;
        },
        autoLoad: true
      },
      tpl: new Ext.Template('{data}'),
      listeners: {
        afterrender: function(panel, options) {
        }
      },
      region: 'center'
    }, {
      xtype: 'panel',
      title: 'Files',
      width: 260,
      collapsed: true,
      collapsible: true,
      split: true,
      region: 'east',
      fbar:[{
        xtype: 'panel',
        html: 'Very large files may take a long time to appear in the viewer. It may be more convenient to download the file directly in these cases.',
      }],
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          xtype: 'button',
          text: 'View',
          cls: 'x-btn-text-icon',
          iconCls: 'view-datastream-icon',
          disabled: true,
          id: 'overview-view-file',
          handler : function() {
            var view = this.up('panel').down('dataview');
            var selectionModel = view.getSelectionModel();
            if(selectionModel.hasSelection()) {
              var record = selectionModel.selected.first();
              ContentModelViewer.functions.selectDatastreamRecord(record);
              ContentModelViewer.functions.viewSelectedDatastreamRecord();
              this.up('panel').collapse();
            }
          }
        }, {
          xtype: 'button',
          text: 'Download',
          cls: 'x-btn-text-icon',
          iconCls: 'download-datastream-icon',
          disabled: true,
          id: 'overview-download-file',
          handler : function() {
            var view = this.up('panel').down('dataview');
            var selectionModel = view.getSelectionModel();
            if(selectionModel.hasSelection()) {
              var record = selectionModel.selected.first();
              var dsid = record.get('dsid');
              var url = ContentModelViewer.properties.url.datastream.download(dsid);
              var form = Ext.get("datastream-download-form");
              form.set({
                action: url
              });
              document.forms["datastream-download-form"].submit();
            }
          }
        }]
      },{
        xtype: 'pagingtoolbar',
        store: Ext.data.StoreManager.lookup('files'),   // same store GridPanel is using
        dock: 'bottom'
      }],
      items: [{
        xtype: 'dataview',
        store: Ext.data.StoreManager.lookup('files'),
        itemSelector: 'div.file-item',
        emptyText: 'No Files Available',
        deferEmptyText: false,
        id: 'overview-file-selector',
        itemTpl: new Ext.XTemplate(
          '<tpl for=".">',
          '   <div class="file-item">',
          '       <div class="file-item-dsid">{[fm.ellipsis(values.dsid, 30, true)]}</div>',
          '       <img class="file-item-img file-item-show-view" src="{tn}"></img>',
          '       <tpl if="this.showLabel(label)">',
          '           <div class="file-item-label">{[fm.ellipsis(values.label, 30, true)]}</div>',
          '       </tpl>',
          '   </div>',
          '</tpl>',
          {
            compiled: true,
            disableFormats: true,
            showLabel: function(label) {
              return jQuery.trim(label) != '';
            }
          }),
        listeners: {
          beforerender: function(view) {
            var store = view.getStore();
            var expand = (function() {
              var panel = view.up('panel');
              if(store.getCount() > 0) {
                panel.expand(false);
                return true;
              }
              return false;
            });
            if(!expand()) { // There is no data wait for it to load first.
              store.on('load', expand);
            }
          },
          selectionchange: function(view, selections, options) {
            var button, record = selections[0];
            if(record) {
              button = Ext.getCmp('overview-view-file');
              record.get('view') ? button.enable() : button.disable();
              button = Ext.getCmp('overview-download-file');
              record.get('download') ? button.enable() : button.disable();
              var viewerSelector = Ext.getCmp('viewer-file-selector');
              // only try to select if the "Viewer" tab's loaded
              if (viewerSelector.getSelectionModel().store) { 
                viewerSelector.getSelectionModel().select(record.index);
              }
            }
          } 
        }    
      }]
    }]
  });
}