function(error, result) {
                if (error) {
                    console.log(error);
                    res.json(error);
                } else {
                    //submitImages supports arrays and acts as such, we'll only ever send it a single item here so we collapse its response
                    result = result[0];
                    res.json(result);
                    //Now for the stuff that isn't relevant to the upload form
                    if (!result.error) {

                        //Rebuild the tag table
                        tagProvider.rebuildCount(function(error, result){console.log(error);});
                        tagProvider.current = false;
                        //Theres got to be a more efficient way to do this
                    }
                }
            }