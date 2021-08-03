<?php
if (isset($_POST['mail'])) {
    if (!isset($_POST['name']) ||
        !isset($_POST['firstname']) ||
        !isset($_POST['message'])
    ) {
       // var_dump($_POST['name'],$_POST['firstname'],$_POST['comment'])
        die('Quelquechose s’est mal passé avec le formulaire transmit, veuillez reessayer');
    } else {
        //die('on est dans le else');
        $email = $_POST['mail'];
        $name = $_POST['name'];
        $firstname = $_POST['firstname'];
        $message = $_POST['message'];
        $email_regex = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
        $error_message;

        if (!preg_match($email_regex, $email)) {
            $error_message = 'L‘adresse email n‘est pas valide';
        }

        $string_exp = "/^[A-Za-z .'-]+$/";

        if (!preg_match($string_exp, $firstname)) {
            $error_message = 'Le prénom n‘est pas valide';
        }

        if (!preg_match($string_exp, $name)) {
            $error_message = 'Le nom n‘est pas valide';
        }

        if (strlen($message) < 2) {
            $error_message = 'Le commentaire n‘est pas valide';
        }

        function StringCleaner($string)
        {
            $wrong = ["bcc:", "to:", "cc:", "href"];
            return str_replace($wrong, "", $string);
        }

        $email_msg = "Prénom : " . StringCleaner($firstname) . "\n";
        $email_msg = "Nom : " . StringCleaner($name) . "\n";
        $email_msg = "Email : " . StringCleaner($email) . "\n";
        $email_msg = "Message :" . StringCleaner($message) . "\n";

        $header = "From : " . StringCleaner($email) . "\r\n"; //for windows I need both of them to represent line terminator thanks stack overflow ;)

        //my email and my subjet
        $myEmail = 'vincent.bulfon@gmail.com';
        $subject = 'Contact de mon CV en ligne';

        //I would not like to recieve mail from this page
        //mail($myEmail, $subject, $email_msg, $header);
        header('Location: index.html');
        exit;
    }
}
