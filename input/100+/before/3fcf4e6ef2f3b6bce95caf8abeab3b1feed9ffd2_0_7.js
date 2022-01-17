function(modeId, spec) {
      var mode = spec(), items = mode.items, constructor, supportedItems = globalItems.slice();
      mode.id = modeId;
      
      if(items) {
        for( item in items) {
          if(items.hasOwnProperty(item) && item !== "default") {
            supportedItems.push(item);
            if(!toolbarItems[item]) {
              constructor = items[item].options ? ToolbarSelect : ToolbarButton;
              toolbarItems[item] = new constructor(item);
            }
            toolbarItems[item][modeId] = $.extend({name: item}, items["default"], items[item]);
          }
        }
      }

      if(modeId !== 'wysiwyg'){
        toolbarItems.changeDataMode.options.push([modeId, mode.name]);
      }

      mode.supportedItems = supportedItems;
      
      availableModes[modeId] = function(editor) {
        var modeInstance = new Mode(mode);
        
        modeInstance.load(editor);
        
        return modeInstance;
      };
      return mode;
    }