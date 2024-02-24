<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body style="width: 100%;height: 100vh;display: flex;
align-items: center;justify-content: center;">

    <div style="width: 400px" >

        <button id="public" >public</button>
        <button id="private" >private</button>
        <button id="precence" >precence</button>


        <div style="display: flex;margin: 10px 0" >
            <div id="sender" >{{auth()->user()->name}}</div>
            <span style="margin-left: 10px" id="selectedChannel" ></span>
        </div>
        <header style="background: black;padding: 4px"  >
            <span id="online" style="color: white" ></span>
        </header>


        <ul id="message_list" style="background: #ccc;padding: 5px" ></ul>

        <form id="form" style="display: flex;flex-direction: column" >
            <div id="is_typing" ></div>
            <textarea style="width: 96%;height: 70px;padding: 7px" placeholder="message" type="text" id="input_message"></textarea>
            <button type="submit" style="margin-top: 10px" >send</button>
        </form>
    </div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
