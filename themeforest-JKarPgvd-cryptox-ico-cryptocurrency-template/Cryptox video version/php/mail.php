<?php
header("Content-type: text/html; charset=utf-8");
//**********************************************
if (empty($_POST['js'])) {
    
    $log == "";
    $error = "no"; //errors flag
    
    $postEmail = addslashes($_POST['email']);
    $postEmail = htmlspecialchars($postEmail);
    $postEmail = stripslashes($postEmail);
    $postEmail = trim($postEmail);
    
    $postName = addslashes($_POST['name']);
    $postName = htmlspecialchars($postName);
    $postName = stripslashes($postName);
    $postName = trim($postName);
    
    $textArea = addslashes($_POST['textarea']);
    $textArea = htmlspecialchars($textArea);
    $textArea = stripslashes($textArea);
    $textArea = trim($textArea);
    
    //validate email


    function isEmail($postEmail)
    {
        return (preg_match("/[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}/i", $postEmail));
    }
    
    if ($postEmail == '') {
        $log .= "<li></li>";
        $error = "yes";
        
    }
    
    else if (!isEmail($postEmail)) {
        
        $log .= "<li>Please fill the form!</li>";
        $error = "yes";
    }

    //if all ok
    if ($error == "no") {
        // Proceed with PHP email
        $to      = "mail@mail.com"; //Write your email
        $mes     = "New Message!\n" . "Email:  $postEmail\n" . "Name: $postName\n" . "Message: $textArea";
        $from    = 'mysite.com';
        $sub     = '=?utf-8?B?' . base64_encode('Feedback') . '?=';
        $headers = 'From: ' . $from . '';
        $headers .= 'MIME-Version: 1.0';
        $headers .= 'Content-type: text/plain; charset=utf-8';
        
        mail($to, $sub, $mes, $headers);
        echo "1"; //Всё Ok!
    } else //if errors
        {
        echo "<p style='color:red; padding:0; margin:0; width:100%;'>Please fill the form!</p>"; //Error text
    }
}