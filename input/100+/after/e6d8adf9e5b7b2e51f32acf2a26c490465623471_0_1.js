function(title){
    if (title.toLowerCase().indexOf(" ts ")   != -1 ||
        title.toLowerCase().indexOf("dvdscr") != -1 ||
        title.toLowerCase().indexOf(" scr ")  != -1 ||
        title.toLowerCase().indexOf("tsrip")  != -1 ||
        title.toLowerCase().indexOf("camrip") != -1 ||
        title.indexOf(" CAM ")                != -1)
        return "screener";

    if (title.toLowerCase().indexOf("brrip")  != -1 ||
        title.toLowerCase().indexOf("bdrip")  != -1 ||
        title.toLowerCase().indexOf("bd rip") != -1)
        return "blu-ray rip";

    return "dvd rip";
}