function(item, cslItem) {
		var isZoteroItem = item instanceof Zotero.Item, zoteroType;
		
		for(var type in CSL_TYPE_MAPPINGS) {
			if(CSL_TYPE_MAPPINGS[type] == cslItem.type) {
				zoteroType = type;
				break;
			}
		}
		if(!zoteroType) zoteroType = "document";
		
		var itemTypeID = Zotero.ItemTypes.getID(zoteroType);
		if(isZoteroItem) {
			item.setType(itemTypeID);
		} else {
			item.itemID = cslItem.id;
			item.itemType = zoteroType;
		}
		
		// map text fields
		for(var variable in CSL_TEXT_MAPPINGS) {
			if(variable in cslItem) {
				var textMappings = CSL_TEXT_MAPPINGS[variable];
				for(var i in textMappings) {
					var field = textMappings[i],
						fieldID = Zotero.ItemFields.getID(field);
					if(Zotero.ItemFields.isBaseField(fieldID)) {
						var newFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(itemTypeID, fieldID);
						if(newFieldID) fieldID = newFieldID;
					}
					
					if(Zotero.ItemFields.isValidForType(fieldID, itemTypeID)) {
						if(isZoteroItem) {
							item.setField(fieldID, cslItem[variable], true);
						} else {
							item[field] = cslItem[variable];
						}
					}
				}
			}
		}
		
		// separate name variables
		for(var field in CSL_NAMES_MAPPINGS) {
			if(CSL_NAMES_MAPPINGS[field] in cslItem) {
				var creatorTypeID = Zotero.CreatorTypes.getID(field);
				if(!Zotero.CreatorTypes.isValidForItemType(creatorTypeID, itemTypeID)) {
					creatorTypeID = Zotero.CreatorTypes.getPrimaryIDForType(itemTypeID);
				}
				
				var nameMappings = cslItem[CSL_NAMES_MAPPINGS[field]];
				for(var i in nameMappings) {
					var cslAuthor = nameMappings[i],
						creator = isZoteroItem ? new Zotero.Creator() : {};
					if(cslAuthor.family || cslAuthor.given) {
						if(cslAuthor.family) creator.lastName = cslAuthor.family;
						if(cslAuthor.given) creator.firstName = cslAuthor.given;
					} else if(cslAuthor.literal) {
						creator.lastName = cslAuthor.literal;
						creator.fieldMode = 1;
					} else {
						continue;
					}
					
					if(isZoteroItem) {
						item.setCreator(item.getCreators().length, creator, creatorTypeID);
					} else {
						creator.creatorType = Zotero.CreatorTypes.getName(creatorTypeID);
						item.creators.push(creator);
					}
				}
			}
		}
		
		// get date variables
		for(var variable in CSL_DATE_MAPPINGS) {
			if(variable in cslItem) {
				var field = CSL_DATE_MAPPINGS[variable],
					fieldID = Zotero.ItemFields.getID(field),
					cslDate = cslItem[variable];
				var fieldID = Zotero.ItemFields.getID(field);
				if(Zotero.ItemFields.isBaseField(fieldID)) {
					var newFieldID = Zotero.ItemFields.getFieldIDFromTypeAndBase(itemTypeID, fieldID);
					if(newFieldID) fieldID = newFieldID;
				}
				
				if(Zotero.ItemFields.isValidForType(fieldID, itemTypeID)) {
					var date = "";
					if(cslDate.literal) {
						if(variable === "accessed") {
							date = strToISO(cslDate.literal);
						} else {
							date = cslDate.literal;
						}
					} else if(cslDate.year) {
						if(variable === "accessed") {
							// Need to convert to SQL
							var date = Zotero.Utilities.lpad(cslDate.year, "0", 4);
							if(cslDate.month) {
								date += "-"+Zotero.Utilities.lpad(cslDate.month+1, "0", 2);
								if(cslDate.day) {
									date += "-"+Zotero.Utilities.lpad(cslDate.day, "0", 2);
								}
							}
						} else {
							if(cslDate.month) cslDate.month--;
							date = Zotero.Date.formatDate(cslDate);
							if(cslDate.season) {
								date = date+" "+cslDate.season;
							}
						}
					}
					
					if(isZoteroItem) {
						item.setField(fieldID, date);
					} else {
						item[field] = date;
					}
				}
			}
		}
	}