function drawAllDists()
{
    for(i = 0; i < 2; i++) {
        a = new DrawClauseDistrib(
                clDistrib[i].data
                , clDistrib[i].canvasID
                , simplificationPoints[i]
            );
        a.drawPattern(0, maxConflRestart[i]);
        dists.push(a);
    }
}