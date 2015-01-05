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
		foreach ($passwords as $key => $value)
		{
			echo '<tr class="entry" password_id=' . $value['Password']['id'] . '>';
				echo '<td>' . $value['Password']['URL'] . '</td>';
				echo '<td class="toDecrypt">' . $value['Password']['username'] . '</td>';
				echo '<td class="toDecrypt">' . $value['Password']['email'] . '</td>';
				echo '<td class="toDecrypt">' . $value['Password']['password'] . '</td>';
				echo '<td>' . $value['Password']['comment'] . '</td>';
				echo '<td>' . $value['Password']['type'] . '</td>';
			echo '</tr>';
		}
	echo '</table>';
echo '</div>';
?>
