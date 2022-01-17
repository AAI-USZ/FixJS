function(frame,stageX,stageY)
{
    var i = 0;
    var hasActiveProjectiles = false;
    while(i < this.projectiles_.length)
    {
        if(this.projectiles_[i].IsActive())
        {
            hasActiveProjectiles = true;
            this.projectileAttackFn_(frame,this.projectiles_[i].Advance(frame,stageX,stageY));
        }
        else if(this.projectiles_[i].IsDisintegrating())
            this.projectileAttackFn_(frame,this.projectiles_[i].Advance(frame,stageX,stageY));
        ++i;
    }
    /*No projectiles are active, clear the projectile state and allow the player to throw another projectile*/
    if(!hasActiveProjectiles)
        this.flags_.Combat.Remove(COMBAT_FLAGS.PROJECTILE_ACTIVE);
}