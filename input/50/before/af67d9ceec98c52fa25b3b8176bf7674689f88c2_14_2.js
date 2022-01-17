function testListItemMarkerEqualsListItemText(listItemElement, depth)
{
    return testListItemMarkerEquals(layoutTestController.markerTextForListItem(listItemElement), listItemElement.innerText.trim());
}