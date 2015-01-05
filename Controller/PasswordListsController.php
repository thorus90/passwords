<?php

class PasswordListsController extends AppController
{

	public $helpers = array(
        'Form' => array(
              'className' => 'BootstrapForm'
        )
    );
	public $components = array(
		'DebugKit.Toolbar',
        'Session',
        'Auth'
    );

    public $uses = array('Password', 'PasswordList');
	
    public function index()
    {
    	$noListexists = false;
    	$PasswordLists = $this->PasswordList->find('all', array(
    		'conditions' => array(
    			'PasswordListsUser.user_id' => $this->Auth->user('id'),
    			'PasswordList.enabled' => true
    		),
    		'joins' => array(
    			array(
    				'table' => 'password_lists_users',
    				'alias' => 'PasswordListsUser',
	    			'type' => 'LEFT',
	    			'conditions' => array(
	    				'PasswordListsUser.password_list_id = PasswordList.id',
	    			)
	    		)
	    	),
    		'recursive' => -1
    	));
    	if( count($PasswordLists) == 0 )
    	{
    		$noListexists = true;
    	}
    	$this->set('noListexists', $noListexists);
    	$this->set('PasswordLists', $PasswordLists);
    }
	
	public function add()
	{
		$this->set('standAlone', false);
		if ( $this->request->is('post') )
		{
			$PasswordList['PasswordList']['name'] = $this->request->data['PasswordList']['name'];
			$PasswordList['PasswordList']['enabled'] = true;
			$PasswordList['User']['id'] = $this->Auth->user('id');
			if ($this->PasswordList->saveAll($PasswordList)) {
		        if ( $this->request->is('ajax') ) 
		        {
                    $this->set('message', $this->PasswordList->getInsertID());
                }
				$this->loadModel('Password');
				$password['Password']['URL'] = $this->request->data['Password']['URL'];
				$password['Password']['username'] = $this->request->data['Password']['username'];
				$password['Password']['email'] = $this->request->data['Password']['email'];
				$password['Password']['password'] = $this->request->data['Password']['password'];
				$password['Password']['email'] = $this->request->data['Password']['email'];
				$password['Password']['type'] = $this->request->data['Password']['type'];
				$password['Password']['password_list_id'] = $this->PasswordList->id;
				if($this->Password->save($password))
				{
                	$this->Session->setFlash(__('The Passwordlist has been saved!'));					
				}
				else
				{
					$this->PasswordList->deleteAll(array('PasswordList.name' =>$this->request->data['PasswordList']['name']));
					$this->Session->setFlash(__('Control Password could not be saved!'));
				}
            }
            else
            {
            	$this->Session->setFlash(__('Could not save Passwordlist!'));
            }
		}
		if ( $this->request->is('ajax') ) 
		{
			$this->layout = 'ajax';
		}
		else
		{
			$this->set('standAlone', true);
		}
	}

    public function edit($id = null)
    {
		$this->set('standAlone', true);
        if( $id == null )
        {
            $id = $this->request->data['PasswordList']['id'];
        }
        $PasswordList = $this->PasswordList->find('first', array(
            'conditions' => array(
                'PasswordListsUser.user_id' => $this->Auth->user('id'),
                'PasswordList.enabled' => true,
                'PasswordList.id' => $id
            ),
            'joins' => array(
                array(
                    'table' => 'password_lists_users',
                    'alias' => 'PasswordListsUser',
                    'type' => 'LEFT',
                    'conditions' => array(
                        'PasswordListsUser.password_list_id = PasswordList.id',
                    )
                )
            ),
            'recursive' => -1
        ));
        $this->set('old_name',$PasswordList['PasswordList']['name']);
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
               		echo json_encode($this->Password->find('all', array
            			(
            				'conditions' => array
            				(
            						'Password.password_list_id' => $id
            				),
            				'joins' => array(
            	    			array(
            	    				'table' => 'password_lists_users',
            	    				'alias' => 'PasswordListsUser',
            		    			'type' => 'LEFT',
            		    			'conditions' => array(
            		    				'AND'  => array
            		    				(
            		    					'PasswordListsUser.password_list_id' => $id,
            		    					'PasswordListsUser.user_id' => $this->Auth->user('id')
            		    				)
            		    			)
            		    		)
            	    		),
            				'recursive' => -1
            			)
            		));
                    $this->autoRender = false;
               } 
            } 
        }
    }

	public function show($id = null)
	{
		$PasswordList = $this->PasswordList->find('first', array(
    		'conditions' => array(
    			'PasswordListsUser.user_id' => $this->Auth->user('id'),
    			'PasswordList.enabled' => true,
    			'PasswordList.id' => $id
    		),
    		'joins' => array(
    			array(
    				'table' => 'password_lists_users',
    				'alias' => 'PasswordListsUser',
	    			'type' => 'LEFT',
	    			'conditions' => array(
	    				'PasswordListsUser.password_list_id = PasswordList.id',
	    			)
	    		)
	    	),
    		'recursive' => -1
    	));
    	$this->set('PasswordList', $PasswordList);
        $this->set('password_list_id', $id);
	}

    public function delete($id = null)
    {
        if($this->PasswordList->delete($id))
        {
            $this->Session->setFlash(__('The password list has been deleted'));
        }
        else
        {
            $this->Session->setFlash(__('Error occured'));
        }
    }
}
?>
