function(f0,f1){
            //sort method by veer Note: possible issues due to lack of full perspective implementation. 
            var v0 = f0.verticies;
            var v1 = f1.verticies;
            var sum_z0 = 0;
            for (var x = 0; x < v0.length; ++x)
                sum_z0 += v0[x].z;
            var sum_z1 = 0;
            for (var x = 0; x < v1.length; ++x)
                sum_z1 += v1[x].z;
            return sum_z0 - sum_z1;      
            
     
        }