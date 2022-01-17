function(xml)

{

    MoveAction.superClass.fromXML.call(this, xml);

    this.targetItem.fromXML(xml);

	this.destItem.fromXML(xml);

}