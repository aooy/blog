function initWorker(file, id, x , y){
	var worker = new Worker(file);
	worker.onmessage = function(e) {
		var ctx = getCanvas2dCtx(id);
		ctx.putImageData(e.data, x, y);
	};
	return worker;
}

var image = new Image();
image.src = './fruits.jpg';

image.onload = function(){
	console.log('loaded image');
	var methodfile = './js/methods.js';
	
	//第一张的左边原样，右边变灰的图
	var ctx = getCanvas2dCtx('#head');
	ctx.drawImage(image, 0, 0, 720, 480);
	var worker = new Worker(methodfile);
	var imageData = ctx.getImageData(360, 0, 360, 720);
	worker.postMessage([imageData, imageData.data.length/4, 1]);
	worker.onmessage = function(e) {
		ctx.putImageData(e.data, 360, 0);
	};

	imageData = initImgData(image, 0, 0, 0, 0, 720, 480, 720, 480);
	//算法1
	paintGray(methodfile, "#c1", imageData, 0, 0, 1);
	//算法2
	paintGray(methodfile, "#c2", imageData, 0, 0, 2);
	//算法1+算法2
	paintGray('./js/half1and2.js', '#c2a', imageData, 0, 0);
	//算法3
	paintGray(methodfile, '#c3', imageData, 0, 0, 3);
	//算法4max
	paintGray(methodfile, '#c4max', imageData, 0, 0, 4);
	//算法4min
	paintGray(methodfile, '#c4min', imageData, 0, 0, 5);
	//算法5red
	paintGray(methodfile, '#c5red', imageData, 0, 0, 6);
	//算法5green
	paintGray(methodfile, '#c5green', imageData, 0, 0, 7);
	//算法5blue
	paintGray(methodfile, '#c5blue', imageData, 0, 0, 8);
	//算法6
	paintGray(methodfile, '#c6', imageData, 0, 0, 9, 4);
	//算法6
	paintGray(methodfile, '#c6b', imageData, 0, 0, 9, 16);
};

function initImgData(img, dx, dy, gx, gy, dwidth, dheight, gwidth, gheight){
	var canvas = document.createElement('canvas');
	canvas.width = dwidth;
	canvas.height = dheight;
	var canvasCtx = canvas.getContext("2d");
	canvasCtx.drawImage(img, dx, dy, dwidth, dheight);
	var data = canvasCtx.getImageData(gx, gy, gwidth, gheight);
	return data;
}

function getCanvas2dCtx(id){
	var ele = document.querySelector(id);
	setWh(ele, 720, 480);
	if(ele.tagName === 'CANVAS') return ele.getContext("2d");
}

function setWh(ele, width, height){
	ele.width = width;
	ele.height = height;
}

function paintGray(file, id, imageData, x, y, methodType, NumberOfShades ){
	var numPixels = imageData.data.length/4;
	var worker = initWorker(file, id, x, y);
	worker.postMessage([imageData, numPixels, methodType, NumberOfShades]);
	console.log('img over')
}





