function is_wrong_value (val)
{
        var possibilities = [4, 2, 1, 0.5, 0.25, 0.125, 0.0625];

        for (var i = 0; i < 7; i++)
        {
            if (val == possibilities[i])
            {
                return false;
            }
        }
        writeInConsole ("ERROR:Is wrong value :" + val);
        return true;
}