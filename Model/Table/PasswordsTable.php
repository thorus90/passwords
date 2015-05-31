<?php
namespace App\Model\Table;

use Cake\ORM\Table;
use Cake\Validation\Validator;

class PasswordsTable extends Table
{

    public function initialize(array $config)
    {
        $this->belongsTo('PasswordLists');
    }

    public function validationDefault(Validator $validator)
    {
        return $validator
        ->notEmpty('password', 'Please fill in a Password')
        ;
    }

}
?>
