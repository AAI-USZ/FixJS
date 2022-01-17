function(){
  Ext.define('ContentModelViewer.widgets.ViewerPanel', {
    extend: 'Ext.panel.Panel',
    itemId: 'viewer',
    title: 'Viewer',
    layout: {
      type: 'border'
    },
    fbar: 'Objects in the rear view mirror may be closer than they appear',
    listeners: {
      afterrender: function() {
        var selectionModel = Ext.getCmp('viewer-file-selector').getSelectionModel();
        var overviewSelectionModel = Ext.getCmp('overview-file-selector').getSelectionModel();
        if (selectionModel.selected.length == 0) {
          var selectIndex = 0;
          if (overviewSelectionModel.selected.length > 0) {
            selectIndex = overviewSelectionModel.selected.items[0].index;
          }
          selectionModel.select(selectIndex);
          var record = selectionModel.selected.first();
          ContentModelViewer.functions.selectDatastreamRecord(record);
          ContentModelViewer.functions.viewSelectedDatastreamRecord();            
        }      
      }
    },
    items: [{
      xtype: 'panel',
      region: 'center',
      id: 'datastream-viewer',
      autoScroll: true,
      loader: {
        url: ContentModelViewer.properties.url.datastream.view(ContentModelViewer.properties.dsid),
        renderer: 'html',
        loadMask: true,
        autoLoad: true,
        success: function() {
          ContentModelViewer.functions.callDatastreamViewFunction();
        }
      }
    }, {
      xtype: 'panel',
      title: 'Files',
      width: 260,
      collapsible: true,
      collapsed: false,
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
          id: 'viewer-view-file',
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
          id: 'viewer-download-file',
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
        id: 'viewer-file-selector',
        itemSelector: 'div.file-item',
        emptyText: 'No Files Available',
        deferEmptyText: false,
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
          selectionchange: function(view, selections, options) {
            var button, record = selections[0];
            if(record) {
              button = Ext.getCmp('viewer-view-file');
              record.get('view') ? button.enable() : button.disable();
              button = Ext.getCmp('viewer-download-file');
              record.get('download') ? button.enable() : button.disable();
              var overviewSelector = Ext.getCmp('overview-file-selector');
              if (overviewSelector.getSelectionModel().store) {
                overviewSelector.getSelectionModel().select(record.index);                
              }
            }
          } 
        }    
      }]
    }]
  });
}