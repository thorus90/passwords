<?php

class PasswordList extends AppModel {

	public function beforeSave($options = array())
    {
        parent::beforeSave($options = array());
        return true;
    }
    
    public $hasAndBelongsToMany = array(
        'User' =>
            array(
                'unique' => 'keepExisting'
            )
    );
    public $hasMany = array(
        'Password' => array(
            'dependent' => true
        )
    );

    public $validate = array(
    	'name' => array(
            'nameNotEmpty' => array(
                'rule' => array('notEmpty'),
                'required' => true,
                'message' => 'You have to provide a name!',
            ),
            'nameUnique' => array(
                'rule' => array('isUnique'),
                'required' => true,
                'message' => 'Name must be unique!',
            )
        )
    );

}
?>
