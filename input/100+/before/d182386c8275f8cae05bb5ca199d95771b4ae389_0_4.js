function createIndexItem(objid, indexProject) {

	// make a visual icon for the object comprising a group with box, scaled view and text label

	// (currently id)

	indexProject.activate();

	var symbol = objectSymbols[objid];

	var symbolDef = symbol.definition.copyTo(indexProject);

	var indexSymbol = new paper.Symbol(symbolDef);

	var symbolBounds = indexSymbol.definition.bounds;

	var scale = (symbolBounds) ? Math.min((INDEX_CELL_SIZE-INDEX_CELL_MARGIN)/(symbolBounds.width+INDEX_CELL_MARGIN),

			(INDEX_CELL_SIZE-INDEX_LABEL_HEIGHT-INDEX_CELL_MARGIN)/(symbolBounds.height+INDEX_CELL_MARGIN)) : 1;

	var placed = indexSymbol.place();

	placed.scale(scale);

	placed.name = objid;

	placed.translate(new paper.Point(INDEX_CELL_SIZE/2, (INDEX_CELL_SIZE-INDEX_LABEL_HEIGHT)/2));

	var label = new paper.PointText(new paper.Point(INDEX_CELL_SIZE/2, INDEX_CELL_SIZE-INDEX_LABEL_HEIGHT+pt2px(LABEL_FONT_SIZE)));

	label.content = objid;

	label.paragraphStyle.justification = 'center';

	label.characterStyle = { fillColor: 'black', fontSize: LABEL_FONT_SIZE };

	

	var box = new paper.Path.Rectangle(new paper.Point(INDEX_CELL_MARGIN/2, INDEX_CELL_MARGIN/2),

			new paper.Point(INDEX_CELL_SIZE-INDEX_CELL_MARGIN/2, INDEX_CELL_SIZE-INDEX_LABEL_HEIGHT-INDEX_CELL_MARGIN/2));

	box.strokeColor = 'grey';		

	var group = new paper.Group([placed, box, label]);

	// name is object id

	//complicates matters if it has a name!

	//group.name = objid;



	return group;

}