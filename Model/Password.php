<?php

class Password extends AppModel {

    public $validate = array(
    	'email' => array
        (
            'rule' => array('email'),
            'required' => true,
            'message' => 'The provided E-Mail is not valid',
            'allowEmpty' => false
        ),
        'password' => array
        (
        	'rule' => array('notEmpty'),
        	'required' => true,
        	'message' => 'Please fill in a Password'
        )
    );

}
?>
