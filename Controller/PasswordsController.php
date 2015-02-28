<?php

class PasswordsController extends AppController
{

	public $helpers = array(
        'Form' => array(
              'className' => 'BootstrapForm'
        )
    );
	public $components = array(
        'Session',
        'Auth'
    );

    public $uses = array('Password', 'PasswordList');

    public function delete($id = null)
    {
        $this->render(false);
        $id = $this->request->data['password_id'];
        if($this->Password->delete($id))
        {
            echo __('0/The password has been deleted');
        }
        else
        {
            echo __('2/Error occured');
        }
    }

    public function search($passwordlistid = null, $needle = "NotToBeFoundHopefully")
    {
        if ( $this->request->is('ajax') )
		{
			$this->layout = 'ajax';
			$needle = $this->request->data['needle'];
			$passwordlistid = $this->request->data['passwordlistid'];
		}
		$this->set('passwords',$this->Password->find('all', array
			(
				'conditions' => array
				(
					'OR' => array
					(
						'Password.URL LIKE' => '%' . $needle . '%',
						'Password.comment LIKE' => '%' . $needle . '%',
                        'Password.type LIKE' => '%' . $needle . '%'
					),
					'AND' => array
					(
						'Password.password_list_id' => $passwordlistid
					)
				),
				'joins' => array(
	    			array(
	    				'table' => 'password_lists_users',
	    				'alias' => 'PasswordListsUser',
		    			'type' => 'LEFT',
		    			'conditions' => array(
		    				'AND'  => array
		    				(
		    					'PasswordListsUser.password_list_id' => $passwordlistid,
		    					'PasswordListsUser.user_id' => $this->Auth->user('id')
		    				)
		    			)
		    		)
	    		),
				'recursive' => -1
			)
		));
    }
	
	public function add($id = null)
	{
        $this->set('password_list_id', $id);
		$this->set('standAlone', false);
		if ( $this->request->is('ajax') )
		{
			$this->layout = 'ajax';
		}
		if ( $this->request->is('post') ) 
		{
            debug($this->request->data);
			if ($this->Password->save($this->request->data)) {
                $this->set('message', __('0/The Password has been saved'));
            }
		}
		else
		{
			$this->set('standAlone', true);
		}
	}

    public function edit($id = null)
    {
        $this->render(false);
        $password = $this->Password->find('first',array('conditions' => array('Password.id' => $id)));
        if (!$password) 
        {
            echo __('2/Password not found');
            exit();
        }
        if ( $this->request->is('ajax') )
        {
            $this->layout = 'ajax';
        }
        if ( $this->request->is(array('post','put')) )
        {
            $this->Password->id = $id;
            if($this->Password->save($this->request->data))
            {
                echo __('0/The password has been saved');
            }
            else
            {
                echo __('2/Error occured');
            }
        }
    }
}
?>
