function(entity, parentId, componentId, pageId, removeExisting, hasChildren, treeAddress) {

        if (debug) console.log('_Entities.appendObj: ', entity, parentId, componentId, pageId, removeExisting, hasChildren, treeAddress);

        var lastAppendedObj;

        if (entity.type == 'User') {

            lastAppendedObj = _UsersAndGroups.appendUserElement(entity, parentId, removeExisting);
            
        } else if (entity.type == 'Group') {
            
            lastAppendedObj = _UsersAndGroups.appendGroupElement(entity, hasChildren);

        } else if (entity.type == 'Page') {
            
            lastAppendedObj = _Pages.appendPageElement(entity, hasChildren);

        } else if (entity.type == 'Component') {

            lastAppendedObj = _Pages.appendElementElement(entity, parentId, componentId, pageId, true, true, treeAddress);

        } else if (entity.type == 'Content') {

            if (debug) console.log('appending content element', entity, parentId, componentId, pageId, treeAddress);
            lastAppendedObj = _Pages.appendContentElement(entity, parentId, componentId, pageId, treeAddress);

        } else if (entity.type == 'Folder') {

            lastAppendedObj = _Files.appendFolderElement(entity, parentId, hasChildren);

        } else if (entity.type == 'Image') {
            
            if (debug) console.log('Image:', entity);
            _Files.uploadFile(entity);
            
            lastAppendedObj = _Files.appendImageElement(entity, parentId, removeExisting, hasChildren, true);
            
        } else if (entity.type == 'File') {
            
            if (debug) console.log('File: ', entity);
            _Files.uploadFile(entity);
            
            lastAppendedObj = _Files.appendFileElement(entity, parentId, removeExisting, hasChildren, false);
            
        } else {

            if (debug) console.log('Entity: ', entity);
            lastAppendedObj = _Pages.appendElementElement(entity, parentId, componentId, pageId, false, hasChildren, treeAddress);
        }

        if (debug) console.log('lastAppendedObj', lastAppendedObj);

        if (lastAppendedObj) {

            var parent = lastAppendedObj.parent();
            if (debug) console.log('lastAppendedObj.parent()', parent);
            if (parent.children('.node') && parent.children('.node').length==1) {
                
                if (debug) console.log('parent of last appended object has children');

                addExpandedNode(treeAddress);
                var ent = Structr.entityFromElement(parent);
                if (debug) console.log('entity', ent);
                ent.pageId = pageId;
                _Entities.appendExpandIcon(parent, ent, true, true);

            }
        }

    }