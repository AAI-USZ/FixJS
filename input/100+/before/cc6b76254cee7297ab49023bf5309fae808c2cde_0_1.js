function (event) {
                var date = event.date,
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear(),
                    hour = date.getHours(),
                    minute = date.getMinutes(),
                    second = date.getSeconds();
                return (month < 10 ? '0' + month : month) + '.' +
                       (day < 10 ? '0' + day : day) + '.' + year + ' - ' +
                       (hour < 10 ? '0' + hour : hour) + ':' +
                       (minute < 10 ? '0' + minute : minute) + ':' +
                       (second < 10 ? '0' + second : second);
            }