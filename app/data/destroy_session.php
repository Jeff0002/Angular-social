<?php 
/*	session_id('uid');
	session_start();
	session_destroy();
	session_commit();   */

	$db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
?>