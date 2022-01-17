function(){

            hidePopup();

			if(checkSelection() === "LC"){

				$("#selectedText").html("LEAST<br>CONCERN");

			}

			else if(checkSelection() === "NT"){

				$("#selectedText").html("NEAR<br>THREATENED");

			}

			else if(checkSelection() === "VU"){

				$("#selectedText").html("VULNERABLE");

			}

			else if(checkSelection() === "EN"){

				$("#selectedText").html("ENDANGERED");

			}

			else{

				$("#selectedText").html("CRITICALLY ENDANGERED");

			}

		}