function(frame,attackState,damage)
{
    if(this.IsDead())
        return;
    var value = 0;

    if(!!(attackState & ATTACK_FLAGS.LIGHT)) {value += CONSTANTS.LIGHT_INCREASE_DIZZY;}
    if(!!(attackState & ATTACK_FLAGS.MEDIUM)) {value += CONSTANTS.MEDIUM_INCREASE_DIZZY;}
    if(!!(attackState & ATTACK_FLAGS.HARD)) {value += CONSTANTS.HARD_INCREASE_DIZZY;}

    this.ChangeDizzy(value);
}