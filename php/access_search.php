<?php
require_once($_SERVER["DOCUMENT_ROOT"].'/php/require_all.php');
$html = new html();
$html->access();
foreach($_GET as $key => $value){
	$$key=$value;
}
$user = $_SESSION["user"];
$query = "SELECT * FROM passwords_$user where ( URL like '%$searchstring%' OR comment like '%$searchstring%')";
global $mysql;
$results = $mysql->getarray($query);
if(isset($check))
{
	foreach ($results as $result) {
		echo $result['userName'] . '_' . $result['email'] . '_' . $result['pass'];
	}
}else{ ?>
<div class="container">
<?php
tableHeader(["URL", "User","E-Mail","Password","Comment"]);
foreach ($results as $result) {
	echo '<tr class="entry" dbid="'.$result["passwords_".$user."id"].'">';
	echo '<td class="URL"><a href="'.$result['URL'].'">'.$result['URL'].'</a></td>';
	echo '<td class="accdaten"><span class="toDecrypt">'.$result['userName'].'</span></td>';
	echo '<td class="accdaten"><span class="toDecrypt">'.$result['email'].'</span></td>';
	echo '<td class="accdaten"><span class="toDecrypt">'.$result['pass'].'</span></td>';
	echo '<td class="comment">'.$result['comment'].'</td>';
	echo '</tr>';
}
echo '</div></table>';
}
?>
