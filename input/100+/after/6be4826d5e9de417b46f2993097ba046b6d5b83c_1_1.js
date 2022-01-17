function(test) {
        test.expect(18);
        moment.lang('ru');
        var a = [
                ['dddd, MMMM Do YYYY, h:mm:ss a',      'воскресенье, февраль 14. 2010, 3:25:50 pm'],
                ['ddd, hA',                            'вск, 3PM'],
                ['M Mo MM MMMM MMM',                   '2 2. 02 февраль фев'],
                ['YYYY YY',                            '2010 10'],
                ['D Do DD',                            '14 14. 14'],
                ['d do dddd ddd dd',                   '0 0. воскресенье вск вс'],
                ['DDD DDDo DDDD',                      '45 45. 045'],
                ['w wo ww',                            '8 8. 08'],
                ['h hh',                               '3 03'],
                ['H HH',                               '15 15'],
                ['m mm',                               '25 25'],
                ['s ss',                               '50 50'],
                ['a A',                                'pm PM'],
                ['t\\he DDDo \\d\\ay of t\\he ye\\ar', 'the 45. day of the year'],
                ['L',                                  '14-02-2010'],
                ['LL',                                 '14 февраля 2010'],
                ['LLL',                                '14 февраля 2010 15:25'],
                ['LLLL',                               'воскресенье, 14 февраля 2010 15:25']
            ],
            b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
            i;
        for (i = 0; i < a.length; i++) {
            test.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
        }
        test.done();
    }