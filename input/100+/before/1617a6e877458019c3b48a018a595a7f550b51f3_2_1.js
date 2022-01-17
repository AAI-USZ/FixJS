function() {

    var localize = new mage.Localize();

    assertEquals('6/7/2012', localize.date('06/07/2012 3:30 PM', 'd'));

    assertEquals('Thursday, June 07, 2012', localize.date('06/07/2012 3:30 PM', 'D'));

    assertEquals('Thursday, June 07, 2012 3:30 PM', localize.date('6/7/2012 3:30 PM', 'f'));

    assertEquals('Thursday, June 07, 2012 3:30:00 PM', localize.date('6/7/2012 3:30 PM', 'F'));

    assertEquals('June 07', localize.date('6/7/2012 3:30 PM', 'M'));

    assertEquals('2012-06-07T15:30:00', localize.date('6/7/2012 3:30 PM', 'S'));

    assertEquals('3:30 PM', localize.date('6/7/2012 3:30 PM', 't'));

    assertEquals('3:30:00 PM', localize.date('6/7/2012 3:30 PM', 'T'));

    assertEquals('2012 June', localize.date('6/7/2012 3:30 PM', 'Y'));

}