function()
    {
        console.log('FragmentContainer debug information:');
        console.log('  ._length = '+this._length);
        console.log('  ._eff_length = '+this._eff_length);
        console.log('  numChildren: '+this.getNumChildren());
        for(var i = 0; i<this.getNumChildren(); i=i+1)
        {
            var c = this.getFragAt(i);
            console.log('  ['+i+'] - '+c+' '+c._f.getLength()+'bp '+
                        c.getStart()+' -> '+c.getEnd()+' _drag = '+c._drag);
        }
    }