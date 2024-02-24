<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Comauthenticationpatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <span>from_{{auth()->user()->name}}</span>
    <div id="example" name={{auth()->user()->id}}>
    </div>


    <script src="{{ mix('js/Example.js') }}">

    </script>

</body>
</html>
