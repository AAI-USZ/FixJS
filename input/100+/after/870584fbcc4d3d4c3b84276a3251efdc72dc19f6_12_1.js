function () {
        var date = jasmine.createSpyObj('date', [
            'getDate', 'getMonth', 'getFullYear',
            'getHours', 'getMinutes', 'getSeconds'
        ]);
        Pattern = loadModuleExports(path.join('lib', 'logging', 'layouts', 'pattern.js'));
        event = jasmine.createSpyObj('event', ['date', 'level', 'logger', 'message']);
        event.date.andReturn(date);
        event.level.andReturn('info');
        event.logger.andReturn('RAIN');
        event.message.andReturn('Custom message');

        date.getDate.andReturn(1);
        date.getMonth.andReturn(1);
        date.getFullYear.andReturn(1970);
        date.getHours.andReturn(1);
        date.getMinutes.andReturn(1);
        date.getSeconds.andReturn(1);
    }