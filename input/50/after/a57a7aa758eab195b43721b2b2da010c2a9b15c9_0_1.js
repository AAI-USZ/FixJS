function(start, end, value)
{
    start = moment(start);
    end = moment(end);

    // do the diff in UTC mode. Otherwise it will compare times disregarding timezones
    start.utc();
    end.utc();
    return end.diff(start, value);
}