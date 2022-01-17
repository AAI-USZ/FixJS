function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:rh,b:rh", BioLogica.MALE);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.MALE);
    expect(org.genetics.genotype.chromosomes['XY']['y'].alleles.length).toBe(0);
  }