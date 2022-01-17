function getPixelLentgh (note, deltaMin ,coef)
{
    var ConvertNote = {"4" :{"4":80}, "2":{"2":60,"1":40}, "1":{"2":55, "1":45, "0.5":30}, "0.5":{"2":55, "1": 40, "0.5":25, "0.25":15}, 
    "0.25":{"2": 50, "1":40, "0.5":30, "0.25":20, "0.125":15}, "0.125":{"2":45, "1":40,"0.5":30,"0.25":20,"0.125":13, "0.0625":10},
    "0.0625":{"2":45, "1":30, "0.5":20, "0.25":15, "0.125":13, "0.0625":11, "0.03125":10 } };
    
    try
    {

        var first_duration = get_first_duration (note._duration/480);
        var first_distance = ConvertNote[deltaMin][first_duration];
        try
        {
            var second_duration = get_second_duration (note._duration/480, first_duration);
            var second_distance = second_duration!=0? ConvertNote[deltaMin][second_duration]:0;
            return (first_distance + second_distance)*(coef + 1);
        }
        catch (e)
        {
            writeInConsole ("Error:deltaMin=" + deltaMin + " secondduration=" + second_duration);
            return first_duration;
        }
    }
    catch (e)
    {
            writeInConsole ("Error:deltaMin=" + deltaMin + " firstduration=" + first_duration);
            return first_duration;
    }
}