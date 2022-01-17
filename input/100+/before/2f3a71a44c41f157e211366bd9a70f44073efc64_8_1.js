function StateDirectionShadowElement(base, state, direction, showInvisible)
{
    StateDirectionShadowElement.baseConstructor.call
        (this, base, showInvisible);   

    this.setState(state);
    this.setDirection(direction);
}