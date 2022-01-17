function (flag) {
                return flag === '<inputFile>' ? (toolId !== 0 ? fileOutput : file) : (flag === '<outputFile>' ? fileOutput : flag); 
            }