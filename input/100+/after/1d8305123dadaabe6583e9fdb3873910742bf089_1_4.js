function findMenuObject(items, node, menuItem)
{
    for (var property in items.items){
        if(property == menuItem){
            executeMenuActions(items.items[property], node);
        } else {
            if (items.items[property].hasOwnProperty('items')){
                findMenuObject(items.items[property], node, menuItem);
            }
        }
    }
}