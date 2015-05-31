<?php
if ($standAlone)
{
    echo '<div id="messages"></div>';
    echo '<div class="container">';
	    echo $this->Form->create($passwordList, [ 'id' => 'PasswordListAddForm' ] );
	    echo $this->Form->input('PasswordList.name');
	    echo $this->Form->input('Passwords.password1', array ('label' => __('Password1 (mandatory)')));
	    echo $this->Form->input('Passwords.password2', array ('label' => __('Password2 (optional)')));
	    echo $this->Form->input('Passwords.password3', array ('label' => __('Password3 (optional)')));
        echo $this->Form->submit( __('Add Passwordlist'), [ 'id' => 'PasswordSubmit' ] );
	    echo $this->Form->end();
	    if($standAlone)
        {
        	echo $this->Html->script('passwordlists/passwordlists.js');
        	echo $this->Html->script('passwords/crypt.js');
        }
    echo '</div>';
}
?>
