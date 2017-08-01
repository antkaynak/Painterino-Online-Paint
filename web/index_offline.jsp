

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset='utf-8'>
    <title>Painterino Web</title>
    <link rel='stylesheet' href='css/style.css'>
    <link rel='stylesheet' href='css/bootstrap.min.css'>
    <link rel='shortcut icon' href='favicon.ico?' type='image/x-icon'>
    <link rel='icon' href='favicon.ico?' type='image/x-icon'>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Made by Ant Kaynak - github.com/Exercon -->


</head>
<body>


<main>

    <div class="offline">OFFLINE MODE</div>
    <div class='main' style="margin: auto">

        <div id='canvasDiv'>
            <canvas id="canvas" width="1350px" height="780px">If you are only seeing this text, your browser does not support HTML5 Canvas.</canvas>
        </div>

        <div class='tools'>

            <button

                    class="btn btn-default jscolor {valueElement:null,onFineChange:'update(this)',borderColor:'#323232', insetColor:'#323232', backgroundColor:'#323232', value:'000000'}"
                    style='width:12vh; height:8vh;'>
                <span class='glyphicon glyphicon-tint' aria-hidden='true'></span>
            </button>



            <button id='clearbtn' class='btn btn-default active-color-button display'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>


            <div class='dropup display'>
                <button id='sizebutton' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <span class='glyphicon glyphicon-resize-full' aria-hidden='true'></span>
                </button>
                <ul class='dropdown-menu' aria-labelledby='dropdownMenu2'>
                    <input id='sizerange' type='range' min='1' max='18' step='1' value='1'>
                </ul>
            </div>



            <a id='download' class='btn btn-default active-color-button display'><span class='glyphicon glyphicon-floppy-disk' aria-hidden='true'></span></a>


            <div class='dropup display'>
                <button id='onlinebutton' type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <span class='glyphicon glyphicon-th-list' aria-hidden='true'></span>
                </button>
                <ul class='dropdown-menu' aria-labelledby='dropdownMenu'>
                    <div id='panel'>
                        <div class='panel panel-default'>
                            <div class='panel-heading'>
                                <h3 class='panel-title'>Online List</h3>
                            </div>
                            <div id="online-list" class='panel-body'>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>



            <button id='exitbtn' class='btn btn-default active-color-button display'><span class='glyphicon glyphicon-log-out' aria-hidden='true'></span></button>

        </div>
    </div>

</main>

<script src='scripts/jquery-3.2.1.min.js'></script>
<script src='scripts/bootstrap.min.js'></script>
<script src='scripts/jscolor.js'></script>
<script src='scripts/main_offline.js'></script>

</body>
</html>

