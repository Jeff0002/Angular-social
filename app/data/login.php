<?php 
	require_once '../api/v1/dbHandler.php';
	require_once '../api/v1/passwordHash.php';

	$inp = json_decode(file_get_contents('php://input'));  //get user from 
	
	$db = new DbHandler();
	$email = $inp->mail;
	$password = $inp->pass;
	$user = $db->getOneRecord("select uid,name,password,email,created from customers_auth where phone='$email' or email='$email'");

/*	if($user->mail=='midhun@gmail.com' && $user->pass=='1234') {
			session_start();
			$_SESSION['uid']=uniqid('ang_');
			print $_SESSION['uid'];
		}
*/

if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['name'] = $user['name'];
        
        print $_SESSION['uid'];

        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
        }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }

?>

