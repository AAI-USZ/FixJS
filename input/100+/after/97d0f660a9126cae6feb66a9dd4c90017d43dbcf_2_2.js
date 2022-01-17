function() {
        // setupDebug
        // DEBUG und stats.js
        that = this;

/*
        this.debugBox = $("<div class='container' id='debugContainer'>\
                     </div>").appendTo(this.domRoot);        
        this.stats = new Stats();
        Ori.input.register(Ori.KEY.SCROLL, "DEBUG");
        this.debugBox.append( this.stats.domElement );
*/        

        // setupLabels
       
        //TODO: move labels to html code (style / rename etc.)
        equinoxLabel = new UI.Label({text: APP_STRINGS.EN.VERNAL});
        npoleLabel = new UI.Label({text: APP_STRINGS.EN.NORTH_POLE });
        spoleLabel = new UI.Label({text: APP_STRINGS.EN.SOUTH_POLE});
        northLabel = new UI.Label({text: "North"});
        southLabel = new UI.Label({text: "South"});
        eastLabel = new UI.Label({text: "East"});
        westLabel = new UI.Label({text: "West"});
        sunLabel = new UI.Label({text: APP_STRINGS.EN.SUN });
        planetLabel = new UI.Label({text: APP_STRINGS.EN.PLANET });
        
       
        this.modelSelect = $("#model-select");
        this.planetSelect = $("#planet-select");
        this.presetSelect = $("#preset-select"); 
        

        this.modelSelect.change(function() { 
            app.loadModel(this.options[this.selectedIndex].value);
        });  
        
        this.planetSelect.change(function() { 
            app.loadPlanet(this.options[this.selectedIndex].value);
        }); 
        
        this.presetSelect.change(function() {
            app.loadPreset(this.options[this.selectedIndex].value);
        }); 

        $("#moon-select").click(function() {
            app.model.setCurrentMoonModel(this.options[this.selectedIndex].value);
            app.model.reset(); 
        });  
        
        UI.optionsFromHash("#moon-select", moonModels);
          
        $("#add-preset").click(function() { app.addPreset(); } );  
        $("#remove-preset").click(function() { app.removePreset(); } ); 
      
        this.loadCustomPresets();
        
        $("#ui-container h3").collapsible();
        $("#info-container h3").collapsible();
        $("#ui-container, #info-container").show();

 
        $("#camera-select").change(function() {
            app.setCamera(this.value); 
            app.resize();
        }); 


        $("#longitude-select").change(function() { 
            $("#AxisAngle1 > input")
                .attr("value",this.value)
                .change(); 
        }); 


        


       
        $("#reset-button").click(function() { 
            app.model.reset();
        });
        
        $("#pause-button").click(function() { 
            app.model.toggleRunning(); 
            if(app.model.getRunning()) { 
                $("#pause-button").text("pause");
            } else { 
                $("#pause-button").text("play");
            }
        }); 

        $("#screenshot-button").click(function() {
            app.canvas.render(app.currentScene, app.model.getCamera());
            downloadDataURI({
                filename: "screenshot.jpeg", 
                data: app.canvas.domElement.toDataURL("image/jpeg")
            });
        //    window.open(app.canvas.domElement.toDataURL("image/jpeg"));
        }); 
        
        $("#date-input").bind("keyup", function(e) { 
            if(e.keyCode == 13) 
                that.setDate(this.value); 
        });

        $("#parameters-hide-button").click(function() { 
             $("#content-scroll").toggleClass('hide');
             $("#ui-container").toggleClass('hide');

        });

        document.getElementById("page").onresize = function(e) { that.resize(e) };
        
        $("#info-button").click(function() { 
            $("#page").toggleClass('slide');
            $("#book").toggleClass('hide');
            $("#right-page").toggle();
            $("#canvas-main").toggleClass('page');
            $("#content-scroll").toggleClass('hide', !$("#page").hasClass('slide'));
            $("#ui-container").toggleClass('hide', !$("#page").hasClass('slide'));
            that.resize();
        });
        
        
        $("#rotate-left").click(function() {
            that.model.getCamera().mouseY(0.1);
        });

        $("#rotate-right").click(function() {
            that.model.getCamera().mouseY(-0.10);
        });
                
        $("#zoom-plus").click(function() { 
            that.setZ(that.getZ()+1);
            $("#zoom-slider").slider('value',that.getZ());
        });
        
        $("#zoom-minus").click(function() { 
            that.setZ(that.getZ()-1);
            $("#zoom-slider").slider('value',that.getZ());
        });
                
        $("#zoom-slider").slider({
                slide: function(event, ui) { that.setZ(ui.value); },
                value: -17,
                range: "min",
                animate: "fast",
                min:-60,
                max: 1,
                step:1,
                orientation: "vertical"
         });

        
  
 
}