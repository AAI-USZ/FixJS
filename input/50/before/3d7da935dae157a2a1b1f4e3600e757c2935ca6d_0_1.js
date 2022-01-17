function(value) {
                                                    // fix to a power of two
                                                    ssao._noiseTextureSize = Math.pow(2,value);
                                                    ssao.dirty(); 
                                                }