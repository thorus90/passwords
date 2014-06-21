<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/php/require_all.php');
$html = new html();
$html->access();
foreach($_POST as $key => $value){
	$$key=$value;
}
$user = $_SESSION["user"];

global $mysql;
$query = "DELETE FROM passwords_".$user." where passwords_".$user."id = ".$dbid;
if ($mysql->query($query)) {
	echo "0/Erfolgreich gelöscht";
} else{
	echo "2/Fehler beim Löschen";
}
?>
