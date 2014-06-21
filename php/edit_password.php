<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/php/require_all.php');
$html = new html();
$html->access();
foreach($_POST as $key => $value){
	$$key=$value;
}
$user = $_SESSION["user"];
global $mysql;
$query = "UPDATE passwords_".$user." SET URL = '$url',userName = '$username', email = '$email', pass = '$password', comment = '$notes' where passwords_".$user."id = ".$dbid;
if ($mysql->query($query)) {
	echo "0/Erfolgreich geändert";
} else{
	echo "2/Fehler beim Editieren";
}
?>
