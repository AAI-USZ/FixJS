function(ship, system, shipwindow){
        system = shipManager.systems.initializeSystem(system);
		var systemwindow = shipwindow.find(".system_"+system.id);

 
        if (system.dualWeapon)
            systemwindow.find(".icon").css("background-image", "url(./img/systemicons/"+system.name +".png)");


		var output = shipManager.systems.getOutput(ship, system);
		var field = systemwindow.find(".efficiency.value");
		
		var healtWidth = 48;
		if (system.name == "structure")
			healtWidth = 108;
			
		systemwindow.find(".healthvalue ").html((system.maxhealth - damageManager.getDamage(ship, system)) +"/"+ system.maxhealth + " A" + shipManager.systems.getArmour(ship, system));
		systemwindow.find(".healthbar").css("width", (((system.maxhealth - damageManager.getDamage(ship, system)) / system.maxhealth)*healtWidth) + "px");
		
		if (system.name == "thruster"){
			systemwindow.data("direction", system.direction);
			systemwindow.find(".icon").css("background-image", "url(./img/systemicons/thruster"+system.direction+".png)");
		}
		
		shipWindowManager.removeSystemClasses(systemwindow);
		
		if (shipManager.systems.isDestroyed(ship, system)){
			systemwindow.addClass("destroyed");
			return;
		}
		
		
		
		if (shipManager.criticals.hasCriticals(system)){
			systemwindow.addClass("critical");
		}
		
		if (shipManager.power.setPowerClasses(ship, system,  systemwindow))
			return;
		
		
		if (system.weapon){
           
			var firing = weaponManager.hasFiringOrder(ship, system);
			if (!weaponManager.isLoaded(system)){systemwindow.addClass("loading");}else{systemwindow.removeClass("loading");}
			if (weaponManager.isSelectedWeapon(system)){systemwindow.addClass("selected");}else{systemwindow.removeClass("selected");}
			if (firing){systemwindow.addClass("firing");}else{systemwindow.removeClass("firing");}
			if (system.ballistic){systemwindow.addClass("ballistic");}else{systemwindow.removeClass("ballistic");}
			
            if (!firing && Object.keys(system.firingModes).length > 1)
            {
                systemwindow.addClass("modes");
                var modebutton =  $(".mode", systemwindow);
                modebutton.html("<span>"
                    +system.firingModes[system.firingMode].substring(0, 1)
                    +"</span>");
                
            }
            
			if (firing && system.canChangeShots){
				
				var fire = weaponManager.getFiringOrder(ship, system);
			
				if (fire.shots<system.shots){systemwindow.addClass("canAddShots");}else{systemwindow.removeClass("canAddShots");}
				if (fire.shots>1){systemwindow.addClass("canReduceShots");}else{systemwindow.removeClass("canReduceShots");}
				
				field.html(fire.shots+ "/" + system.shots);
				
			}else if (!firing){
				var load = system.turnsloaded;
				//if (!systemwindow.hasClass("overload") && load > system.loadingtime)
				//	load = system.loadingtime;
				
					
				
				var loadingtime = system.loadingtime;
				if (system.normalload > 0)
					loadingtime = system.normalload;
                
                var overloadturns = "";
                
                if (system.overloadturns > 0 && shipManager.power.isOverloading(ship, system))
                    overloadturns = "("+system.overloadturns+")";       
				
                if (system.overloadshots >0){
                    field.html("S"+system.overloadshots);
                }else{
                    field.html(load+overloadturns+ "/" + loadingtime);
                }
				
			}
				
			
					
			
			
			
		}else if (system.name == "thruster"){
			systemwindow.data("direction", system.direction);
			systemwindow.find(".icon").css("background-image", "url(./img/systemicons/thruster"+system.direction+".png)");
		
			var channeled = shipManager.movement.getAmountChanneled(ship, system);
			
			
			if (channeled > output){
				field.addClass("darkred");
			}else{
				field.removeClass("darkred");
			}
			if (channeled < 0)
				channeled = 0;
				
			field.html(channeled + "/" + output);
		}else if(system.name == "engine"){
			var rem = shipManager.movement.getRemainingEngineThrust(ship);
			field.html(rem + "/" + output);
		}else if (system.name == "reactor"){
			field.html(shipManager.power.getReactorPower(ship, system));
		}else if (system.output > 0){
		
			field.html(output);
		}
	}