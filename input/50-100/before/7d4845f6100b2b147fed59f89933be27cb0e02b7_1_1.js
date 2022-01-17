function createHTMLforDists()
{
    for(i = 0; i < clDistrib.length; i++) {
        datagraphs = document.getElementById("datagraphs");
        datagraphs.innerHTML += "\
        <div class=\"block\" id=\"" + clDistrib[i].blockDivID +"\"> \
        <table id=\"plot-table-a\"> \
        <tr> \
        <td> \
            <div id=\""+ clDistrib[i].dataDivID + "\" class=\"myPlotData\"> \
            <canvas id=\""+ clDistrib[i].canvasID + "\" width=\"420\" height=\"100\"> \
            no support for canvas</canvas> \
            </div> \
        </td> \
        <td> \
            <div id=\"" + clDistrib[i].labelDivID + "\" class=\"draghandle\"><b> \
            (" + i + ") Newly learnt clause size distribution. \
            Bottom: unitary clause. Top: largest clause. \
            Black: Many learnt. White: None learnt. \
            Horizontal resolution: 1000 conflicts. \
            Vertical resolution: 1 literal \
            </b></div> \
        </td> \
        </tr> \
        </table> \
        </div>";
    }
}