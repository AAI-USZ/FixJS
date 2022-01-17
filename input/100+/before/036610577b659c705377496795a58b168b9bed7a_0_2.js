function()
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

						group.add(this.drawCircle(10,10,BASE_HEAL_RADIUS,.2)); // Draw Healing Circle
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

						SHAPE.setScale(1); // This is fun! 1 = default, 2 = Large, .5 = Small! (any number will work)

						LAYER.add(SHAPE);
					}
					else
					{
						SHAPE.setPosition(X,Y);
						SHAPE.setRotation((Type.Kind == TankKindEnum.TURRET) ? TurretAngle : BaseAngle); // This rotates the parent, needs to happen always

						if(Type.Kind != TankKindEnum.TURRET)
						{
							try { // Try to rotate the turret, if it has one
								SHAPE.getChildren()[1].setRotation(TurretAngle);
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
						
						//SHAPE.on("mousedown",function(){ writeMessage(SHAPE.name); });
						//SHAPE.on("mouseup",function(){ writeMessage(""); });
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

			this.drawHPBar(); // Everyone gets an HP bar!
			this.drawDebugExtras(); // Debug stuffs
		}