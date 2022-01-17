function _loadCustomOptions(optionFiles) {
            console.log("loading custom javascript options:\n",optionFiles);
            for(var i in optionFiles) {
               var Option =  require(optionFiles[i]);
               var option = new Option(Handlebars);

                var requiredParams =  option.info.params;  
                var requiredParamsLength = requiredParams.length; //+1 for template name.
                var argLength = args.length -1;
                //console.log(argLength, requiredParamsLength);
                if(argLength -1  < requiredParamsLength) {
                    console.log('For Generator, Was expecting at least ', requiredParamsLength, ' arguments');
                    console.log(requiredParams);
                process.exit();
                } else {

                    var options={
                    app: args[2].toDash()
                    };
                    console.log('options made' , options);
                    return options;
                }
            }
            
        }