<?php
    if( isset($message) ){ echo $message; }
    echo '<div id="messages"></div>';
	echo $this->Form->create('PasswordList');
	echo $this->Form->input('PasswordList.name',array
        (
            'value' => $old_name,
            'old_name' => $old_name
        )
    );
	echo $this->Form->input('Passwords.oldpassword1', array ('label' => __('Old Password1')));
	echo $this->Form->input('Passwords.oldpassword2', array ('label' => __('Old Password2')));
	echo $this->Form->input('Passwords.oldpassword3', array ('label' => __('Old Password3')));
	echo $this->Form->input('Passwords.newpassword1', array ('label' => __('New Password1 (mandatory)')));
	echo $this->Form->input('Passwords.newpassword2', array ('label' => __('New Password2 (optional)')));
	echo $this->Form->input('Passwords.newpassword3', array ('label' => __('New Password3 (optional)')));
	//echo $this->Form->input('User.username', array ('label' => __('Allow access for these user (comma seperated)')));
    echo '<div class="row">';
        echo $this->Form->end(array(
            'label' => __('Edit Passwordlist'),
            'div' =>  '',
            'before' => '<div class="col-lg-offset-2 col-lg-1">',
            'id' => 'PasswordListEditSubmit'
        ));
        echo '<div class="col-lg-2">';
            echo $this->Html->link('Back',array
            (
                'controller' => 'PasswordLists',
                'action' => 'index'
            ),
            array
            (
                'class' => 'btn btn-primary'
            ));
        echo '</div>';
    echo '</div>';
	if($standAlone)
    {
    	echo $this->Html->script('index.js');
    	echo $this->Html->script('passwordlists/passwordlists.js');
    	echo $this->Html->script('passwords/crypt.js');
    }
?>
