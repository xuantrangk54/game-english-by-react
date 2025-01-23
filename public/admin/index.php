<?php
// Step 1: Prepare data
$title = "Welcome to My Website";
$content = "This is a simple example of embedding PHP into HTML.";
?>

<!DOCTYPE html>
<html>

<head>
    <title><?php echo $title; ?></title>
</head>

<body>
    <h1><?php echo $title; ?></h1>
    <p><?php echo $content; ?></p>
</body>

</html>