function(error, result) {
                if (error) {
                    console.log('Image Insert error (app.js:528):'+error);
                    res.json(error);
                } else {
                    //submitImages supports arrays and acts as such, we'll only ever send it a single item here so we collapse its response
                    result = result[0];
                    res.json(result);
                    //Now for the stuff that isn't relevant to the upload form
                    if (!result.error) {

                        //Rebuild the tag table
                        tagProvider.rebuildCount(function(error, result){console.log('Tag Rebuil Error (app.js:538): '+error);});
                        tagProvider.current = false;
                        //Theres got to be a more efficient way to do this
                    }
                }
            }