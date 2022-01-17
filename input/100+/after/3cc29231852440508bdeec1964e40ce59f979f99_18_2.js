function(shaderName)
        {
            var mat;
            switch (shaderName)
            {
                case "flat":                mat = new FlatMaterial();               break;
                case "linearGradient":      mat = new LinearGradientMaterial();     break;
                case "radialGradient":      mat = new RadialGradientMaterial();     break;
                case "bumpMetal":           mat = new BumpMetalMaterial();          break;
                case "uber":                mat = new UberMaterial();               break;
                //case "cloud":             mat = new CloudMaterial();              break;

                case "taper":               mat = new TaperMaterial();              break;
                case "twistVert":           mat = new TwistVertMaterial();          break;
                case "radialBlur":          mat = new RadialBlurMaterial();         break;
                case "plasma":              mat = new PlasmaMaterial();             break;
                case "pulse":               mat = new PulseMaterial();              break;
                //case "tunnel":              mat = new TunnelMaterial();             break;
                //case "reliefTunnel":        mat = new ReliefTunnelMaterial();       break;
                //case "squareTunnel":        mat = new SquareTunnelMaterial();       break;
                case "flag":                mat = new FlagMaterial();               break;
                //case "fly":                 mat = new FlyMaterial();                break;
                case "water":               mat = new WaterMaterial();              break;
                case "blueSky":               mat = new BlueSkyMaterial();              break;
                case "darkBlur":             mat = new DarkBlurMaterial();            break;
                //case "zinvert":             mat = new ZInvertMaterial();            break;
                //case "deform":              mat = new DeformMaterial();             break;
                //case "star":                mat = new StarMaterial();               break;
                //case "twist":               mat = new TwistMaterial();              break;
                //case "julia":               mat = new JuliaMaterial();              break;
                //case "keleidoscope":        mat = new KeleidoscopeMaterial();       break;
                //case "mandel":              mat = new MandelMaterial();             break;


                default:
                    console.log( "Unrecognized shader name: " + shaderName );
                    break;
            }

            return mat;
        }