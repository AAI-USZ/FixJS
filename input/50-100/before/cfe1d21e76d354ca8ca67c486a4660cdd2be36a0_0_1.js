function()
                {
                    if(!!--thisValue.nbImagesLoading_)
                    {
                        thisValue.element_.innerHTML = (100*(thisValue.GetNbImages()-thisValue.GetNbImagesLoading())/thisValue.GetNbImages()).toFixed(1);
                    }
                    else
                    {
                        thisValue.element_.innerHTML = "100";
                    }
                }