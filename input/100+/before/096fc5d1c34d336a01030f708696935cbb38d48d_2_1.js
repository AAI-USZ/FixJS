function()
{
    this.getConstructByID = function(cid, _suc)
    {
        AJAX.post({
            url: '/gibthon/api/' + cid + '/getInfo/', 
            success: function(data)
            {
                _suc(new Construct(data));
            }
        });
    }
}