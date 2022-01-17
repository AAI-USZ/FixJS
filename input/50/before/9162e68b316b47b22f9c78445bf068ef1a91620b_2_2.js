function() {
    // band check performed in checkJump
    //if (xdata.gband) this.__modify(Element.SYS_MOD, 0, Render.m_checkBand, xdata.gband); 
    this.__modify(Element.SYS_MOD, 0, Render.m_saveReg);
    this.__modify(Element.SYS_MOD, 0, Render.m_applyPos);
}