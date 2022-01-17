function(component, parentId, componentId, pageId, removeExisting, hasChildren) {
	if (debug) console.log('Components.appendComponentElement: parentId: ' + parentId + ', pageId: ' + pageId);

	var parent = Structr.findParent(parentId, componentId, pageId, components);
        
        if (!parent) return false;
        
        var name = component.name;
        var kind = component.kind;

	parent.append('<div class="node component ' + component.id + '_">'
	    + '<img class="typeIcon" src="'+ _Components.icon + '">'
	    + '<b class="name_">' + (name ? name : '') + '</b> [<b class="kind_">' + (kind ? kind : '') + '</b>] <span class="id">' + component.id + '</span>'
	    + '</div>');
        
	var div = Structr.node(component.id, parentId);
	div.append('<img title="Delete component \'' + name + '\' ' + component.id + '" alt="Delete component \'' + name + '\' ' + component.id + '" class="delete_icon button" src="' + Structr.delete_icon + '">');
	$('.delete_icon', div).on('click', function(e) {
            e.stopPropagation();
	    _Components.deleteComponent(this, component);
	});

//	div.append('<img title="Create Form" alt="Create Form" class="add_form_icon button" src="icon/application_form_add.png">');
//	$('.add_form_icon', div).on('click', function(e) {
//            e.stopPropagation();
//	    _Components.createForm(this, component);
//	});

	component.pageId = pageId;
        
        _Entities.appendExpandIcon(div, component, hasChildren);
	_Entities.setMouseOver(div);
	_Entities.appendEditPropertiesIcon(div, component);

	div.droppable({
	    accept: '.element',
	    greedy: true,
	    hoverClass: 'nodeHover',
            tolerance: 'pointer',
	    drop: function(event, ui) {
		var self = $(this);
		var elementId = getId(ui.draggable);
		var pageId = getId(self);
		if (!pageId) pageId = '*';
		var pos = $('.element', self).length;
		var nodeData = {};
		nodeData.id = elementId;
		var relData = {};
		relData[pageId] = pos;
		Command.createAndAdd(pageId, nodeData, relData);
	    }
	});

	return div;
    }