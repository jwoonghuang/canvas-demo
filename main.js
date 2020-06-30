/* var div = document.getElementById('canvas')

var painting = false

//鼠标点击
div.onmousedown = function (a) {
    painting= true
    var x = a.clientX
    var y = a.clientY
    var divA = document.createElement('div')
    divA.style = 'width: 6px; height: 6px;'+
        'border-radius: 3px; background: pink; position: absolute;'+ 'left: '+(x-3)+'px; top: '+(y-3)+'px;'
    div.appendChild(divA)
}


//鼠标移动
div.onmousemove = function (a) {
    if (painting){
        var x = a.clientX
        var y = a.clientY
        var divA = document.createElement('div')
        divA.style = 'width: 6px; height: 6px;'+
            'border-radius: 3px; background: pink; position: absolute;'+ 'left: '+(x-3)+'px; top: '+(y-3)+'px;'
        div.appendChild(divA)
    }else {

    }

}

//鼠标松开
div.onmouseup = function (a) {
 painting = false
}
*/

var yyy = document.getElementById('draw');
var ctx = yyy.getContext('2d');
var lineWidth = 3

autosetCanvasSize(yyy)

listenToUser(yyy)

/*********/


var eraserEnabled = false;
pencil.onclick = function () {
    eraserEnabled = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
}

black.onclick = function () {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
red.onclick = function () {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function () {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    yellow.classList.remove('active')
}
yellow.onclick = function () {
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.add('active')

}

thin.onclick = function () {
    lineWidth = 3

}

/********/

function autosetCanvasSize(canvas) {
    setcanvasSize();

    window.onresize = function () {
        setcanvasSize();
    };
    function setcanvasSize() {   //获取用户窗口尺寸
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}



function listenToUser(canvas) {
    var using = false;
    var lastPoint = {x:undefined,y:undefined};

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (bbb) {
            var x = bbb.touches[0].clientX
            var y = bbb.touches[0].clientY
            using = true
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40)
            }else{
                lastPoint = {x:x,y:y}
            }
        }
        canvas.ontouchmove = function (bbb) {
            var x = bbb.touches[0].clientX
            var y = bbb.touches[0].clientY
            if(!using){return}
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40);
            }else{
                var newPoint = {x:x,y:y};
                drawCircle(x,y,2.5);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function (bbb) {
            using = false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40)
            }else{
                lastPoint = {x:x,y:y}
            }
        }

        canvas.onmousemove = function(aaa){
            var x = aaa.clientX;
            var y = aaa.clientY;
            if(!using){return}
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40);
            }else{
                var newPoint = {x:x,y:y};
                drawCircle(x,y,2.5);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function(aaa){
            using = false;
        }
    }
}