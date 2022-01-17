function(jsonString){

			

			function getValueAndTitle(value) {

				var obj = {};

				obj.value = (typeof(value.value) != "undefined" && value.value !== null) ? value.value : value;

				// if it is an object use the value and look for a title

				obj.title = value.title || obj.value;

				return obj;

			}

			

			var metaType = jsonString.type; 

			var id = this.getId();

			var extraAttribs = "";

			

			jsonString.id = id;



			var disabled = jsonString.disabled ? " disabled='true' " : "";			

			

			/*

			 * 

			 * when writing dijit markup BE SURE TO INCLUDE class='propertyPaneEditableValue' to signify a onChange target and property target

			 * as well as the 'extraAttributes' string, which will contain the inputs target as parsed from JSON template.

			 */



			switch (metaType){

				case "trblbox":

					var text="<div dojoType='davinci.ve.widgets.Trblbox' shorthand='\"" + jsonString.shorthand + "\"'></div>";

					

					return text;

				case "multi":

					var valuesText = "";

					if(jsonString.values){

						valuesText = "data='"

							+ dojo.toJson(dojo.map(jsonString.values, function(v){ return {value: v}; })) 

							+ "'";

					}

					var text = "<div dojoType='davinci.ve.widgets.MultiInputDropDown' " + valuesText + "  class='propertyPaneEditablevalue' style='display:inline-block; width:100%;' id='"+ id + "'"+disabled+"></div>";

					

			        return text;

				case "boolean":

					var text = "<input type='checkbox' class='propertyPaneEditablevalue' style='display:inline-block;margin-left:5px' id='"+ id + "'></input>";

			        return text;

			        

				case "comboEdit":

					var values = jsonString.values;

					var text = "<select  dojoType='dijit.form.ComboBox' style='display:inline-block; width:100%;' id='"+ id + "'"+disabled+">";

					for(var i = 0;i<values.length;i++) {

						var obj = getValueAndTitle(values[i]);

						text+="<option value='" + obj.value + "'>" + obj.title + "</option>";

					}

					text+="</select>";

					return text;

					

				case "combo":

					var values = jsonString.values;

					var text = "<select style='display:inline-block; width:100%;' id='"+ id + "'"+disabled+">";

					for(var i = 0;i<values.length;i++) {

						var obj = getValueAndTitle(values[i]);

						text+="<option value='" + obj.value + "'>" + obj.title + "</option>";

					}

					text+="</select>";

					return text;

				case "font":

					var text = "<div dojoType='davinci.ve.widgets.FontDataStore' jsId='"+ id + ('_fontStore') + "'>";

						text+= "<div dojoType='davinci.ve.widgets.FontComboBox' value='" + FontDataStore.fonts[0].value + "' store='"+ id + ('_fontStore') + "'  id='"+ id +"' class='propertyPaneEditablevalue' style='display:inline-block; width:100%;'></div>";

					return text;

				case "state":

					var text="<div dojoType='davinci.ve.widgets.MetaDataStore' jsId='davinci.properties.event"+ (id) + ('_Store') + "'>";

					text+="<div dojoType='dijit.form.ComboBox' id='"+ id +"'store='davinci.properties.event"+ (id) + ('_Store') + "' class='propertyPaneEditablevalue' style='display:inline-block; width:100%;' autoComplete='false'></div>";

					return text;

				case "color":

					var text = "<div class='propertyPaneEditablevalue' dojoType='davinci.ve.widgets.ColorPicker' id='"+ id + "' ></div>";

					return text;

					/*todo - write color chooser widget */

				case "background":

					var valuesText = dojo.isArray(jsonString.values) ? " data='" + dojo.toJson(jsonString.values) + "'" : "";

					var propName = dojo.isArray(jsonString.target) ? jsonString.target[0] : jsonString.target;

					var propNameText = " propname='" + propName + "'";

					var swatchText = jsonString.colorswatch ? " colorswatch='true'" : '';

					var text="<div dojoType='davinci.ve.widgets.Background' id='" + id + "'" + valuesText + propNameText + swatchText + "></div>";

					return text;		

			

				case "border":

					/* todo - write border widget */

				case "number":

				case "object":

				case "text":

				case "array":

				case "string":

				default:

					var text = "<input type='text' class='propertyPaneEditablevalue' style='display:inline-block; width:100%;' id='"+ id + "'></input>";

					return text;

			}

		}