function getData(){
         //toggleControls("on");													//Turns on the controls for display 
         if(localStorage.length === 0){											//Checks to see if items are in local storage
           alert("There is no data in Local Storage so default data was added.");  //alert there is no localstorage data
		   autoFillData(); 							                            //alert prompt there is no data found
         }
         //Write Data from Local Storage to the browser.
         var makeDiv = document.createElement('div');							//creates a div tag 
         makeDiv.setAttribute("id", "items");									//sets attributes for new div tag id called items
         var makeList = document.createElement('ul');							//creates ul tag
         makeDiv.appendChild(makeList);											//appends ul to div tag
         document.body.appendChild(makeDiv);									//appends div tag with its child to body tag
         ge('items').style.display = "block";									//sets style for items to display
         for(var i=0, len=localStorage.length; i<len; i++){						//itterate the local storage
             var makeli = document.createElement('li');							//makes li tag
             var linksLi = document.createElement('li');					    //makes li tag for links edit-delete
             makeList.appendChild(makeli);										//appends li to ul
             var key = localStorage.key(i); 									//key for localstorage objects
             var value = localStorage.getItem(key);								//value of the object by key
             //Convert the string from local storage value back to an object by using JSON.parse()
             var obj = JSON.parse(value);										//Json parsing of object
             var makeSubList = document.createElement('ul');				    //creates the sublist ul element
             makeli.appendChild(makeSubList);									//appends to li ul element
			 getImage(obj.publisher[1], makeSubList);								//adds image for identification
             for(var n in obj){													//itterates the item in the object
                var makeSubli = document.createElement('li');					//creates element li 
                makeSubList.appendChild(makeSubli);								//appends to sublist li
                var optSubText = obj[n][0]+" "+obj[n][1];						//gets the text in the object
                makeSubli.innerHTML = optSubText;								//adds the innerHtml element for the text
                makeSubList.appendChild(linksLi);
             }
              makeItemLinks(localStorage.key(i), linksLi);                      //Create our edit and delete buttons/link for 
			  var addHl = document.createElement('hr');							//adds a horizontal rule seperator for look
			  addHl.setAttribute("id","genlist");								//adds id attribute for css to add styles
		      makeSubList.appendChild(addHl);									//appends the element to the end of the ul set
         }
      }