function(d)
{
    this.data = d;
    this.events = d['events'];
    this.detailLevel = 4;
    this.isArgyled = false;

    // timeline canvas props
    this.w = 800;
    this.h = 75 ;
    this.tickH = 20;
    this.margin = 5;
    this.dateFmtStr = "MMM D, YYYY";

    DateSpan.init(d['timezone']);
}