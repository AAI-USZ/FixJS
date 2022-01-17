function(d)
{
    this.detailLevel = 4;
    this.isArgyled = false;

    // timeline canvas props
    this.w = 800;
    this.h = 75 ;
    this.tickH = 20;
    this.margin = 5;
    this.timelineEndDateFmtStr = "MMM D, YYYY";
    this.timelineMidDateFmtStr = "MMM D";

    DateSpan.init(d['timezone']);
    this.semester = DateSpan.priceIsRightSem(d['semesters']);
}