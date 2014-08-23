<?php
	echo $this->Form->create('Password');
	echo $this->Form->input('Password.URL');
	echo $this->Form->input('Password.username');
	echo $this->Form->input('Password.email');
	echo $this->Form->input('Password.password');
	echo $this->Form->input('Password.comment');
	echo $this->Form->end(array('id' => 'PasswordSubmit', 'label' => __('Add Password')));
        if($standAlone)
        {
                echo $this->Html->script('passwords/passwords.js');
                echo $this->Html->script('passwords/blowfish.js');
        }
?>