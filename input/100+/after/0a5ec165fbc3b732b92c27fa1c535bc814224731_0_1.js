function(item) {
		var newItem = {};
		
		var typeID = Zotero.ItemTypes.getID(item.itemType);
		if(!typeID) {
			Zotero.debug("itemToServerJSON: Invalid itemType "+item.itemType+"; using webpage");
			item.itemType = "webpage";
			typeID = Zotero.ItemTypes.getID(item.itemType);
		}
		
		var fieldID, itemFieldID;
		for(var field in item) {
			if(field === "complete" || field === "itemID" || field === "attachments"
					|| field === "seeAlso") continue;
			
			var val = item[field];
			
			if(field === "itemType") {
				newItem[field] = val;
			} else if(field === "creators") {
				// normalize creators
				var n = val.length;
				var newCreators = newItem.creators = new Array(n);
				for(var j=0; j<n; j++) {
					var creator = val[j];
					
					if(!creator.firstName && !creator.lastName) {
						Zotero.debug("itemToServerJSON: Silently dropping empty creator");
						continue;
					}
					
					// Single-field mode
					if (!creator.firstName || (creator.fieldMode && creator.fieldMode == 1)) {
						var newCreator = {
							name: creator.lastName
						};
					}
					// Two-field mode
					else {
						var newCreator = {
							firstName: creator.firstName,
							lastName: creator.lastName
						};
					}
					
					// ensure creatorType is present and valid
					if(creator.creatorType) {
						if(Zotero.CreatorTypes.getID(creator.creatorType)) {
							newCreator.creatorType = creator.creatorType;
						} else {
							Zotero.debug("itemToServerJSON: Invalid creator type "+creator.creatorType+"; falling back to author");
						}
					}
					if(!newCreator.creatorType) newCreator.creatorType = "author";
					
					newCreators[j] = newCreator;
				}
			} else if(field === "tags") {
				// normalize tags
				var n = val.length;
				var newTags = newItem.tags = new Array(n);
				for(var j=0; j<n; j++) {
					var tag = val[j];
					if(typeof tag === "object") {
						if(tag.tag) {
							tag = tag.tag;
						} else if(tag.name) {
							tag = tag.name;
						} else {
							Zotero.debug("itemToServerJSON: Discarded invalid tag");
							continue;
						}
					}
					newTags[j] = {"tag":tag.toString(), "type":1};
				}
			} else if(field === "notes") {
				// normalize notes
				var n = val.length;
				var newNotes = newItem.notes = new Array(n);
				for(var j=0; j<n; j++) {
					var note = val[j];
					if(typeof note === "object") {
						if(!note.note) {
							Zotero.debug("itemToServerJSON: Discarded invalid note");
							continue;
						}
						note = note.note;
					}
					newNotes[j] = {"itemType":"note", "note":note.toString()};
				}
			} else if((fieldID = Zotero.ItemFields.getID(field))) {
				// if content is not a string, either stringify it or delete it
				if(typeof val !== "string") {
					if(val || val === 0) {
						val = val.toString();
					} else {
						continue;
					}
				}
				
				// map from base field if possible
				if((itemFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(typeID, fieldID))) {
					newItem[Zotero.ItemFields.getName(itemFieldID)] = val;
					continue;	// already know this is valid
				}
				
				// if field is valid for this type, set field
				if(Zotero.ItemFields.isValidForType(fieldID, typeID)) {
					newItem[field] = val;
				} else {
					Zotero.debug("itemToServerJSON: Discarded field "+field+": field not valid for type "+item.itemType, 3);
				}
			} else {
				Zotero.debug("itemToServerJSON: Discarded unknown field "+field, 3);
			}
		}
		
		return newItem;
	}