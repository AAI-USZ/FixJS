function() {
  
       
       /**
       * move to view
       */
       // default camera
       this.setCamera("Trackball");
       this.currentCamera.reset();


        $("#date-input").hide();
        $("#moon-select").hide();  
        $("#info-container tr").hide();


        this.view.setupInfos();
        
        // clear old ui elements
        $("#parameters").empty();
        
        this.currentCamera.rotateY(Math.PI + 0.1);

       

        $("#view-sliders").empty();
        UI.slider({
            model: this.model,
            id: "AxisAngle1",
            max: 360,
            step:0.01,
            text: "view latitude",
            tooltip: "change latitude"
        }).appendTo("#view-sliders");
        
        UI.slider({
            model: this,
            id: "Fov",
            max: 160,
            step:1,
            text: "field of view",
            tooltip: "set field of view"
        }).appendTo("#view-sliders");


        $("#visSpheres").empty();
        
        for (i in this.model.sphere) {
            if(this.model["setShowSphere" + i]) 
                UI.checkbox({
                   model: this.model,
                   id:"ShowSphere" + i,
                   text:"S" + ( Number(i) ),
                   color:  rgbToCSS( this.model.sphere[i].gfx.color ) 
                }).appendTo("#visSpheres");
        }
        
        $("#visOther").empty();
        if(this.model.setShowPath) 
            UI.checkbox({
                model: this.model,
                id:"ShowSun",
                text:"sun",
                tooltip: "toggle sun visibilty",
                color: rgbToCSS(config.colors["Sun"])
            }).appendTo("#visOther");
            
        if(this.model.setShowPath) 
            UI.checkbox({
                model: this.model,
                id:"ShowPath",
                text:"path",
                color: rgbToCSS(config.colors["Path"])
            }).appendTo("#visOther");
            
        if(this.model.setShowHippo) 
            UI.checkbox({model: this.model,
                id:"ShowHippo",
                text:"hippopede",
                tooltip: "toggle hippopede visibilty",
                color:  rgbToCSS(config.colors["Hippo"]) 
            }).appendTo("#visOther");
            
        if(this.model.setShowStars) 
            UI.checkbox({
                model: this.model,
                id:"ShowStars",
                text:"stars"
            }).appendTo("#visOther");


        $("#anim-speed").empty().inputSlider({ 
            object: this.model,
            property: "AnimSpeed",
            min: -1000,
            max: 20000, 
            step: 0.1,
            text: "Animation Speed",
            tooltip:"duration of a year in seconds"
        });


        this.view.setupSliders(this.model, this.currentCamera);


        // initial update of sliders/state
        this.model.toggleRunning();
        $("#view-header, #caprotateStart").click(); // #pauseButton
        this.model.toggleRunning();


        $("#moon input, #angle  input, #speed input").change();
        $("#AxisAngle1 input").change();
        
        this.currentCamera.rotateTarget({x: 0, y: 0, z: 0});



    }