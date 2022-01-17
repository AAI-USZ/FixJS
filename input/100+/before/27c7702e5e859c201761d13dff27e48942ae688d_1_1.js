function(params){
		//WTF1: THE NEXT LINE IS REALLY, REALLY IMPORTANT TO DO BEFORE CREATING THE NEXT OBJECT.
		//OBJ STANDARD PRACTICE IS TO COUNT THE TOTAL POINTS IN A FILE AND USE THE ABSOLUTE POINT NUM IN THE POLY REFERENCE
		//I NEED TO COUNT HOW MANY POINTS WERE IN THE LAST OBJECT TO USE THAT AS MY OFFSET BECAUSE I COUNT THE POINTS IN MY OBJECTS STARTING FROM 0!
		//Check that this isn't the first object.
		if(obRef !== undefined){
			pointNumOffset += objectList[obRef].points.length;
		}

		//Creating the new object to put lines and points into!
		//In Blender, you can have multiple `objects` in your scene that reference the same mesh.
		//The object name as it comes to here is objectName_meshName, so I split by _
		//And just because I feel like it, I'm storing the intended color for the object in its name
		//so example: greeCube-0f0_cubeMesh : turns into obRef = 'greeCube'; objectColor = '0f0';
		if(mode === 'shape'){
			var objectNameFromBlender = params[0].split('_')[0].split('-');
			var objectColor = objectNameFromBlender[1] || 'f00';
		}else if(mode === 'font'){
			//But fonts aren't usually multi-color, and '-' is a character, so no more color
			var objectNameFromBlender = params[0].split('_Plane.')[0];
		}
		obRef = objectNameFromBlender[0];
		objectList[obRef] = {
			//color:'#'+objectColor,
			points:[],
			lines:[]
		};
	}