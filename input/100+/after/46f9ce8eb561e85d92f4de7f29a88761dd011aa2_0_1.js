function(data) {

				//get current date as UTC
				var nowDate = new Date();
				var nowDateUTC = new Date(nowDate.getUTCFullYear(), nowDate.getUTCMonth(), nowDate.getUTCDate(), nowDate.getUTCHours(), nowDate.getUTCMinutes(), nowDate.getUTCSeconds());

				if(data.rows.length){
					//create a UL with LI children for each supporter
					var listElement = $('<ul></ul>');

					for(i=0; i<data.rows.length; i++){
						//placeholder to put the actual content in
						var output = settings.format;

						//find fields chosen by user in settings.format
						for(x=0; x<formatArray.length; x++){

							var cleanFieldName = formatArray[x].replace(/\{|\}/g ,'').toLowerCase();
							var replacement = "";

							for(j=0; j<data.rows[i].columns.length; j++){
								if(data.rows[i].columns[j].name.toLowerCase() == cleanFieldName){
									replacement = data.rows[i].columns[j].value;
								}
							}

							//if this is the 'ago' field
							if(cleanFieldName == 'ago'){
								replacement = settings.agoText;
							}

							//check whether this is a date field to be "ago" formatted
							if(cleanFieldName == settings.agoFormat){								
								//IE<9 is speshal and doesn't support ISO-8601, so reformat ISO date to something it does 
								var actionDate = Date.parse(replacement.replace(/\-/g,'/').replace(/[^0-9\/\:]/g,' '));

								//actionDate is assumed to be UTC but Engaging Network's servers have a bug with date stamping. The recorded dates of actions are in fact London-time including (or not) DST offset. Without DST the EN server timestamps are correct but therefore for the half the year where DST is in effect, they aren't. 

								if(new Date(actionDate).isDST()){
									//correct it by 1hr, if the date of the action would have fallen within DST (and therefore been recorded wrong)
									actionDate -= (60 * 60 * 1000);
								}

								var agoVal = 0;

								var secs = Math.floor((nowDateUTC - actionDate)/1000);
								var mins = Math.floor(secs /60);
								var hrs = Math.floor(mins / 60);
								var days = Math.floor(hrs / 24);
								var weeks = Math.floor(days / 7);
								var months = Math.floor(days / 30);
								var years = Math.floor(days / 365);

								if(years > 1){
									agoVal = years;
									formatLabel = 0;
								}else if (months > 1){
									agoVal = months;
									formatLabel = 1;
								}else if (weeks > 1){
									agoVal = weeks;
									formatLabel = 2;
								}else if (days > 1){
									agoVal = days;
									formatLabel = 3;
								}else if (hrs > 1){
									agoVal = hrs;
									formatLabel = 4;
								}else if (mins > 1){
									agoVal = mins;
									formatLabel = 5;
								}else{
									agoVal = secs;
									formatLabel = 6;
								}

								replacement = String(agoVal) + ' ' + ((agoVal != 1) ? settings.agoFormatLabelsPlural[formatLabel] : settings.agoFormatLabelsSingular[formatLabel]);
							}

							output = output.replace(formatArray[x], replacement);
						}

						listElement.append($('<li>' + output + '</li>'));
					}

					$this.append(listElement);
				}
			}