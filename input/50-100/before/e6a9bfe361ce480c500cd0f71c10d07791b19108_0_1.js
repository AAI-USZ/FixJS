function checkTimeValue(value) {
            var pattern = /^(?:600|[1-5]\d{0,2}|[1-9]\d|[1-9])$/;
            return pattern.test(value);
        }