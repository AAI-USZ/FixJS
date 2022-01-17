function callSamplingTimeoutAgain() {
			var curTime = new Date();
			var timeDiff = curTime - lastDate;
			var nextTimeoutTime = samplingPeriod - timeDiff;
			if (nextTimeoutTime < 0) {
				//the previous calculation took longer than sampling period

				console.warn('the effect is taking too long');
				setTimeout(samplingTimeoutCall, 1);
			} else {
				setTimeout(samplingTimeoutCall, nextTimeoutTime);
			}
		}