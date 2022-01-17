function jmolQueueWatcher(){
    //this function should be started on a 1500 ms interval as soon as the first Jmol applet is called for.
    //This controls launch of applet timing and order when multiple Jmols are trying to launch. Necessary
    //for the asynchronous launching caused by openning an old worksheet with lots of Jmols.
    //Check for Jmols in the launching state (should be one or none)
    jmol_numLiveUpdate();
    numAppletsAtStart =jmolStatus.jmolArray.length;//may change during checks...ignore new additions
    loading = -1;
    for (n=0;n<numAppletsAtStart;n++){
        if(jmolStatus.jmolArray[n]==2){loading=n;};
        }
    if(loading>=0){//we found a loading applet
        jmolStatus.attempts[loading]+=1; //update number of checks for load completion.
        if(jmolStatus.defaultdirectory[loading]=="done"){//Applet is ready.
            jmolAppletLive(loading);
            }else{ //Applet not ready. How many checks have we done?
            if(jmolStatus.attempts[loading]==10){
                alert("Jmol Applet #"+loading+" is having trouble loading.  Will retry once.");
                var scriptStr = 'x=defaultdirectory; data "directory @x";';
                scriptStr += 'set MessageCallback "jmolMessageHandler"; show defaultdirectory;';
                jmolScript(scriptStr);
                }
            if(jmolStatus.attempts[loading]==20){
                alert("Second attempt to finish launch of Jmol Applet #"+loading+" failed.  Recommend reevaluating the cell manually.");
                jmolStatus.jmolArray[loading]=-2; //launch failed.
                }
            }
        }else{//no loading applets. Search for queued applet.
        queued = -1;
        for (n=0;n<numAppletsAtStart;n++){
            if(jmolStatus.jmolArray[n]==3){queued=n;};//will use the last one we find
            }
        if(queued>=0){//we found a queued applet and can start its launch.
            //alert("About to launch applet #"+queued);
            var defaultdir = (jmolStatus.urls[queued]).substring(0,((jmolStatus.urls[queued]).lastIndexOf("?")));
            var scriptStr = 'set defaultdirectory "'+defaultdir+'";script "'+jmolStatus.urls[queued]+'"; isosurface fullylit; pmesh o* fullylit;';
            scriptStr +='set antialiasdisplay on; set repaintWaitMs 1500;';
            scriptStr +='x=defaultdirectory; data "directory @x";';
            scriptStr += 'set MessageCallback "jmolMessageHandler"; show defaultdirectory;';
            //alert("About to look for the div to put it in");
            if (get_element("Jmol"+ queued) ){//the div is ready
                //sleep some if necessary
                //alert("Found div.  About to enter LimitLive.");
                limitlive(queued, jmolStatus);
                //alert("left LimitLive");
                jmolStatus.attempts[queued]=0; //no checks on load completion yet.
                jmolStatus.jmolArray[queued]=2; //now it is loading
                get_element("Jmol"+ queued).innerHTML = jmolApplet([jmolStatus.widths[queued], jmolStatus.heights[queued]], scriptStr, queued);
                }
            }
        }
    }