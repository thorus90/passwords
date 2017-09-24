<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Utility\Hash;
use Cake\ORM\TableRegistry;

class PasswordListsController extends AppController
{

    public function initialize()
    {
        $this->loadComponent('Auth');
        $this->loadComponent('Flash');
        $this->loadModel('Passwords');
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

    public function index()
    {
    	$noListexists = false;
        $passwordList = $this->PasswordLists->find()
            ->where( [ 'PasswordListsUser.user_id' => $this->Auth->user('id') , 'PasswordLists.enabled' => true ] )
            ->leftJoin( 
                [ 'PasswordListsUser' => 'password_lists_users' ],
                [ 'PasswordListsUser.password_list_id = PasswordLists.id' ]
            );
        if ( $passwordList->count() == 0 )
    	{
    		$noListexists = true;
    	}
    	$this->set('noListexists', $noListexists);
    	$this->set('PasswordLists', $passwordList->toArray());
        if ( isset($this->request->data['flash']) )
        {
            $this->set('javascript', 'changeMessageBox("' . $this->request->data['flash'] . '");');
        }
    }
	
	public function add()
	{
		$this->set('standAlone', false);
        $passwordListsTable = TableRegistry::get('PasswordLists');
        $passwordList = $passwordListsTable->newEntity();
		if ( $this->request->is('ajax') ) 
		{
			$this->viewBuilder()->layout('ajax');
		}
		else
		{
			$this->set('standAlone', true);
            $this->set('passwordList', $passwordList);
		}
		if ( $this->request->is('post') )
		{
            $data = [
                'name' => $this->request->data['name'],
                'enabled' => true,
                'users' => [
                    [ 'id' => $this->request->session()->read('Auth.User.id') ]
                ] ];
            $passwordList = $passwordListsTable->newEntity($data, [ 'associated' => [ 'Users' ] ] );
			if ($this->PasswordLists->save($passwordList)) {
				$this->loadModel('Password');
                $passwordsTable = TableRegistry::get('Passwords');
                $password = $passwordsTable->newEntity();
                $password->URL = $this->request->data['URL'];
                $password->username = $this->request->data['username'];
                $password->email = $this->request->data['email'];
                $password->password = $this->request->data['password'];
                $password->type = $this->request->data['type'];
                $password->password_list_id = $passwordList->id;
				if($passwordsTable->save($password))
				{
                    $this->viewBuilder()->layout('flashOnly');
                	$this->Flash->flash_minimal(__('0/The Passwordlist has been saved!'));
				}
				else
				{
					$passwordListsTable->delete($passwordList);
					$this->Flash->flash_minimal(__('Control Password could not be saved!'));
				}
            }
            else
            {
            	$this->Flash->flash_minimal(__('Could not save Passwordlist!'));
            }
		}
	}

    public function edit($id = null)
    {
		$this->set('standAlone', true);
        if( $id == null )
        {
            $id = $this->request->data['id'];
        }
        $PasswordLists = $this->PasswordLists->find()
            ->where( [ 'PasswordListsUser.user_id' => $this->request->session()->read('Auth.User.id') , 'PasswordLists.enabled' => true , 'PasswordLists.id' => $id ] )
            ->leftJoin(
                [ 'PasswordListsUser' => 'password_lists_users' ],
                [ 'PasswordListsUser.password_list_id = PasswordLists.id' ] );
        $PasswordList = $PasswordLists->first();
        $this->set('old_name',$PasswordList->name);
        if (!$PasswordList)
        {
            $this->set('message',__('Your not authorized for this PasswordList!'));
        }
        else
        {
            if ( $this->request->is(array('post','put')) )
            {
               if ($this->request->data['prepare'])
               {
				    $this->loadModel('Password');
               		echo json_encode($this->Passwords->find()
                        ->where( [ 'Passwords.password_list_id' => $id ] )
                        ->leftJoin(
                            [ 'PasswordListsUser' => 'password_lists_users' ],
                            [ 'PasswordListsUser.password_list_id' => $id , 'PasswordListsUser.user_id' => $this->request->session()->read('Auth.User.id') ] ));
                    $this->autoRender = false;
               } 
            } 
        }
    }

	public function show($id = null)
	{
        $PasswordLists = $this->PasswordLists->find()
            ->where( [ 'PasswordListsUser.user_id' => $this->Auth->user('id') , 'PasswordLists.enabled' => true , 'PasswordLists.id' => $id ] )
            ->leftJoin(
                [ 'PasswordListsUser' => 'password_lists_users' ],
                [ 'PasswordListsUser.password_list_id = PasswordLists.id' ] );
        $PasswordList = $PasswordLists->first();
        $DistinctPasswordTypes = $this->Passwords->find()
            ->select(['type'])
            ->distinct(['type'])
            ->where(['password_list_id' => $id])
            ->andwhere([ 'type IS NOT' => null ]);
        $DistinctPasswordTypes = $DistinctPasswordTypes->toArray();
        $DistinctPasswordTypesAssoc = [];
        foreach( $DistinctPasswordTypes as $DistinctPasswordType )
        {
            if ( $DistinctPasswordType->type != '' )
            {
                $DistinctPasswordTypesAssoc[$DistinctPasswordType->type] = $DistinctPasswordType->type;
            }
        }
       
        $this->set('password' , $this->Passwords->newEntity()); 
    	$this->set('PasswordList', $PasswordList);
        $this->set('password_list_id', $id);
        $this->set('DistinctPasswordTypes' , $DistinctPasswordTypesAssoc);
	}

    public function delete($id = null)
    {
        $passwordListsTable = TableRegistry::get('PasswordLists');
        $passwordList = $passwordListsTable->get($id);
        if($passwordListsTable->delete($passwordList))
        {
            $this->Flash->flash_minimal(__('The password list has been deleted'));
            $this->redirect( [ 'controller' => 'PasswordLists' , 'action' => 'index' ] );
        }
        else
        {
            $this->Flash->flash_minimal(__('Error occured'));
        }
    }

    public function import($id = null)
    {
        if ( $this->request->is(array('post','put')) )
        {
            $this->render(false);
        }
    }
}
?>
