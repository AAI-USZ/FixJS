function Tank(x_init, y_init, team, type, teamnum)
	{
		var Color = team.getColor(),
			X = x_init,
			Y = y_init,
			DestX = x_init,
			DestY = y_init,
			Team = team,
			Teamnum = teamnum,
			Type = type,
			Time = 60,
			TurnSpeed = rnd(Type.TurnSpeed * .3, Type.TurnSpeed * 1.05), /* 70% - 105% */
			MoveSpeed = rnd(Type.MoveSpeed * .7, Type.MoveSpeed * 1.05), /* 70% - 105% */
			HitPoints = Type.HitPoints,
			Cooldown = Type.Kind === TankKindEnum.BASE ? Math.random() * Type.CooldownTime : Type.CooldownTime,
			Target = null,
			TargetEvasive = null,
			TargetEvasiveLocation = { X: 0, Y:0, XOffset: 0, YOffest: 0},
			LastEvadeSwitchDate = new Date(),
			BaseAngle = 0,
			TargetBaseAngle = 0,
			TurretAngle = 0,
			TargetTurretAngle = 0,
			HealCooldown = (Math.floor(Math.random()*2)+ 1) * HEALTH_COOLDOWN, // Random time the health regen will occur
			CanEvade = Type.CanGoEvasive,
			EvadeProb = Type.EvaProb,
			State = TankStateEnum.IDLE,
			Weapons = null,
			This = this,
			SHAPE = null, // IMPORTANT!
			HEALCIRCLE = null,
			HPBAR = null,
			DRAGGING = false,
			debug = {}
			;

		SetupMyGuns(); // Setup and adjusts guns for each unit.

		var getColor = function(){return Color;}
		this.isBase = function(){return Type.Kind == TankKindEnum.BASE;}
		this.isSpecial = function (){ return Type.Special; }
		this.isPlane = function() {return Type.Kind == TankKindEnum.PLANE;};
		this.isTurret = function() { return Type.Kind == TankKindEnum.TURRET; }
		this.isHealer = function(){return inArray(Type.BulletType,ShotType.HEAL);};
		this.isEvading = function() { return State === TankStateEnum.EVADE || State === TankStateEnum.STOP_AND_GUARD; }
		this.isAttacker = function(){return Type.AttackingUnit;}
		this.getKind = function() { return Type.Kind; }
		this.getType = function(){return Type;}
		this.getTeam = function() {return Team;};
		this.getTeamnum = function(){return Teamnum;}
		this.attackingTarget = function(target){return Type.AttackingUnit ? target === Target : false;}
	    this.getDistanceSquaredFromPoint = function(x, y) {
	        var dx = x - X,
	            dy = y - Y,
	            w2 = WIDTH * 0.5,
	            h2 = HEIGHT * 0.5;

	        if (dx < -w2)
	            x += WIDTH;
	        if (dx > w2)
	            x -= WIDTH;
	        if (dy < -h2)
	            y += HEIGHT;
	        if (dy > h2)
	            y -= HEIGHT;

	        return (X - x) * (X - x) + (Y - y) * (Y - y);
	    };
	    this.getAngleFromPoint = function(x, y) { return getAngleFromPoint(x, y, X, Y); }
		this.getRadiusSquared = function() {return Type.Radius * Type.Radius;};
		this.getTurnSpeed = function() { return TurnSpeed; };
		this.getX = function() {return X;}
		this.getY = function() {return Y;}
		this.getMoveSpeed = function() {return Type.MoveSpeed; }
		this.getBaseAngle = function(){return BaseAngle; }
		this.setX = function(x){X = x; return X;};
		this.setY = function(y){Y = y; return Y;};
		this.kill = function(){die();}
		this.getDx = function()
		{
			if(State === TankStateEnum.MOVE || State === TankStateEnum.TARGET_AQUIRED || State === TankStateEnum.CRASH_AND_BURN) {
				if(Math.abs(TargetBaseAngle - BaseAngle) < MAX_MOVE_ANGLE)
					return MoveSpeed * Math.cos(BaseAngle);
				else
					return 0;
			} else {
				return 0;
			}
		}
		this.getDy = function()
		{
			if(State === TankStateEnum.MOVE || State === TankStateEnum.TARGET_AQUIRED || State === TankStateEnum.CRASH_AND_BURN) {
				if(Math.abs(TargetBaseAngle - BaseAngle) < MAX_MOVE_ANGLE)
					return MoveSpeed * Math.sin(BaseAngle);
				else
					return 0;
			} else {
				return 0;
			}
		}

		this.getHPBar = function() { return HPBAR; }
		this.drawHPBar = function()
		{
			return;

			if(SHAPE != null || SHAPE != undefined)
			{
				if(HPBAR == null || HPBAR == undefined)
				{
					HPBAR = new Kinetic.Rect({
						x: X - 15, // Offset it to the left a bit
						y: Y - 10, // Offset it just above the unit
						width: 25,
						height: 3,
						fill: "green",
						stroke: "black",
						strokeWidth: 1
					});
					LAYER.add(HPBAR);
					//HPBAR.hide(); // We're at full health, no need!
				}
				else
				{
				 	if(HitPoints < Type.HitPoints && HitPoints != 0)
					{
						//if(!HPBAR.isVisible()) HPBAR.show(); // We're less than 100%, go!

						HPBAR.setPosition(X-15,Y-10);
						HPBAR.setWidth(25*(HitPoints/Type.HitPoints));

						if((HitPoints/Type.HitPoints) <= .35) 
							HPBAR.fill("red");
						else
							HPBAR.fill("green");
					}
				}
			}
			else if(SHAPE == null || SHAPE == undefined && HPBAR != null)
				LAYER.remove(HPBAR);
		}

		this.getHealCircleShape = function() { return HEALCIRCLE;} 
		this.drawCircle = function(sX, sY, radius, alpha)
		{
			if(HEALCIRCLE == null) // Always add if null
			{
				HEALCIRCLE = new Kinetic.Ellipse({
					x: sX, y: sY,
					radius: radius,
					fill: Team.getColor().getStringAlpha(alpha)
				});
			}
			else if(Type != TankKindEnum.BASE)
				HEALCIRCLE.setPosition(sX,sY); // This is for the healing tanks.

			return HEALCIRCLE;
		}

		// Draws the unit to the canvas
		this.getShape = function() {return SHAPE;}
		this.draw = function()
		{
			var _c = Team.getColor().getString();
			var _cA = Team.getColor().getStringAlpha(.2);

			// Unit Draw methods
			switch(Type.Kind)
			{
				case TankKindEnum.BASE:

					if(SHAPE == null)
					{
						// NOTE: IF you add items to a group, dont give fucking items parent X/Y coors. This will make them fly off screen!
						var group = new Kinetic.Group({ x:X, y:Y }); // This places all objects correctl
						var _shape;

						_shape = KBaseShape(); // This unit now has a shape
						_shape.setFill(Team.getColor().getString()); // Sets the unit to the correct color

						group.add(this.drawCircle(0,0,BASE_HEAL_RADIUS,.2)); // Draw Healing Circle
						group.add(_shape);

						group.name = "Base_" + teamnum;
						group.on("mouseover",function(){ writeMessage(SHAPE.name); });
						group.on("mouseout",function(){ writeMessage(""); });

						SHAPE = group; // Since this has more than one part

						LAYER.add(group);
						group.moveToBottom();
					}
					else
						SHAPE.setPosition(X,Y); // For the resize event
					
					break;
				case TankKindEnum.TANK:
				case TankKindEnum.BUILDER:
				case TankKindEnum.TURRET:
				
					var identicalTanks = ["SmallTank","MediumTank","LargeTank","DoubleTank","ArtilleryTank","MissileTank","Builder"];

					if(SHAPE == null)
					{
						var group = new Kinetic.Group({x:X, y:Y});// This places all objects correctly
						var _shape;
						var _turret = null;

						if(inArray(identicalTanks,Type.Name))
							_shape = KTankShape(_c,_cA);
						else if(Type.Name == "HealerTank")
							_shape = KHealerTank(_c,_cA);
						else if(Type.Name == "MammothTank")
							_shape = KMammothTank(_c,_cA);
						else if(Type.Kind == TankKindEnum.TURRET) // Turrets
							_shape = KStandardTurret(Type, _c);
						
						group.add(_shape); // Adds the unit to the group

						// Now we can add turrets to tanks.
						if(Type.Kind != TankKindEnum.TURRET) // Turrets don't get turrets!
						{
							if(inArray(identicalTanks,Type.Name))
								_turret = KStandardTurret(Type,Team.getColor().getString());

							if(Type.Name == "MammothTank")
								_turret = KStandardTurret(Type,Team.getColor().getString());
							
							if(_turret != null)
								group.add(_turret);
						}

						group.on("click",function(){die();});
						group.on("mouseover",function(){ writeMessage(
							SHAPE.name + 
							((Type.Kind == TankKindEnum.TURRET) ? " TurretA=" + TurretAngle : " BaseA=" + BaseAngle) +
							" State#=" + State +
							" TurretBaseA=" + TargetBaseAngle + 
							((Target != null) ? " Trgt=" + Target.getShape().name : "")
						)});
						group.on("mouseout",function(){ writeMessage(""); });
						group.name = Type.Name + "_" + teamnum + "_" + rndInt(10,100000);

						SHAPE = group;
						SHAPE.setPosition(X,Y); // Default starting point
						SHAPE.rotate(2 * Math.PI * Math.random()); // Random starting angle

						//SHAPE.setScale(1); // This is fun! 1 = default, 2 = Large, .5 = Small! (any number will work)

						LAYER.add(SHAPE);
					}
					else
					{
						SHAPE.setPosition(X,Y);
						SHAPE.setRotation((Type.Kind == TankKindEnum.TURRET) ? TurretAngle : BaseAngle); // This rotates the parent, needs to happen always

						if(Type.Kind != TankKindEnum.TURRET)
						{
							try { // Try to rotate the turret, if it has one. The CHILD's angle is relative to the parent, to pos. it right, you need the diff
								SHAPE.getChildren()[1].setRotation(getAngleDifference(BaseAngle,TurretAngle));
							} catch(err) { /* Just leave, no turret on this sucker */ }
						}
						
					}
					
					break;
				case TankKindEnum.PLANE:
					
					if(SHAPE == null)
					{
						if(Type.Name == "UAVScout")
							SHAPE = KDronePlane(_c,_cA);
						else if(Type.Name == "FighterJet")
							SHAPE = KFighterPlane(_c,_cA);
						else if(Type.Name == "BomberPlane")
							SHAPE = KBomberPlane(_c,_cA);

						SHAPE.setPosition(X,Y);
						SHAPE.rotate(2 * Math.PI * Math.random());
						
						SHAPE.on("click",function(){
							die();
						});
						SHAPE.on("mouseover",function(){ writeMessage(
							SHAPE.name +
							((Type.Kind == TankKindEnum.TURRET) ? "\nTurretA=" + TurretAngle : "\nBaseA=" + BaseAngle) +
							"\nState#=" + State +
							"\nTurretBaseA=" + TargetBaseAngle + 
							((Target != null) ? "\nTrgt=" + Target.getShape().name : "")
						)});
						SHAPE.on("mouseout",function(){ writeMessage(""); });
						SHAPE.name = Type.Name + "_" + teamnum + "_" + rndInt(10,100000);

						LAYER.add(SHAPE);
						SHAPE.moveToTop();
					}
					else
					{
						SHAPE.setPosition(X,Y);
						SHAPE.setRotation(BaseAngle);
					}

					break;
			}

			//this.drawHPBar(); // Everyone gets an HP bar!
			this.drawDebugExtras(); // Debug stuffs
		}

		// The Guts of the operation, this makes the unit move/fire/etc
		this.doStuff = function()
		{
			switch(Type.Kind)
			{
				case TankKindEnum.BASE:
					
					// If within cooldown, exit out and wait...
					if(Cooldown > 0) { Cooldown--; return; }
					
					if(Team.getScore() >= getMAX_UNITS_PER_FACTION_ON_MAP()) return;

					var angle = Math.random() * 2 * Math.PI,
						outX = X + 25 * Math.cos(angle),
						outY = Y + 25 * Math.sin(angle);

					var TypeToMake;
					var rand = Math.floor(Math.random() * TotalProb);

					for(var i = 0; i < TankTypes.length; i++){
						if(rand < TankTypes[i].Prob) { TypeToMake = TankTypes[i]; break; }
						else rand -= TankTypes[i].Prob;
					}

					if (!TypeToMake) return;

					Cooldown = Type.CooldownTime;

					if ((new Date().getTime() - Team.getLastTargetFoundDate().getTime()) / 1000 > 10)
						Team.resetLastTargetFoundDate();

					if(Team.getScore() < getMAX_UNITS_PER_FACTION_ON_MAP())
					{
						if(TypeToMake.Kind == TankKindEnum.BUILDER)
						{
							var _TotalOfUnit = Team.getNumOfUnits();// GetNumOfType(TypeToMake,Team);
							var _TotalBasesBuilt = Team.getNumOfUnit(BaseType.Kind); //GetNumOfType(BaseType,Team);

							if ((_TotalBasesBuilt + _TotalOfUnit) >= getMAX_BASE_UNITS()) return; // Maxed out Bases!
						}

						if(TypeToMake.Kind == TankKindEnum.TURRET)
							if ((Team.getNumOfUnit(TankTypes[6].Kind) + Team.getNumOfUnit(TankTypes[7].Kind)) >= getMAX_BASE_DEFENSES()) return; // Maxed out defenses!

						//if(TypeToMake.Special && GetNumOfSpecials() >= getMAX_SPECIAL_UNITS()) return;

						/* Checking if there are any other units out there before building a healer tank. */
						if(TypeToMake.Kind == TankKindEnum.TANK && inArray(TypeToMake.BulletType,ShotType.HEAL) 
							&& Tanks.filter(function(element,index,array){if(element.getTeam()==team&&element.isAttacker())return element;}) <= 0)
								return;

						Tanks.add(new Tank(outX, outY, Team, TypeToMake, teamnum));
						Team.addUnit(TypeToMake.Kind); // Start using this to quickly loop thru teams units (just the type for now...)
						Cooldown = Type.CooldownTime;
					}
					else
						return; // Maxed out units!


					break;
				case TankKindEnum.TANK:
					switch(State)
					{
						case TankStateEnum.IDLE: // 0
							if(Math.random() < MOVE_PROB) {
								TargetBaseAngle = 2 * Math.PI * Math.random();
								State = TankStateEnum.MOVE;
							}
							TargetTurretAngle = TargetBaseAngle;
							turnTurret();
							break;
						case TankStateEnum.MOVE: // 1
							moveForward();
							if(Math.random() < MOVE_PROB)
								State = TankStateEnum.IDLE;
							if(Math.random() < MOVE_PROB)
								TargetBaseAngle = 2 * Math.PI * Math.random();

							TargetTurretAngle = TargetBaseAngle;
							turnTurret();
							findTargets();
							break;
						case TankStateEnum.TARGET_AQUIRED: // 2
								// if (!This.isHealer())
								// 	Team.resetLastTargetFoundDate();

								findTargets(); /* see if there is a better target to fire on*/

								if(Target != null) {
									var TargetDistanceSquared = Target.getDistanceSquaredFromPoint(X, Y);

									if(TargetDistanceSquared <= Type.MinRange * Type.MinRange) {
										TargetBaseAngle = this.getAngleFromPoint(Target.getX(), Target.getY()) + Math.PI;
										moveForward();
										this.moveTurretAndAttack();
									} else if(TargetDistanceSquared <= Type.AttackDistance * Type.AttackDistance) {
										State = TankStateEnum.TARGET_IN_RANGE;
									} else {
										TargetBaseAngle = this.getAngleFromPoint(Target.getX(), Target.getY());
										moveForward();
										this.moveTurretAndAttack();
									}
								}
								else
								{
									State = TankStateEnum.IDLE;
									DestX = X;
									DestY = Y;
								}
							break;
						case TankStateEnum.TARGET_IN_RANGE: // 3
								if(Target === null || !Tanks.contains(Target)) {
									State = TankStateEnum.IDLE;
									DestX = X;
									DestY = Y;
									Target = null;
								} else {
									// if (!This.isHealer())
									// 	Team.resetLastTargetFoundDate();

									if(Target.getDistanceSquaredFromPoint(X, Y) > Type.AttackDistance * Type.AttackDistance) {
										State = TankStateEnum.TARGET_AQUIRED;
									} else {
										this.moveTurretAndAttack();
									}
								}
							break;
						case TankStateEnum.EVADE: // 5
							State = TankStateEnum.MOVE;
							break;
						case TankStateEnum.STOP_AND_GUARD: // 6
							State = TankStateEnum.MOVE;
							break;
					}

					break;
				case TankKindEnum.PLANE:
					switch (State)
					{
						case TankStateEnum.IDLE:
						case TankStateEnum.MOVE:
						case TankStateEnum.EVADE:
							moveForward();
							if(Math.random() < MOVE_PROB) TargetBaseAngle = 2 * Math.PI * Math.random();
							turnTurret();

							// if(inArray(Type.BulletType,ShotType.NONE))
							// 	This.takeDamage(1,null);							
							findTargets();

							break;
						case TankStateEnum.TARGET_AQUIRED:
							moveForward();
							if(Math.random() < MOVE_PROB) TargetBaseAngle = 2 * Math.PI * Math.random();
							turnTurret();
							State = TankStateEnum.MOVE;
							break;
						case TankStateEnum.CRASH_AND_BURN:
							moveForward();
							if(Math.random() < MOVE_PROB) TargetBaseAngle = 2 * Math.PI * Math.random();
							turnTurret();
							die();
							break;
					}
					if(Cooldown > 0) Cooldown--;

					break;
				case TankKindEnum.TURRET:
					switch (State)
					{
						case TankStateEnum.IDLE:
							if(Math.random() < MOVE_PROB)
								TargetTurretAngle = 2 * Math.PI * Math.random() - Math.PI;

							turnTurret();
							findTargets();
							break;
						case TankStateEnum.TARGET_AQUIRED:
							//Team.resetLastTargetFoundDate(); // Update the last found time
							findTargets();
							this.moveTurretAndAttack();

							if(Target === null || !Tanks.contains(Target)
								|| Target.getDistanceSquaredFromPoint(X, Y) > Type.AttackRange * Type.AttackRange) {
								State = TankStateEnum.IDLE;
								Target = null;
							}
							break;
					}
					break;
			}
		}

		this.moveTurretAndAttack = function()
		{
			if(Target != null)
			{
				setTargetTurretAngle(Target);
				turnTurret();
				var TargetDistanceSquared = Target.getDistanceSquaredFromPoint(X, Y);
				if (TargetDistanceSquared <= Type.AttackDistance * Type.AttackDistance) {
					/* Fire at the target while running away! */
					//this.startEvading();
					attack();
				}
			}
		}
		this.callToAttack = function (target)
		{
			/* we already have a target that is closer, can't help right now */
			if(Target != null && Target.getDistanceSquaredFromPoint(X, Y) < target.getDistanceSquaredFromPoint(X, Y)) return;
			/* we can't attack or we can't attack that plane */
			if(!Type.AttackingUnit) return;
			if(!Type.AntiAircraft && target.isPlane()) return;
			if(this.isTurret()) return; /* wait until Target is in range */
			if (State === TankStateEnum.CRASH_AND_BURN) return; /* plane is kamakaziing */

			if(State !== TankStateEnum.TARGET_AQUIRED && State !== TankStateEnum.TARGET_IN_RANGE)
			{ 
				Target = target;
				if(!this.isEvading()) 
					State = TankStateEnum.TARGET_AQUIRED;
			}
		}
		this.takeDamage = function(damage, shooter)
		{
			HitPoints -= damage;

			Team.addTaken(damage);

			if(HitPoints <= 0)
			{
				if(Type.Kind === TankKindEnum.PLANE) State = TankStateEnum.CRASH_AND_BURN;
				else die();
			}
			if(shooter !== null && shooter.getTeam() !== Team)
			{
				shooter.getTeam().addGiven(damage);

				if(HitPoints > 0 && Tanks.contains(shooter)) //Make sure the shooter of this bullet isn't already dead!
				{
					if (this.isHealer() || Type.Kind == TankKindEnum.BUILDER)
					{
						/* not really sure how to handle this; should the healer instantly reverse directions? if so, it shouldn't go here... */

						if(Target == null || (State !== TankStateEnum.TARGET_AQUIRED && State !== TankStateEnum.TARGET_IN_RANGE)) /* currently healing someone */
							State = TankStateEnum.MOVE; /* RUN! RANDOMLY! */
					}
					else if(Type.AntiAircraft || !shooter.isPlane())
					{
						if(!this.isEvading())
						{
							if(Target != null && State == TankStateEnum.TARGET_AQUIRED || State == TankStateEnum.TARGET_IN_RANGE) {
								/* Don't change targets if the current target is attacking this tank */

								if(!Target.attackingTarget(This) &&
									shooter.getDistanceSquaredFromPoint(X, Y) < Target.getDistanceSquaredFromPoint(X, Y)) {
									Target = shooter;
									State = TankStateEnum.TARGET_AQUIRED;
								}
							} else {
								Target = shooter;
								State = TankStateEnum.TARGET_AQUIRED;
							}
						}
					}
				}
				callFriendlies(shooter);
			}
		};


		this.drawDebugExtras = function()
		{
			// Draw ATTACK RANGE Circle
			// if(DRAW_RANGE_CIRCLE)
			// {
			// 	var pointArray = calcPointsCirc(X, Y, Type.AttackDistance,1);
			// 	canvasContext.beginPath();
			// 	canvasContext.arc(X, Y, Type.AttackDistance, 0, 2 * Math.PI, false)
			// 	canvasContext.strokeStyle = Team.getColor().getColorStringWithAlpha(.2);
			// 	canvasContext.stroke();
			// 	canvasContext.closePath();
			// }

			// if(DRAW_DISTANCE_CIRCLE)
			// {
			// 	var pointArray = calcPointsCirc(X, Y, Type.SightDistance,1);
			// 	canvasContext.beginPath();
			// 	canvasContext.arc(X, Y, Type.SightDistance, 0, 2 * Math.PI, false)
			// 	canvasContext.strokeStyle = Team.getColor().getColorStringWithAlpha(.2);
			// 	canvasContext.stroke();
			// 	canvasContext.closePath();
			// }

			DRAW_TARGET_LINE = false; // True for now...
			if(DRAW_TARGET_LINE && Target != null && Tanks.contains(Target) && Type.Kind != TankKindEnum.TURRET)
			{
				var mX = this.getX(), mY = this.getY(),
					x = Target.getX(), y = Target.getY(),
					dx = x - X,
					dy = y - Y,
					w2 = WIDTH * 0.5,
					h2 = HEIGHT * 0.5,
					x2 = x, y2 = y;

				if (dx < -w2) x2 = x + WIDTH;
				if (dx > w2)  x2 = x - WIDTH;
				if (dy < -h2) y2 = y + HEIGHT;
				if (dy > h2)  y2 = y - HEIGHT;

				// Line's basics:
				if(debug.targetLine == null || debug.targetLine == undefined){
					debug.targetLine = new Kinetic.Line({
						stroke : Team.getColor().getStringAlpha(.5),
						strokeWidth : 1,
						dashArray: [rndInt(10,35), rndInt(5,10)]
					});

					LAYER.add(debug.targetLine);
				}

				// I know this is breaking the two line thing, just haven't gotten to it yet...
				/* if line cuts through edge of world we need to draw two lines on each side of screen to simulate
				*  target wrapping.  law of sines to figure out what the lines will be (creating triangles) */
				var iX = (x == x2) ? x : x2;
				var iY = (y == y2) ? y : y2;
				var iPoints = [mX,mY,iX,iY];

				if(!debug.targetLine.getPoints().compare(iPoints)) // Prevents the line from constantly being repositioned if the two are the same!
					debug.targetLine.setPoints(iPoints);

			}
			else
			{
				if(debug.targetLine != null || debug.targetLine != undefined)
				{
					LAYER.remove(debug.targetLine); // No need to draw it any longer
					debug.targetLine = null; // Readies the line for next time a target is found
				}
			}


			// Draw FOV
			DRAW_FOV = false;
			if(DRAW_FOV)
			{
				if(this.isBase() || this.isPlane()) return;

				var useThisAngle = TurretAngle;
				var useAttackAngle = Type.TurretAttackAngle;

				if(!Type.AttackingUnit)
				{
					useThisAngle = BaseAngle;
					useAttackAngle = 45;
				}
				else if(this.isPlane() && Target == null)
					useThisAngle = BaseAngle;

				if(debug.fov != null && debug.fov != undefined)
					LAYER.remove(debug.fov);
				
				debug.fov = new Kinetic.Shape({
					drawFunc: function(){
						var canvasContext = this.getContext();
						canvasContext.beginPath();
						canvasContext.strokeStyle = Team.getColor().getStringAlpha(.5);
						canvasContext.moveTo(X,Y);
						canvasContext.arc(X,Y,Type.SightDistance,useThisAngle - (Math.PI / 180) * useAttackAngle,useThisAngle + (Math.PI / 180) * useAttackAngle,false);
						canvasContext.closePath();
						canvasContext.stroke();
					}
				});

				LAYER.add(debug.fov);
				



			}
		}

		// Private Method
		function setTargetTurretAngle(target)
		{
			if(Type.BulletType == undefined) return; // Typically, if there isn't a weapon, there isn't a turret to fire from.

			if(Type.BulletType[0] == undefined) Type.BulletType = [Type.BulletType];

			var Tx = target.getX(), Ty = Target.getY();
			var ShotTime = Math.sqrt(Target.getDistanceSquaredFromPoint(X, Y)) / Type.BulletType[0].speed;
			Tx += Target.getDx() * ShotTime;
			Ty += Target.getDy() * ShotTime;
			TargetTurretAngle = getAngleFromPoint(Tx, Ty, X, Y);
		}

		function turnTurret()
		{
			var angleDiff = TargetTurretAngle - TurretAngle;
			if(Math.abs(angleDiff) > Math.PI) {
				if(angleDiff > 0) TurretAngle -= Type.TurretTurnSpeed;
				else TurretAngle += Type.TurretTurnSpeed;
			} 
			else
			{
				if(Math.abs(angleDiff) > Type.TurretTurnSpeed) {
					if(angleDiff > 0) TurretAngle += Type.TurretTurnSpeed;
					else TurretAngle -= Type.TurretTurnSpeed;
				} 
				else
					TurretAngle = TargetTurretAngle;
			}
			if(TurretAngle > Math.PI) TurretAngle -=  2 * Math.PI;
			if(TurretAngle < -Math.PI) TurretAngle += 2 * Math.PI;
		};

		function moveForward()
		{
			var turnspeed = TurnSpeed;

			//Find heading towards destination:

			while(TargetBaseAngle > Math.PI)
				TargetBaseAngle -=  2 * Math.PI;
			while(TargetBaseAngle < -Math.PI)
				TargetBaseAngle += 2 * Math.PI;

			//Turn towards heading:
			angleDiff = TargetBaseAngle - BaseAngle;
			if(Math.abs(angleDiff) > Math.PI) {
				if(angleDiff > 0)
					BaseAngle -= turnspeed;
				else
					BaseAngle += turnspeed;
			} else {
				if(Math.abs(angleDiff) > turnspeed) {
					if(angleDiff > 0)
						BaseAngle += turnspeed;
					else
						BaseAngle -= turnspeed;
				} else {
					BaseAngle = TargetBaseAngle;
				}
			}

			if(BaseAngle > Math.PI)
				BaseAngle -= 2 * Math.PI;
			if(BaseAngle < -Math.PI)
				BaseAngle += 2 * Math.PI;

			//Move along current heading:
			if(Math.abs(TargetBaseAngle - BaseAngle) < MAX_MOVE_ANGLE || Type.Kind == TankKindEnum.PLANE)
			{
				var movespeed = MoveSpeed;

				if(This.isPlane() && Target != null && Target.isPlane() && Target.getMoveSpeed() < movespeed
					&& This.getDistanceSquaredFromPoint(X,Y) < Type.MinRange * Type.MinRange &&
					Type.Kind != Target.getKind())
				{
					/* if the target is within 30* of our angle, slow down so we can attack... otherwise circle around */
					if(BaseAngle > Target.getBaseAngle() - (Math.PI / 15) && BaseAngle < Target.getBaseAngle() + (Math.PI / 15))
					{
						//console.log("going to slow down: " + BaseAngle + " : " + Target.getBaseAngle());
						movespeed = Target.getMoveSpeed();
					}
					//else
					//	console.log(BaseAngle + " : " + Target.getBaseAngle() + ", " + (Target.getBaseAngle() - (Math.PI / 15)) + " : " + (Target.getBaseAngle() + (Math.PI / 15)));
				}

				X += movespeed * Math.cos(BaseAngle);
				Y += movespeed * Math.sin(BaseAngle);

				if (WORLD_WRAP)
				{
					if (X > WIDTH) X -= WIDTH; // if you reach the right side
					else if (X < 0) X += WIDTH; // if you reach the left side

					if (Y > HEIGHT) Y = Math.abs(Y - HEIGHT); // If you reach the bottom... set you back at the top
					else if (Y < 0) Y = Math.abs(Y + HEIGHT); // If you reach the top (this works)... set you back at the bottom
				}
			}
		}

		function findTargets()
		{
			if (Target != null && !Tanks.contains(Target)) Target = null;

			if (This.isHealer())
			{
				for(var n in Tanks) {
					if(Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n]))
					{
						if(Tanks[n].getTeam() === Team &&  							/* can only heal the same team */
							Tanks[n] !== This && 									/* don't heal myself*/
							!Tanks[n].isHealer() && 								/* don't heal another healer *sigh* */
							Tanks[n].getDistanceSquaredFromPoint(X, Y) < Type.SightDistance * Type.SightDistance)
						{
							if (Tanks[n].isPlane()) continue; 						/* can't heal a plane */
							if (Tanks[n].isBase() || Tanks[n].isTurret()) continue; /* can't heal a base/item */

							if(Target == null ||									/* don't have a target yet */
								Tanks[n].HitPoints < Target.HitPoints)	 			/* more damaged than my target */
							{
								Target = Tanks[n];

								/* don't switch state if we are running away or dieing */
								if (!This.isEvading() && State !== TankStateEnum.CRASH_AND_BURN)
									State = TankStateEnum.TARGET_AQUIRED;
							}
						}
					}
				}
				return; /* don't target an enemy with the below code */
			}

			for(var n in Tanks) {
				if(Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n]))
				{
					if(Tanks[n].getTeam() != Team &&
						Tanks[n].getDistanceSquaredFromPoint(X, Y) < Type.SightDistance * Type.SightDistance)
					{
						/* choose a better target if we found one closer/more damaged */
						if (Target == null ||
							(This.isPlane() && Type.AntiAircraft && Tanks[n].isPlane()) || 	/* AA planes should attack other planes... */
							(Target.isBase() && !Tanks[n].isBase()) ||  					/* attack something else if we are targetting a base*/
							Tanks[n].HitPoints < Target.HitPoints || 						/* more damaged than my target */
							Tanks[n].isHealer() || 											/* kill their healer! * */
							Tanks[n].getDistanceSquaredFromPoint(X, Y) < Target.getDistanceSquaredFromPoint(X, Y) ||  /* closer*/
							Tanks[n].isSpecial() 											/* kill the mammoth tank! */)
						{
							if (Tanks[n].isPlane() && !Type.AntiAircraft) continue; 		/* non AA can't kill planes */

							Target = Tanks[n];

							/* don't switch state if we are running away or dieing */
							if (!This.isEvading() && State !== TankStateEnum.CRASH_AND_BURN)
								State = TankStateEnum.TARGET_AQUIRED;

							if (Target.isSpecial()) break; //ATTACK THAT SPECIAL TANK!
							else if (Type.AntiAircraft && Target.isPlane()) //AA GO KILL THAT PLANE!
								break;
						}
					}
				}
			}

			if(Target != null) callFriendlies(Target);
		}

		function attack()
		{
			var gun, gunAmmo;
			
			if(Cooldown <= 0) // This unit is ready to fire!
			{
				for(b=0;b<=Type.BulletType.length;b++) // Loop thru all weapons
				{
					gun = Type.BulletType[b]; // Get this gun type

					if(gun == undefined || gun == ShotType.HEAL) continue;

					gunAmmo = Type.Gun[b]; // This lines up the BulletType wih the updated Gun

					if(!gunAmmo.attackaironly && Target.isPlane() && !Type.AntiAircraft) continue; // If your weapon ground only, and you are targeting a plane and you're not AA, skip
					if(gunAmmo.attackaironly && !Target.isPlane()) continue; // If your weapon is AA only, and you're targeting a ground unit, skip
					if(This.isPlane() && !gunAmmo.attackaironly && Target.isPlane()) continue;

					if(TurretAngle == TargetTurretAngle 
						|| TurretAngle > (TargetTurretAngle - (Math.PI/180) * Type.TurretAttackAngle)
						&& TurretAngle < (TargetTurretAngle + (Math.PI/180) * Type.TurretAttackAngle))
					{
						var speed = gunAmmo.speed; // Get the gun speed

						// Special occasion for SHELL like gun
						if(gun == ShotType.SHELL)
						 	speed = (0.95 + Math.random() * .1) * (Math.sqrt(Target.getDistanceSquaredFromPoint(X, Y)) - Type.BarrelLength) / gunAmmo.timetolive;

						//TurretSeparation
						if(Type.DoubleTurret) {
							Bullets.get(X + Math.cos(TurretAngle) * Type.BarrelLength + Math.cos(TurretAngle + Math.PI / 4) * Type.TurretSeparation, Y + Math.sin(TurretAngle) * Type.BarrelLength + Math.sin(TurretAngle + Math.PI / 4) * Type.TurretSeparation, speed * Math.cos(TurretAngle), speed * Math.sin(TurretAngle), gunAmmo.timetolive, Team, gunAmmo.damage, This, gun, Target, Type.AntiAircraft);
							Bullets.get(X + Math.cos(TurretAngle) * Type.BarrelLength + Math.cos(TurretAngle - Math.PI / 4) * Type.TurretSeparation, Y + Math.sin(TurretAngle) * Type.BarrelLength + Math.sin(TurretAngle - Math.PI / 4) * Type.TurretSeparation, speed * Math.cos(TurretAngle), speed * Math.sin(TurretAngle), gunAmmo.timetolive, Team, gunAmmo.damage, This, gun, Target, Type.AntiAircraft);
						} else {
							Bullets.get(
								X + Math.cos(TurretAngle) * Type.BarrelLength,
								Y + Math.sin(TurretAngle) * Type.BarrelLength, 
								speed * Math.cos(TurretAngle), 
								speed * Math.sin(TurretAngle), 
								gunAmmo.timetolive, 
								Team, 
								gunAmmo.damage, 
								This, 
								gun, 
								Target, 
								Type.AntiAircraft
							);
						}
						
						Cooldown = Type.CooldownTime;
						//Type.Gun[b].reloadtime = 100;
					}
				}
			}
			else
				Cooldown--;
		}

		function callFriendlies(target)
		{
			for(var n in Tanks) {
				if(Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n])) {
					if(Tanks[n].getTeam() == Team) {
						Tanks[n].callToAttack(target);
					}
				}
			}
		}

		function SetupMyGuns()
		{

			var _ShotType = ShotType;

			// Default Setup for Guns and Adjustments
			var dGuns = {
				damage : 0,
				timetolive : 0,
				speed : 0,
				splashDamage : false,
				attackaironly : false,
				attackgroundonly: false,
				instantkill : false,
				reloadtime : 0
			};

			// Current Guns
			var guns = Type.BulletType,
				updatedGuns = [];

			if(inArray(guns, ShotType.NONE) || inArray(guns, ShotType.HEAL))
				return;

			var i = 0;
			for(var g in guns)
			{
				var ammo = guns[g];
				
				if(ammo == undefined) ammo = [dGuns]; // Sucks to be you!
				ammo = array_merge(dGuns,ammo); // Ensures defaults are set AT THE BASE CLASS!

				// Need to get adjustments and apply their settings
				// Ensures defaults are set AT THE BASE CLASS of Adjustments. Not all units need to have these set, meaning they'll get the defaults.
				var adjGun = array_merge(ammo,Type.BulletAdjust[i++]); 

				ammo.damage += adjGun.damage;
				ammo.speed += adjGun.speed;
				ammo.attackaironly = adjGun.attackaironly;
				updatedGuns.push(ammo);

				/* TODO: Update the rest of them, right now, most things use defaults! */
				
			}

			Type.Gun = updatedGuns; // Commits the updated gun to this tanks new weapon grade	
		}

		function die()
		{
			var exps = Math.floor(Math.random() * 4 + 8);
			if (IS_MOBILE || getFPS < FPS_TOO_LOW) expos = 2;

			for(var i = 0; i < exps; i++) {
				Explosions.get(X + Math.random() * 14 - 7, Y + Math.random() * 14 - 7, i * 2, 12 + Math.random() * 10);
			}

			// var debris = Math.floor(3 + Math.random() * 4);
			// if (IS_MOBILE || getFPS < FPS_TOO_LOW) debris = 2;

			// for(i = 0; i < debris; i++) {
			// 	var angle = Math.random() * 2 * Math.PI;
			// 	var speed = Math.random() * 4 + .2;
			// 	DebrisSet.add(new Debris(X, Y, Math.cos(angle) * speed + This.getDx(), Math.sin(angle) * speed + This.getDy(), Math.random() * 10 + 20));
			// }
			
			LAYER.remove(SHAPE); // Bye!
			Team.setScore(Team.getScore() - 1);
			Team.removeUnit(Type.Kind);
			Tanks.remove(This);
		}

		Team.setScore(Team.getScore() + 1);
		Team.addScore(1);
		Team.addTicket();
	}