function PatternLayout(params) {
    if (!params || typeof params.pattern !== 'string') {
        throw new RainError('', RainError.ERROR_PRECONDITION_FAILED);
    }
    this._params = params;

    this._placeholders = {
        'date':
            function (event) {
                var date = event.date(),
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear(),
                    hour = date.getHours(),
                    minute = date.getMinutes(),
                    second = date.getSeconds();
                return (month < 10 ? '0' + month : month) + '/' +
                       (day < 10 ? '0' + day : day) + '/' + year + ' - ' +
                       (hour < 10 ? '0' + hour : hour) + ':' +
                       (minute < 10 ? '0' + minute : minute) + ':' +
                       (second < 10 ? '0' + second : second);
            },
        'level':
            function (event) {
                return event.level();
            },
        'logger':
            function (event) {
                return event.logger();
            },
        'message':
            function (event) {
                return event.message();
            },
        'newline': function () {
            return ('win32' === process.platform) ? '\r\n' :
                   ('darwin' === process.platform) ? '\r' : '\n';
            },
        'stacktrace':
            function (event) {
                return event.error() && event.error().stack;
            }
    };

    var pattern = '';
    for (var key in this._placeholders) {
        if(this._placeholders.hasOwnProperty(key)) {
            pattern += '%' + key + '|';
        }
    }
    pattern += '%%';

    this._pattern = pattern;
}