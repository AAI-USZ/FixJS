function( condition, label )
{
    if( eval(condition) ) this.doGotoLabel( label );
}