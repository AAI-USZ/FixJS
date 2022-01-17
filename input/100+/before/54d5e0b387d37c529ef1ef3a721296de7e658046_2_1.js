function(player)
{
    var folder = "|images/misc/" + player.folder_;
    var uppercutVelocityY = 120;
    var uppercutVelocityYRate = 60;
    var uppercutVelocityXRate = 20;

    var uppercut_land = player.AddAnimation(MISC_FLAGS.NONE,"uppercut landing",200,["uppercut-landing"],0,false,false);
    uppercut_land.AddFrameWithSound(player,1,"audio/misc/jump-land.zzz","",folder + "/x-uppercut-p1-6.png",4,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE);
    for(var x = 0; x < 3; ++x)
    {
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var s_uppercut = player.AddAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"s_uppercut p" + (x+1),300,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,BUTTONS.FORWARD|button],999,true,true);
        s_uppercut.EnergyToAdd = (10);
        s_uppercut.Flags = ({Combat:COMBAT_FLAGS.NO_SLIDE_BACK});
        s_uppercut.IsSuperMove = true;
        s_uppercut.energyToSubtract_ = CONSTANTS.ONE_LEVEL * (x + 1);
        s_uppercut.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.ALL);

        s_uppercut.Vy = (uppercutVelocityY + (2 * uppercutVelocityYRate));
        /*the following object will be passed in to the function that will be used to compute the X coordinate*/
        s_uppercut.VxFnArgs = {xMax:30 + (2*uppercutVelocityXRate),xMin:3,xInc:1.1,valueMax:10};
        /*the following function will be executed each frame to compute the X coordinate of this move*/
        s_uppercut.VxFn = (function(args)
        {
            var count = 0;
            return function(dx,t)
            {
                dx = Math.min(args.xMax/(count+=(args.xInc)),args.valueMax);
                if(dx <= args.xMin) dx = 0;

                return dx;
            }
        });

        var maxIter = x < 2 ? 1 : x;
        var dx = (x+4);
        s_uppercut.AddFrameWithSound(player,1,"audio/ken/super-start.zzz","",folder + "/x-uppercut-p1-0.png",76,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},dx,0,0,25,0,0,0,null,0,0,0,-CONSTANTS.ONE_LEVEL*(x+1));
        s_uppercut.AddFrameWithSound(player,1,"audio/ken/shoryuepa.zzz"  ,"",folder + "/x-uppercut-p1-0.png",1,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},{Player:PLAYER_FLAGS.MOBILE,Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE},dx);
        for(var i = 0; i < maxIter; ++i)
        {
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-0.png",3,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},{Player:PLAYER_FLAGS.MOBILE,Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE},dx);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-1.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},MISC_FLAGS.NONE,dx);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-2.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,dx,0,0,25,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.NEAR,x:170,y:177}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,5);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-3.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,dx,0,0,25,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.FAR,x:130,y:127},{state:HIT_FLAGS.FAR,x:110,y:227},{state:HIT_FLAGS.FAR,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,5);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-4.png",3,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},MISC_FLAGS.NONE,0);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-5.png",3,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},MISC_FLAGS.NONE,0);
            s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-6.png",2,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},MISC_FLAGS.NONE,0);
        }
        s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-0.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES},MISC_FLAGS.NONE,dx);
        s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-1.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,dx,0,0,25,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.FAR,x:130,y:107}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,5);
        s_uppercut.AddRepeatingFrame(player,"",folder + "/x-uppercut-p1-2.png",4,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,dx,0,0,25,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.NEAR,x:170,y:177}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,5);
        s_uppercut.AddFrame(player,"",folder + "/x-uppercut-p1-3.png",1,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK,Pose:POSE_FLAGS.AIRBORNE, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,25,null,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.FAR,x:130,y:127},{state:HIT_FLAGS.FAR,x:110,y:227},{state:HIT_FLAGS.FAR,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.THRID_HIT,CONSTANTS.SINGLE,5);
        s_uppercut.AddFrame(player,"",folder + "/x-uppercut-p1-3.png",16,{Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Combat:COMBAT_FLAGS.ATTACK, HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,25,null,0,0,ATTACK_FLAGS.CAN_AIR_JUGGLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.FAR,x:130,y:127},{state:HIT_FLAGS.FAR,x:110,y:227},{state:HIT_FLAGS.FAR,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.THRID_HIT,CONSTANTS.SINGLE,5);
        s_uppercut.EndBlock();
        s_uppercut.AddFrame(player,"",folder + "/x-uppercut-p1-4.png",6,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_AIR_BLOCKED});
        s_uppercut.AddFrame(player,"",folder + "/x-uppercut-p1-5.png",CONSTANTS.MAX_FRAME,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
        s_uppercut.Chain(uppercut_land);



        /*add the trail for the super move*/
        
        var trail = CreateAnimationTrail([]);
        for(var trailIndex = 0; trailIndex < 3; ++trailIndex)
        {
            /*trail*/
            var s_uppercut_trail = CreateGenericAnimation("super s_uppercut trail");
            s_uppercut_trail.AddTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-0.png",100);
            for(var i = 0; i < maxIter; ++i)
            {
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-0.png",4);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-1.png",4);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-2.png",4);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-3.png",4);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-4.png",3);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-5.png",3);
                s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-6.png",2);
            }
            s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-0.png",4);
            s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-1.png",4);
            s_uppercut_trail.AddRepeatingTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-2.png",4);
            s_uppercut_trail.AddTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-3.png",1);
            s_uppercut_trail.AddTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-3.png",16);
            s_uppercut_trail.AddTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-4.png",6);
            s_uppercut_trail.AddTrailFrame(player,folder + "/x-super-uppercut-" + trailIndex + "-5.png",CONSTANTS.MAX_FRAME);

            trail.Add(s_uppercut_trail);
        }



        s_uppercut.Trail = trail;

    }
}