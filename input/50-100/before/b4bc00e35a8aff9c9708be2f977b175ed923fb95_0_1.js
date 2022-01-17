function(){ writeMessage(
							SHAPE.name + 
							((Type.Kind == TankKindEnum.TURRET) ? " TurretA=" + TurretAngle : " BaseA=" + BaseAngle) +
							" State#=" + State +
							" TurretBaseA=" + TargetBaseAngle + 
							((Target != null) ? " Trgt=" + Target.getShape().name : "")
						)}