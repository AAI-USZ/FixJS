function () {

  mage.locale();

  assertEquals('6/7/2012', mage.localize.date('06/07/2012 3:30 PM', 'd'));

  assertEquals('Thursday, June 07, 2012', mage.localize.date('06/07/2012 3:30 PM', 'D'));

  assertEquals('Thursday, June 07, 2012 3:30 PM', mage.localize.date('6/7/2012 3:30 PM', 'f'));

  assertEquals('Thursday, June 07, 2012 3:30:00 PM', mage.localize.date('6/7/2012 3:30 PM', 'F'));

  assertEquals('June 07', mage.localize.date('6/7/2012 3:30 PM', 'M'));

  assertEquals('2012-06-07T15:30:00', mage.localize.date('6/7/2012 3:30 PM', 'S'));

  assertEquals('3:30 PM', mage.localize.date('6/7/2012 3:30 PM', 't'));

  assertEquals('3:30:00 PM', mage.localize.date('6/7/2012 3:30 PM', 'T'));

  assertEquals('2012 June', mage.localize.date('6/7/2012 3:30 PM', 'Y'));

  assertEquals('Invalid date formatter', mage.localize.date('06/07/2012 3:30 PM', 'x'));

  assertEquals('Invalid date formatter', mage.localize.date('06/07/2012 3:30 PM', '2'));



}