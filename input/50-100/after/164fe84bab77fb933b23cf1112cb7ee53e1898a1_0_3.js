function get_first_duration (duration) //Retourne la durée sans la valeur pointé ex: 3 => 2
{
    var possibilities = [4, 2, 1, 0.5, 0.25, 0.125, 0.0625];
    
    for (var i = 0; i < 7; i++)
    {
        if (Math.floor(duration / possibilities[i])  != 0)
        {
              return possibilities[i];
        }
    }
    writeInConsole ("ERROR:get_first_duration wrong value  :" + duration);
    return null;
}