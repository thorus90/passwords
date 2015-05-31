<?php
namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class PasswordListsTable extends Table
{

    public function initialize(array $config)
    {
        $this->hasMany('Passwords', [ 'dependent' => true ]);
        $this->belongsToMany('Users');
    }

    public function validationDefault(Validator $validator)
    {
        return $validator
        ->notEmpty('name', 'You have to provide a name!')
        ->add('name', 'nameUnique', [ 'rule' => 'validateUnique', 'provider' => 'table', 'message' => 'Name already exists!' ])
        ;
    }

}
?>
