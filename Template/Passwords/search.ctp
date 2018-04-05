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
				echo '<td name="URL" password_id=' . $password->id . '>' . $password->URL . '</td>';
				echo '<td name="username" password_id=' . $password->id . ' class="toDecrypt">' . $password->username . '</td>';
				echo '<td name="email" password_id=' . $password->id . ' class="toDecrypt">' . $password->email . '</td>';
				echo '<td name="password" password_id=' . $password->id . ' class="toDecrypt">' . $password->password . '</td>';
				echo '<td name="comment" password_id=' . $password->id . '>' . $password->comment . '</td>';
				echo '<td name="type" password_id=' . $password->id . '>' . $password->type . '</td>';
			echo '</tr>';
		}
	echo '</table>';
echo '</div>';
?>
