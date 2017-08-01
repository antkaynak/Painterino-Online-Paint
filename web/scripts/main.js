
/*
    Made by Ant Kaynak - github.com/Exercon

 */

    var active = false;
    var color = "#000000";
    var size = 1;
    var temporaryStorage = [];
    var mouse = {x: 0, y: 0};
    var exmouse = {x: 0, y: 0};
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");

    $(document).ready(function(){
            //Get drawings from server on-load and start timeout circle
            getServer();
            //Get online list from server on-load and start timeout circle
            getServerList();


            $('#canvas').width($('#canvasDiv').css('width'));
            $('#canvas').height($('#canvasDiv').css('height'));

            //On window resize change canvas width and height.
            //It will scale automatically with this way.
             $(window).on('resize',function(){
             $('#canvas').width($('#canvasDiv').css('width'));
             $('#canvas').height($('#canvasDiv').css('height'));
          });

             $('#sizerange').on('change',function(){
                size = $('#sizerange').val();
              });

             $('#clearbtn').on('click',function(e) {
                canvasClear(ctx);
              });

             $('#exitbtn').on('click', function (e) {
                 userExit();
               });

             //Downloading canvas does not work with Jquery so I used native JS.
            document.getElementById('download').addEventListener('click', function() {
                downloadCanvas(this, 'canvas', 'painterino.png');
            }, false);

            canvas.addEventListener('mousedown', mousedown, false);
            canvas.addEventListener('mousemove', mousemove, false);
            canvas.addEventListener('mouseup', mouseup, false);
            canvas.addEventListener('mouseleave', mouseleave, false);
            //Touch events are for the mobile support.
            canvas.addEventListener('touchstart', touchdown, false);
            canvas.addEventListener('touchmove', touchmove, false);
            canvas.addEventListener('touchend', touchup, false);

    });

        function mousedown(){
            active = true;
            var xy = getMousePos();
            canvasPaint(xy.x, xy.y ,"mousedown");
            temporaryStorage.length = 0;
            temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousedown");
        }

        function mousemove(e){
            if(active){
                var xy = getMousePos(e);
                canvasPaint(xy.x, xy.y ,"mousemove");
                temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousemove");
            }
        }

        function mouseup(){
            active = false;
            sendServer();
        }

        function mouseleave(){
            active = false;
        }

        function touchdown() {
            active = true;
            var xy = getTouchPos();
            canvasPaint(xy.x, xy.y ,"mousedown");
            temporaryStorage.length = 0;
            temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousedown");
            event.preventDefault();
        }


        function touchmove(e) {
            var xy = getTouchPos(e);
            canvasPaint(xy.x, xy.y ,"mousemove");
            temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousemove");
            event.preventDefault();
        }

        function touchup() {
            active = false;
            sendServer();
            event.preventDefault();
        }

        function getMousePos(evt) {

            if (!evt){
                var evt = event;
            }
            var rect = document.getElementById('canvas').getBoundingClientRect();
            var X = (evt.clientX - rect.left) / (document.getElementById('canvas').clientWidth / document.getElementById('canvas').width);
            var Y = (evt.clientY - rect.top) / (document.getElementById('canvas').clientHeight / document.getElementById('canvas').height);
            X = Math.ceil(X);
            Y = Math.ceil(Y);
            return {
                x: X,
                y: Y
            };
        }


        function getTouchPos(evt) {
            if (!evt){
                var evt = event;
            }
            if(evt.touches) {
                if (evt.touches.length == 1) {
                    var touch = evt.touches[0];
                    var rect = document.getElementById('canvas').getBoundingClientRect();
                    var touchX = (touch.clientX - rect.left) / (document.getElementById('canvas').clientWidth / document.getElementById('canvas').width);
                    var touchY = (touch.clientY - rect.top) / (document.getElementById('canvas').clientHeight / document.getElementById('canvas').height);
                    touchX = Math.ceil(touchX);
                    touchY = Math.ceil(touchY);
                    return {
                        x: touchX,
                        y: touchY
                    };
                }
            }

        }

        //For scaling issues I decided to not use this function and hardcode the canvas instead.
        function createCanvas(){
          var canvasDiv = document.getElementById('canvasDiv');
          canvas = document.createElement('canvas');
          canvas.setAttribute('id', 'canvas');
          canvas.setAttribute('width', $('#canvasDiv').css('width'));
          canvas.setAttribute('height', $('#canvasDiv').css('height'));
          canvas.innerHTML = 'If you are only seeing this text, your browser does not support HTML5 Canvas.';
          canvasDiv.appendChild(canvas);
          if(typeof G_vmlCanvasManager != 'undefined') {
            canvas = G_vmlCanvasManager.initElement(canvas);
          }
          return  canvas.getContext("2d");
        }

        function canvasFill(ctx){
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.beginPath();
          ctx.closePath();
        }

        function canvasClear(ctx){
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.beginPath();
          ctx.closePath();
          sendServerClear();
        }


        function canvasPaint(x,y,drag){
            if(drag == "mousemove"){
             ctx.moveTo(exmouse.x, exmouse.y);
           }else{
                  ctx.moveTo(x - 1 , y);
           }
           ctx.lineTo(x, y );
           ctx.closePath();
           ctx.strokeStyle = color;
           ctx.lineWidth = size;
           ctx.stroke();
           ctx.beginPath();
           ctx.closePath();
            exmouse.x = x;
            exmouse.y = y;
          }

        function reCanvasPaint(data){
              if(data == null){
                  return;
              }

           canvasFill(ctx);


          for(var i=0; i < Object.keys(data).length; i++){
              var temp = data[i].split(',');
              if( temp[5] == "mousemove" && i != 0){
                  var temp2 = data[i-1].split(',');
                ctx.moveTo(temp2[3], temp2[4]);
              }
              else{
                ctx.moveTo(temp[3] - 1, temp[4]);
              }

              ctx.lineTo(temp[3], temp[4]);

              ctx.closePath();
              ctx.strokeStyle = temp[2];
              ctx.lineWidth = temp[0];
              ctx.stroke();
              ctx.beginPath();
              ctx.closePath();
            }


        }

        function downloadCanvas(link, canvasId, filename) {
            link.href = document.getElementById(canvasId).toDataURL();
            link.download = filename;
        }


        function update(jscolor){
            color = '#' + jscolor;
        }


        function userExit(){
            $.ajax
            ({
                type: "POST",
                url: "paintSessionServlet",
                complete: function () {
                    temporaryStorage.length = 0;

                    window.location.replace('/');
                }
            });
        }

        function  sendServer() {

            if(!Object.keys(temporaryStorage).length){
                setTimeout(sendServer,2000);
                return;
            }

            $.ajax
            ({
                type: "POST",
                dataType:'json',
                data: {json: temporaryStorage},
                url: "paintControllerServlet",

            });



        }

        function sendServerClear(){
            $.ajax
            ({
                type: "POST",
                data: {clear: "clear"},
                url: "paintUtility"
            });
        }

        function getServer() {

            if(!active){

            $.ajax({
                type: 'GET',
                url: 'paintControllerServlet',
                success: function (data) {
                    reCanvasPaint(data);
                },
                complete: function () {
                        setTimeout(getServer, 2000);

                }
             });

            return;
            }

            setTimeout(getServer,1000);
        }


        function getServerList(){
            $.ajax({
                type: 'GET',
                url: 'paintSessionServlet',
                success: function (data) {
                    $('#online-list').html('');
                    $.each(data, function(i, index) {
                        $('#online-list').append('<div><span class="glyphicon glyphicon-user" style="padding: 5px" aria-hidden="true">&nbsp;'+index+'</span></div>');
                    });

                },
                complete: function () {
                    setTimeout(getServerList, 8000);
                }
            });
        }

        //I have used this function while i was testing connectivity issues.
        //This function is irrelevant now.
        function deBug(){
        // data: {name: size+",round"+","+color+","+x+","+y+","+drag},
            $.ajax({
                type: 'GET',
                url: 'paintControllerServlet',
                success: function (data) {
                    for(var i = 0 ; i< data.length ; i++){
                    if(data[i] != clientStorage[i]){
                        console.log("not same error : 302 =  \n "+ test + "\n " + data[i]);


                    }else{
                        console.log("same  =  \n "+ test + "\n " + data[i]);
                    }
                    }

                },
                complete: function (data) {
                    alert("done");
                    setTimeout(deBug, 10000);
                }
            });

        }

