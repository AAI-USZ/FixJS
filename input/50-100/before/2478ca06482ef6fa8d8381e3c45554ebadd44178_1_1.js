function validateMime(name)
{
    var type = mime.lookup(name);
    var validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

    if(validTypes.indexOf(type) == -1)
        return false;
    else
        return true;
}