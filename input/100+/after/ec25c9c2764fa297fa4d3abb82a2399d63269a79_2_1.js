function(slide){

		var content = "";

		var classes = "";

		for(el in slide.elements){

			if(slide.elements[el].type === "text"){

				content += _renderText(slide.elements[el],slide.template);

			}

			else if(slide.elements[el].type === "image"){

				content += _renderImage(slide.elements[el],slide.template);

			}

			else if(slide.elements[el].type === "video"){

				content += renderVideo(slide.elements[el],slide.template);

			}

			else if(slide.elements[el].type === "object"){

				content += _renderObject(slide.elements[el],slide.template);

				classes += "object ";

			}

			else if(slide.elements[el].type === "snapshot"){

        content += _renderSnapshot(slide.elements[el],slide.template);

        classes += "snapshot ";

      }

			else if(slide.elements[el].type === "applet"){

				content += _renderApplet(slide.elements[el],slide.template);

				classes += "applet ";

			}

			else if(slide.elements[el].type === "flashcard"){

				content = _renderFlashcard(slide.elements[el],slide.template);

				classes += "flashcard";

			}

			else if(slide.elements[el].type === "openquestion"){

				content += _renderOpenquestion(slide.elements[el],slide.template);

				classes += "openquestion";

			}

			else if(slide.elements[el].type === "mcquestion"){

				

				//this will be call as many times as mcquestion have the excursion

				//isn't better to get the role value in the VISH.Quiz? 

				role = VISH.SlideManager.getUser().role;

				VISH.Debugging.log(" rendered: role is" +role);

				content +=VISH.Quiz.init(role, slide.elements[el],slide.template);

				//content += _renderMcquestion(slide.elements[el],slide.template);

				classes +="mcquestion";

			}

			else{

				content += _renderEmpty(slide.elements[el], slide.template);

			}

		}



		SLIDE_CONTAINER.append("<article class='"+classes+"' id='"+slide.id+"'>"+content+"</article>");

		

	}