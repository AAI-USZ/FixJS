function fetchSourceProfile(idProfile)
		{
			var exampleRows = getDbRows();
			for (var i=0; i < exampleRows.length; ++i) {
				var doc = exampleRows[i].value;
				if (!doc)
					continue;
				var guid = idProfile.substring(0, idProfile.length - "_source".length);
				if (doc._id != guid)
					continue;
				if (doc.head.contentType == "chiasm" || doc.head.contentType == "outline")
				{
					//alert(JSON.stringify(doc));
					// create a profile
					var sourceFormFields = CreateEmptySourceFormData();
					sourceFormFields._id = guid;
					sourceFormFields.outline._id = guid;
					if (doc.head.source){
						sourceFormFields.outline.source.details = EmptyIfNull(doc.head.source.details);					
						sourceFormFields.outline.source.website = EmptyIfNull(doc.head.source.website);
					}
					// get source profile
					var commonSourceProfile = getCommonSourceProfile(doc, exampleRows);
					fillCommonSourceData(sourceFormFields, commonSourceProfile);
					//if (doc.head.source)
					//	alert(doc.head.source.guid + JSON.stringify(sourceFormFields));
					return sourceFormFields;
				}
				if (doc.head.contentType == "sourceProfile")
				{
					//alert(JSON.stringify(doc));
					// create a profile
					var sourceFormFields = CreateEmptySourceFormData();
					sourceFormFields._id = guid;
					// get source profile
					fillCommonSourceData(sourceFormFields, doc);
					//if (doc.head.source)
					//	alert(doc.head.source.guid + JSON.stringify(sourceFormFields));
					return sourceFormFields;					
				}
			}
			return null;
		}