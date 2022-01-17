function testListItemMarkerEqualsListItemText(listItemElement, depth)
{
    return testListItemMarkerEquals(testRunner.markerTextForListItem(listItemElement), listItemElement.innerText.trim());
}