function Construct(data)
{
    this.id = data.id;
    this.name = data.name;
    this.desc = data.desc;
    this.length = data.length;
    this.cfs = new Array();
    this.fs = new Array();
    this.modified = data.created;

    for(var i = 0; i < data.cfs.length; i=i+1)
    {
        var f = new Fragment(data.fs[i]);
        this.fs.push(f);
        this.cfs.push(new ConstructFragment(data.cfs[i], f));
    }

   this.addFragment = function(fid, position, direction, _suc)
    {
        AJAX.post({
            url: '/gibthon/api/' + this.id + '/addFragment/', 
            data: {'fid': fid, 'pos': position, 'dir':direction,}, 
            success: function() {if(_suc!=undefined) _suc();},
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log('Could not addFragment: ' + textStatus);
            },
        });
    }

    this.rmFragment = function(fid, _suc)
    {
        AJAX.post({
            url: '/gibthon/api/' + cid + '/rmFragment/', 
            data: {'cfid': cfid,}, 
            success: function() {if(_suc!=undefined) _suc();},
        });
    }

    this.reorder = function(fids, _suc)
    {
        ajax.post({
            url: '/gibthon/api/' + cid + '/saveOrder/', 
            data: {'d[]': d,},
            success: function() {if(_suc!=undefined) _suc();},
        });
    }

    this.saveInfo = function()
    {
        ajax.post({
            url: '/gibthon/api/' + cid + '/saveMeta/', 
            data: {'name': this.name, 'desc': this.desc,}, 
        });
    }



}