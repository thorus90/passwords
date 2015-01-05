<?php

class Password extends AppModel {

    public $belongsTo = 'PasswordList';

    public $validate = array(
        'password' => array
        (
        	'rule' => array('notEmpty'),
        	'required' => true,
        	'message' => 'Please fill in a Password'
        )
    );

}
?>
