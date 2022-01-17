function(){ writeMessage(
							SHAPE.name +
							((Type.Kind == TankKindEnum.TURRET) ? "\nTurretA=" + TurretAngle : "\nBaseA=" + BaseAngle) +
							"\nState#=" + State +
							"\nTurretBaseA=" + TargetBaseAngle + 
							((Target != null) ? "\nTrgt=" + Target.getShape().name : "")
						)}