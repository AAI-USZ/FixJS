function(item)

{

    // We only care about items with ids.

    if (item.id == null)

        return;

        

    // When importing items, we need to take into account existing item ids,

    // to ensure we don't issue one that already exists.

    // We do so by ensuring our item id index is always greater than any

    // imported item id.

    var idIndex = parseInt(item.id.slice(2)); // remove the prefix "i_"

    if (idIndex >= this.itemIdIndex)

        this.itemIdIndex = idIndex + 1;

        

    this.itemIdList[item.id] = item;

}