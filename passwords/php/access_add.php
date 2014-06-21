<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/php/require_all.php');
$html = new html();
$html->access();
foreach($_POST as $key => $value){
	$$key=$value;
}
if($comment == ""){
	$comment = NULL;
}
$userName = $_SESSION["user"];
$query = "INSERT INTO passwords_" . $userName . " VALUES(DEFAULT,'".$url."','".$user."','".$email."','".$pass."','".$comment."')";
global $mysql;
if($mysql->query($query)){
	echo "0/Eingefuegt";
} else {
	echo "1/Fehler beim Einfuegen";
}
?>
