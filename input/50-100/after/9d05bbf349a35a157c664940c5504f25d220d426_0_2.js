function(elm) {
    prevAddDebugRender(elm);

    elm.__paint(E.DEBUG_PNT, 0, p_drawCPath);
    elm.__paint(E.DEBUG_PNT, 0, p_drawAdoptedRect);
    elm.__paint(E.DEBUG_PNT, 0, p_drawAdoptedPoints);
    //elm.__paint(E.DEBUG_PNT, 0, p_drawPathAt);
    elm.__paint(E.DEBUG_PNT, 0, p_drawGhost);
    //elm.__paint(E.DEBUG_PNT, 0, p_drawGhostVec);
}