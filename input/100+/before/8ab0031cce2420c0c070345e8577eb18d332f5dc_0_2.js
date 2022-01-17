function(node, state, styleArray, silent) {

		if (!node || !styleArray) { return; }

		

		node._maqDeltas = node._maqDeltas || {};

		node._maqDeltas[state] = node._maqDeltas[state] || {};

		node._maqDeltas[state].style = node._maqDeltas[state].style || [];

		

		// Remove existing entries that match any of entries in styleArray

		var oldArray = node._maqDeltas[state].style;

		if(styleArray){

			for (var i=0; i<styleArray.length; i++){

				var newItem = styleArray[i];

				for (var newProp in newItem){	// There should be only one prop per item

					for (var j=oldArray.length-1; j>=0; j--){

						var oldItem = oldArray[j];

						for (var oldProp in oldItem){	// There should be only one prop per item

							if(newProp == oldProp){

								oldArray.splice(j, 1);

								break;

							}

						}

					}

				}

			}

		}

		//Make sure all new values are properly formatted (e.g, add 'px' to end of certain properties)

		var newArray;

		if(styleArray){

			for(var j=0; j<styleArray.length; j++){

				for(var p in styleArray[j]){	// should be only one prop per item

					var value =  styleArray[j][p];

					if (typeof value != "undefined" && value !== null) {

						if(typeof newArray == 'undefined'){

							newArray = [];

						}

						var o = {};

						o[p] = this._getFormattedValue(p, value);

						newArray.push(o)

					}

				}

			}

		}

		if(oldArray && newArray){

			node._maqDeltas[state].style = oldArray.concat(newArray);

		}else if(oldArray){

			node._maqDeltas[state].style = oldArray;

		}else if(newArray){

			node._maqDeltas[state].style = newArray;

		}else{

			node._maqDeltas[state].style = undefined;

		}

			

		if (!silent) {

			connect.publish("/davinci/states/state/style/changed", [{node:node, state:state, style:styleArray}]);

		}

		this._updateSrcState (node);

	}