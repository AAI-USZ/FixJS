function(xml, model)
{
    var itemCode = xml.getAttribute("c");
    var result = this.makeItem(itemCode);

    if (xml.hasAttribute("id"))
    {
        result.id = xml.getAttribute("id");
        model.importItem(result);
    }

    result.setHeight(parseInt(xml.getAttribute("h")), true);

	if (xml.hasAttribute("d"))
	{
		result.setDirection(xml.getAttribute("d"), true);
	}

    // Update all the child items of this item as well
    for (var i = 0; i < xml.childNodes.length; i++)
    {
        var xmlItem = xml.childNodes.item(i);

        var currItem = this.makeItemFromXML(xmlItem, model);
        result.appendItem(currItem);

        // If the item is moveable, add it to the moveable list.
        if (currItem.params.moveTowards != null)
        {
            model.addToMoveableItems(currItem);
        }
    }

	return result;
}