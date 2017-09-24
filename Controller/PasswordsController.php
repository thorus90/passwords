<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;

class PasswordsController extends AppController
{
    public function initialize()
    {
        $this->loadComponent('Auth');
        $this->loadComponent('Flash');
    }

    public $helpers = [
        'Html' => [
            'className' => 'Bootstrap.BootstrapHtml'
        ],
        'Form' => [
            'className' => 'Bootstrap.BootstrapForm'
        ],
        'Paginator' => [
            'className' => 'Bootstrap.BootstrapPaginator'
        ],
        'Modal' => [
            'className' => 'Bootstrap.BootstrapModal'
        ]
    ];

    public function delete($id = null)
    {
        $this->viewBuilder()->layout('flashOnly');
        $id = $this->request->data['password_id'];
        $passwordsTable = TableRegistry::get('Passwords');
        if($passwordsTable->delete($passwordsTable->get($id)))
        {
            $this->Flash->flash_minimal(__('0/The password has been deleted'));
        }
        else
        {
            $this->Flash->flash_minimal(__('2/Error occured'));
        }
    }

    public function search($passwordlistid = null, $needle = "NotToBeFoundHopefully")
    {
        if ( $this->request->is('ajax') )
		{
			$this->viewBuilder()->layout('ajax');
			$needle = $this->request->data['needle'];
			$passwordlistid = $this->request->data['passwordlistid'];
		}
        $passwords = $this->Passwords->find()
            ->where( [
                'Passwords.password_list_id' => $passwordlistid,
                'OR' => [
                    'Passwords.URL LIKE' => '%' . $needle . '%',
                    'Passwords.comment LIKE' => '%' . $needle . '%',
                    'Passwords.type LIKE' => '%' . $needle . '%'
                ] ] )
            ->leftJoin(
                [ 'PasswordListsUser' => 'password_lists_users' ],
                [ 'PasswordListsUser.password_list_id' => $passwordlistid, 'PasswordListsUser.user_id' => $this->Auth->user('id') ] );
        $passwords = $passwords->toArray();
        $this->set('passwords' , $passwords);
    }
	
	public function add($id = null)
	{
        $this->set('password_list_id', $id);
		$this->set('standAlone', false);
		if ( $this->request->is('ajax') )
		{
			$this->viewBuilder()->layout('flashOnly');
		}
		if ( $this->request->is('post') ) 
		{
            $passwordsTable = TableRegistry::get('Passwords');
            $password = $passwordsTable->newEntity();
            $passwordsTable->patchEntity($password,$this->request->data);
			if ($passwordsTable->save($password)) {
                $this->Flash->flash_minimal(__('0/The Password has been saved'));
            }
            else
            {
                $this->Flash->flash_minimal(__('2/The Password has not been saved'));
            }
		}
		else
		{
			$this->set('standAlone', true);
		}
	}

    public function edit($id = null)
    {
        $this->viewBuilder()->layout('flashOnly');
        $password = $this->Passwords->find()->where( [ 'Passwords.id' => $id ] );
        if (!$password) 
        {
            $this->Flash->flash_minimal(__('2/Password not found'));
            exit();
        }
        if ( $this->request->is(array('post','put')) )
        {
            $passwordsTable = TableRegistry::get('Passwords');
            $password = $passwordsTable->get($id);
            $passwordsTable->patchEntity($password,$this->request->data);
            if($passwordsTable->save($password))
            {
                $this->Flash->flash_minimal(__('0/The password has been saved'));
            }
            else
            {
                $this->Flash->flash_minimal(__('2/Error occured'));
            }
        }
    }
}
?>
