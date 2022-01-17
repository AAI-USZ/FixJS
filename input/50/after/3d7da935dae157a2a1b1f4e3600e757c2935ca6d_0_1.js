function(value) {
                                                    // fix to a power of two
                                                    ssao._noiseTextureSize = Math.pow(2,value);
                                                    ssao._noiseTextureSize = Math.min(ssao._noiseTextureSize, 512);
                                                    ssao.dirty();
                                                }