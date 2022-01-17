function(){
				if (options){
					if (options.setSessionId){
						try{
							var locationList = response.headers.location.split("/");
							var sessionId = locationList[locationList.length - 1];
							self.sessionId = sessionId;
              				self.log("SET SESSION ID ", sessionId);
						}catch(err){
							self.log(colors.red + "COULDNT GET A SESSION ID" + colors.reset);
						}
					}
				}
				
				var result;
		
				try{
					result = JSON.parse(self.strip(data));
				}catch (err){
					if (data !== ""){
						self.log("/n" + colors.red + err + colors.reset + "/n");
						self.log(colors.dkgrey + data + colors.reset + "/n");
					}
					
					if (callback){ 
						callback(new Error('Couldn\'t parse JSON response')); 
					}
					
					return;
				}
				
				
                if (result.status === 0){
                    self.log(colors.teal + "RESULT\t"  + colors.reset, result.value);
                }else if (result.status === 7){
                    self.log(colors.teal + "RESULT\t"  + colors.reset, errorCodes[result.status].id);
                    if(callback){
                    	return callback(new Error(errorCodes[result.status].message));
                    }
                }else{

                    // remove the content of the screenshot temporarily so that cthe consle output isnt flooded
                    var screenshotContent = result.value.screen;
                    delete result.value.screen;
                    if (errorCodes[result.status])
                    {
                        self.log(colors.red + "ERROR\t"  + colors.reset + "" + errorCodes[result.status].id + "\t" + errorCodes[result.status].message);

                    }
                    else
                    {
                        self.log(colors.red + "ERROR\t"  + colors.reset + "\t", result + "\t" + errorCodes[result.status].message);
                    }

                        try
                        {
                            var jsonData = JSON.parse(data);
                            self.log("\t\t" + jsonData.value.message);
                        }
                        catch(err)
                        {
                            self.log("\t\t" + data);
                        }


                    // add the screenshot again
                    result.value.screen = screenshotContent;
                    if (process.argv.length > 1)
                    {
                        var runner = process.argv[1].replace(/\.js/gi, "");

                        var prePath = "";

                        if (self.screenshotPath === "")
                        {
                            prePath = runner;
                        }
                        else
                        {
                            prePath = self.screenshotPath + runner.substring(runner.lastIndexOf("/") + 1);
                        }

                        // dont save the screenshot if its an unknown error
                        if (result.status != 13)
                        {
                            var errorScreenshotFileName = prePath + "-ERROR.AT." + self.currentQueueItem.commandName + ".png";
                            self.log(colors.red + "SAVING SCREENSHOT WITH FILENAME:" + colors.reset);
                            self.log(colors.brown + errorScreenshotFileName + colors.reset);
                            self.saveScreenshotToFile(errorScreenshotFileName, result.value.screen);
                        }
                    }

				}
				
				if (!self.sessionId){
					self.log(colors.red + "NO SESSION, EXITING" + colors.reset)
					process.exit(1);
				}

				if (callback){
					//console.log("run callback for protocol");
					callback(null, result);
				}
			}