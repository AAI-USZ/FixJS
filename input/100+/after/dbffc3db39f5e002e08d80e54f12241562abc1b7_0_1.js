function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake,
      {
        "1": {
          "a": ["W", "t", "M"],
          "b": ["Tk", "w", "m"]
        },
        "2": {
          "a": ["h","C","fl","Hl","A1"],
          "b": ["H","c","fl","hl","A2"]
        },
        "XY": {
          "x1": ["D","B","Rh"],
          "x2": ["dl","B","Rh"]
        }
      });

    expect(org.genetics.genotype.getAlleleString())
      .toBe("a:t,b:Tk,a:M,b:m,a:W,b:w,a:h,b:H,a:C,b:c,a:fl,b:fl,a:Hl,b:hl,a:A1,b:A2,a:B,b:B,a:D,b:dl,a:Rh,b:Rh");
  }