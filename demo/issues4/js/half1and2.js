onmessage = function(e) {
	console.log('Message received from main script');
	var imageData = e.data[0].data;
	var numPixels = e.data[1];
	var half = Math.round(numPixels/2);

	for (var i = 0; i < half; i++) {
		var Red = imageData[i * 4];
		var Green = imageData[i * 4 +1];
		var Blue = imageData[i * 4 + 2];
		var Gray = (Red + Green + Blue) / 3;
		imageData[i * 4] = Gray;
		imageData[i * 4 +1] = Gray;
		imageData[i * 4 + 2] = Gray;
	}
	for (var i = half; i < numPixels; i++) {
		var Red = imageData[i * 4];
		var Green = imageData[i * 4 +1];
		var Blue = imageData[i * 4 + 2];
		var Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11);
		imageData[i * 4] = Gray;
		imageData[i * 4 +1] = Gray;
		imageData[i * 4 + 2] = Gray;
	}
	postMessage(e.data[0]);
};
