function MoveActionEditor(controller, action, colour1, colour2)
{
    MoveActionEditor.baseConstructor.call(this, controller, action, colour1, colour2);

	// Create editable contents
    var editableContents = new FlowLayout(0, 0, {minSpacing:3, orthogonalAlignment:"centre"});
    
    var currIcon = new SVGElement();
    currIcon.cloneElement(this.controller.artwork.getElementById("iconActionMove"));
    var actionButton = new RectLabel(0, 0, currIcon, {fill:colour1, stroke:"none", rx:2, width:30, height:30}, 2);
    editableContents.appendChild(actionButton);

	var moveText = new SVGElement("text", {y:12, "font-size":12}, "Move");
	editableContents.appendChild(moveText);

    this.targetItemButton = new ItemViewSelector(controller, colour1, "targetItem", "topItem");
	editableContents.appendChild(this.targetItemButton);

	var toText = new SVGElement("text", {y:12, "font-size":12}, "to");
	editableContents.appendChild(toText);

    this.destinationItemButton = new ItemViewSelector(controller, colour1, "destItem", "topItem");
	editableContents.appendChild(this.destinationItemButton);

	this.contents.prependChild(editableContents);

    this.initFromAction();
}