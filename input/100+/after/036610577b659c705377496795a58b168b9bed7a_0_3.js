function()
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

					//Tanks.add(new Tank(outX, outY, Team, TypeToMake, teamnum)); // Test
					Cooldown = Type.CooldownTime;

					if ((new Date().getTime() - Team.getLastTargetFoundDate().getTime()) / 1000 > 10)
						Team.resetLastTargetFoundDate();

					if(Team.getScore() < getMAX_UNITS_PER_FACTION_ON_MAP())
					{
						if(TypeToMake.Kind == TankKindEnum.BUILDER)
						{
							var _TotalOfUnit = GetNumOfType(TypeToMake,Team);
							var _TotalBasesBuilt = GetNumOfType(BaseType,Team);

							if ((_TotalBasesBuilt + _TotalOfUnit) >= getMAX_BASE_UNITS()) return; // Maxed out Bases!
						}

						if(TypeToMake.Kind == TankKindEnum.TURRET)
							if (GetNumOfType(TankTypes[6]) + GetNumOfType(TankTypes[7],Team) >= getMAX_BASE_DEFENSES()) return; // Maxed out defenses!

						if(TypeToMake.Special && GetNumOfSpecials() >= getMAX_SPECIAL_UNITS()) return;

						/* Checking if there are any other units out there before building a healer tank. */
						if(TypeToMake.Kind == TankKindEnum.TANK && inArray(TypeToMake.BulletType,ShotType.HEAL) 
							&& Tanks.filter(function(element,index,array){if(element.getTeam()==team&&element.isAttacker())return element;}) <= 0)
								return;

						Tanks.add(new Tank(outX, outY, Team, TypeToMake, teamnum));
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
							break;
						case TankStateEnum.STOP_AND_GUARD: // 6
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

							
							//findTargets();
							break;
						case TankStateEnum.TARGET_AQUIRED:
							moveForward();
							if(Math.random() < MOVE_PROB) TargetBaseAngle = 2 * Math.PI * Math.random();
							turnTurret();
							break;
						case TankStateEnum.CRASH_AND_BURN:
							moveForward();
							if(Math.random() < MOVE_PROB) TargetBaseAngle = 2 * Math.PI * Math.random();
							turnTurret();
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