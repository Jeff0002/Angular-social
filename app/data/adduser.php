<?php 

	require_once '../api/v1/dbHandler.php';
	require_once '../api/v1/passwordHash.php';
	include '../api/ChromePhp.php';

	$r = json_decode(file_get_contents('php://input'));  //get user from 

	$db = new DbHandler();


    $name = $r->name;
    $email = $r->email;
    $password =$r->password;

    $isUserExists = $db->getOneRecord("select 1 from customers_auth where email='$email'");

     if(!$isUserExists){
        $r->password = passwordHash::hash($password);
        $tabble_name = "customers_auth";
        $column_names = array('name', 'email', 'password');
        $result = $db->insertIntoTable($r, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            //$_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            print $_SESSION['uid'];
            ChromePhp::log('Created successfully!');
            //echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            //echoResponse(201, $response);
            ChromePhp::log('Failed');

        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        //echoResponse(201, $response);
        ChromePhp::log('Already exists');
    }

	/*if($user->mail=='midhun@gmail.com' && $user->pass=='1234') 
		session_start();
		$_SESSION['uid']=uniqid('ang_');
		print $_SESSION['uid'];*/
?>