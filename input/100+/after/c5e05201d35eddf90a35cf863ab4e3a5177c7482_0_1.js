function(event)
					{
						if (event.which == "13") // ENTER
						{
							//$(this).selectRange(0, 0);
							updateViewsForEditedItem(event.target);
							updateScriptureCitation(this, ".chiasmEditItem", publishContentToChiasmView);
							var nextTextArea = $(this).closest(".chiasmEditItem").next().find("textarea");
							if ($(nextTextArea).length > 0)
							{
							  $(nextTextArea).first().putCursorAtEnd();	
							}
							else
							{
								//alert("insert");
								var insertionIndex = FindInsertionIndexForNewChiasmConcept();
							  	// create a new level
							  	// update content of chiasm
							  	// create new JSON node
							  	var newConcept = insertConcept(mainOutline.body.concepts, insertionIndex, "");
							  	var count = mainOutline.body.concepts.length;
							  	
							  	var newItem = ConceptToChiasmViewItem(mainOutline.body.concepts, insertionIndex, true);
							  	var newItem2 = ConceptToChiasmViewItem(mainOutline.body.concepts, insertionIndex, false);
							  	UpdateTableFromConcept(mainOutline.body.concepts, insertionIndex, "#tableViewAAB", count);					  	
								var indexItem = $(newItem).index();	
								//alert(newItem + "" + count + " " + indexItem);
								var newInputBox = createEditBoxForChiasmBody(mainOutline.body.concepts, insertionIndex);
								/*
								 * IE9 seems to leave the old boxes highlighted, so force them to go away now.
								 */
								RemoveAllHighlighting();
								var bookName = getBookName(mainOutline.head.ScriptureRange);
            					/*
            					 * End workaround
            					 */
							  	newInputBox.putCursorAtEnd();
							}
							return false; // cancel event							
						}
						if (event.which == "8") // BACKSPACE
						{
							var currentTextareaValue = $(this).val();
							if (currentTextareaValue == "")
							{
								var numEditBoxes = $("#editChiasmBody").children(".chiasmEditItem").length;
								var currentIndex = $(this).closest(".chiasmEditItem").index(".chiasmEditItem");
								if (currentIndex > 0 && numEditBoxes == currentIndex + 1)
								{
									// since this is the last box, we can easily delete it.
									// but first find the previous sibling, so we can put our cursor there.
									var previousSibling = $(this).closest(".chiasmEditItem").prev();
									// now delete list item.
									var textAreaId = event.target.id;
									var chiasmElementId = textAreaId.substr("edit".length);
									// we need to delete the "indention" spacing if we're on an "even" index.
									var iconcept = indexAABEditBoxesToIndexConcept(currentIndex, mainOutline.body.concepts.length);
									//alert(currentIndex + " -> "+ iconcept);
									mainOutline.body.concepts.splice(iconcept, 1);
									$("#indent" + chiasmElementId).remove();
									$("#flat" + chiasmElementId).remove();
									var fFirstConceptInPair = (currentIndex % 2 == 0);
									if (fFirstConceptInPair)
									{
										// remove the whole row.
										$("#tableAAB" + chiasmElementId).parent().remove();
									}
									else
									{
										// otherwise, remove the td and the preceding td (marker)
										// remove the whole row.
										$("#tableAAB" + chiasmElementId).prev().remove();
										$("#tableAAB" + chiasmElementId).remove();
									}
									
									$(this).closest(".chiasmEditItem").remove();
									$(previousSibling).find("textarea").first().putCursorAtEnd();
									return false;
								}
							}
							
						}
					}