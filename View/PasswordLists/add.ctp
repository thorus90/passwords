<?php
    echo '<div id="messages"></div>';
	echo $this->Form->create('PasswordList');
	echo $this->Form->input('PasswordList.name');
	echo $this->Form->input('Passwords.password1', array ('label' => __('Password1 (mandatory)')));
	echo $this->Form->input('Passwords.password2', array ('label' => __('Password2 (optional)')));
	echo $this->Form->input('Passwords.password3', array ('label' => __('Password3 (optional)')));
	//echo $this->Form->input('User.username', array ('label' => __('Allow access for these user (comma seperated)')));
	echo $this->Form->end(array('id' => 'PasswordSubmit', 'label' => __('Add Passwordlist')));
	if($standAlone)
    {
    	echo $this->Html->script('passwordlists/passwordlists.js');
    	echo $this->Html->script('passwords/crypt.js');
    }
?>
