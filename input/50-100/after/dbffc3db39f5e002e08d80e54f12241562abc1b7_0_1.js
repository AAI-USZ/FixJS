function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h,", BioLogica.FEMALE);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.FEMALE);
    expect(org.alleles).toBe("a:h,b:h");
  }