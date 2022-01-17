function()
    {
        var test_data = {
            id: 1,
            name: 'Test Construct',
            desc: 'This construct is a test',
            length: 10079,
            modified: 'blah',
            fs: [
                {
                    "origin": "BioBrick", 
                    "name": "pSB1C3", 
                    "refs": [], 
                    "annots": {}, 
                    "length": 2070, 
                    "id": 1, 
                    "desc": "High copy BioBrick assembly plasmid"
                },
                {
                    "origin": "BioBrick", 
                    "name": "BBa_K325219", 
                    "refs": [], 
                    "annots": {}, 
                    "length": 3841, 
                    "id": 2, 
                    "desc": "Red Firefly Luciferase and LRE"+
                        "(under pBAD)L. Cruciata(E. coli optimised)"
                },
                {
                    "origin": "Nucleotide Database", 
                    "name": "HD065425", 
                    "refs": [], 
                    "annots": {}, 
                    "length": 4168, 
                    "id": 5, 
                    "desc": "Sequence 52 from Patent WO2010070295."
                },
            ],
            cfs: [
                {
                    id: 1,
                    direction: 1,
                    s_offset: 0,
	                s_feat: -1,
                    e_offset: 0,
                    e_feat: -1,
                    order: 0,
                },
                {
                    id: 2,
                    direction: -1,
                    s_offset: 0,
	                s_feat: -1,
                    e_offset: 0,
                    e_feat: -1,
                    order: 1,
                },
                {
                    id: 3,
                    direction: 1,
                    s_offset: 0,
	                s_feat: -1,
                    e_offset: 0,
                    e_feat: -1,
                    order: 2,
                },
            ],
        };
        
        return new Construct(test_data);
    }