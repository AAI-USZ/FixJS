function(){
        var arrayOfArguments = NativeFunctions.getArguments("(Ljava/lang/Object;ILjava/lang/Object;II)V");
        var srcArray = arrayOfArguments[0];
        var srcPos = arrayOfArguments[1].value();
        var destArray = arrayOfArguments[2];
        var destPos = arrayOfArguments[3].value();
        var length = arrayOfArguments[4].value();
        //
        //If dest is null, then a NullPointerException is thrown.
        //If src is null, then a NullPointerException is thrown and the destination array is not modified.
        if (srcArray === null || destArray === null)
          ByteCode.throwException("NullPointerException");
        
        //Check the lengths.
        if (destArray.length < destPos+length || srcArray.length < srcPos+length || destPos < 0 || srcPos < 0 || length < 0)
          ByteCode.throwException("IndexOutOfBoundsException");
        
        //If the src and dest arguments refer to the same array object, then the copying is performed as
        //if the components at positions srcPos through srcPos+length-1 were first copied to a temporary
        //array with length components and then the contents of the temporary array were copied into
        //positions destPos through destPos+length-1 of the destination array.
        var partialCopy = srcArray.clonePortion(srcPos, length);
        destArray.copyInto(destPos, partialCopy);
        MethodRun.createReturn();
      }