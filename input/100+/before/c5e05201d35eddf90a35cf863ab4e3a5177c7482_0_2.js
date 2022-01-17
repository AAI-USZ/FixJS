function(event)
					{
						if (event.which == "13") // ENTER
						{
							var currentIndex = $(this).closest("tr").index();
							var rowCountHead = $(this).closest("tbody").children().length;
							if (currentIndex == (rowCountHead - 1))
							{
								//$(this).selectRange(0, 0);
								var nextTextArea = $("#" + getViewConceptId("edit", 0, 1));
								if ($(nextTextArea).length > 0)
								{
								  $(nextTextArea).first().putCursorAtEnd();	
								}
							}
							else
							{
								$(this).closest("tr").next().find("textarea").first().putCursorAtEnd();
							}
							applyCitationMarkup(mainOutline);
							refreshScriptureTagging();
							return false; // cancel event							
						}
					}