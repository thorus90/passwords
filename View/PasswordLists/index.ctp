<?php
if ($noListexists)
{
	echo $this->Html->link(__('So far no List exists, click here to create one!'),array('controller' => 'PasswordLists', 'action' => 'add'));
}
else
{
	echo '<div class="container">';
		foreach ($PasswordLists as $key => $value) {
            echo '<div class="row">';
                echo '<div class="col-md-4">';
                    echo '<a class="btn btn-primary btn-lg btn-block" href="/PasswordLists/edit/' .  $value['PasswordList']['id'] . '">';
                        echo '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>';
                    echo '</a>'; 
                echo '</div>';
                echo '<div class="col-md-4">';
			        echo '<a class="btn btn-primary btn-lg btn-block" href="/PasswordLists/show/' . $value['PasswordList']['id'] . '">';
                        echo $value['PasswordList']['name'];
                    echo '</a>';
                echo '</div>';
                echo '<div class="col-md-4">';
                    echo '<a class="btn btn-primary btn-lg btn-block" href="/PasswordLists/delete/' .  $value['PasswordList']['id'] . '">';
                        echo '<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>';
                    echo '</a>'; 
                echo '</div>';
            echo '</div>';
		}
        echo '<div class="row">';
            echo '<div class="col-md-offset-4 col-md-4">';
                echo '<a class="btn btn-primary btn-lg btn-block" href="/PasswordLists/add/">';
                    echo '<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>';
                echo '</a>';
            echo '</div>';
        echo '</div>';
	echo '</div>';
}
?>
