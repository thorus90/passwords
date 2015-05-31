<?php
echo '<div class="container">';
	echo '<table class="table table-hover">';
		echo '<tr>';
			echo '<th>' . __('URL') . '</th>';
			echo '<th>' . __('Username') . '</th>';
			echo '<th>' . __('E-Mail') . '</th>';
			echo '<th>' . __('Password') . '</th>';
			echo '<th>' . __('Comment') . '</th>';
			echo '<th>' . __('Type') . '</th>';
		echo '</tr>';
		foreach ($passwords as $password)
		{
			echo '<tr class="entry" password_id=' . $password->id . '>';
				echo '<td>' . $password->URL . '</td>';
				echo '<td class="toDecrypt">' . $password->username . '</td>';
				echo '<td class="toDecrypt">' . $password->email . '</td>';
				echo '<td class="toDecrypt">' . $password->password . '</td>';
				echo '<td>' . $password->comment . '</td>';
				echo '<td>' . $password->type . '</td>';
			echo '</tr>';
		}
	echo '</table>';
echo '</div>';
?>
