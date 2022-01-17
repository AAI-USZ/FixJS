function () {
      // $('#error').text(decimalFormat(compareGPUAndCPUResults(), 2));
      $('#error').text(compareGPUAndCPUResults().toFixed(2));
      $('#render-time').text((renderTime).toFixed(1));
      $('#cpu-time').text((cpuTime).toFixed(1));
      $('#gpu-time').text((gpuTime).toFixed(1));
      $('#read-time').text((readTime).toFixed(1));
    }