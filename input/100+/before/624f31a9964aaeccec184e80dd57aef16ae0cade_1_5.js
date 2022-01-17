function(modeId, modeDefinition) {
      var items = modeDefinition.items, constructor, supportedItems = globalItems.slice();
      modeDefinition.id = modeId;
      
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
        toolbarItems.changeDataMode.options.push([modeId, modeDefinition.name]);
      }

      modeDefinition.supportedItems = supportedItems;
      
      return availableModes[modeId] = new Mode(modeDefinition);
    }