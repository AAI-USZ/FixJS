function drawLines (context, x, y, width)
{
    for (var j = 0; j < context.nb_cordes; j++)
    {
        context.svg.line(x, y + (j*10), x+width, y + (j*10), {stroke:"black", "stroke-opacity": "75%"});
    }
}