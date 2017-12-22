import React, { Component } from "react";
import  { isUserAuthenticated,  getUserOtherInfo, getUserName} from '../mainStore';
// import 'materialize-css/dist/css/materialize.min.css';
//import 'bootstrap';
class UserInfo extends Component
{
    renderModal()
    {
        return (
            <div className="modal fade" id="exampleModal" 
                        tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
            aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button> */}
                  </div>
                  <div className="modal-body">
                  Hello ...
... Hello Team,
... ... ...  Rather than wasting our time in listening to any unplanned description about the project, I have prepared this little recording to present to you two parts for this presentation. ... The first one is the retrospective of the sprints, and second one is the demo of the sprint2... ... ...

... ... ... ... ... 



...  For most of us, the Course Project started on Friday the first December 2017.
... It was also the start of the sprint one.
... On that day, we decided mainly two things.
... One ... Our sprints will be of approximately one week duration. 
... And two, sprint one should just be the task list for creating an MVP. or Minimum Viable Product.
... with that in mind, we decided that the tasks for sprint one would include - ...
... 1 ... To Create a bare bone, Single Page Web Application or S. P. A. ... using react...

... 2 ... To Incorporate C S S styles in the application ...

... 3 ... To Create User login and registration screens in the application ...

... 4 ... To Create, c sharp Web API, for backend service, to perform RESTful calls, from front end, to the back end, using HTTP, for crud operations ...
... 5 ... To create a database and table structures.
... and 6... Integrate the front end, the back end Web API  tier, and the data base...

... In the sprint one, Out of the above six tasks, I completed five and only could partially complete the sixth one... 

... The sixth task, obviously, went as the first one in the sprint two. 




                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>);
    }
    render()
    {
       
        return(
            <div>
                {this.renderModal()}
                <h4>UserInfo</h4>
                <div className='myContainer' style={{border:'1px solid lightgrey'}}>
                    {/* <a className='btn-floating btn-large red'>
                        <i className='material-icons'>+</i>
                    </a> */}
                    {(!isUserAuthenticated()) ? (
                        <div>
                            
                            <h5> 
                                No User has Logged in the system yet. Please log in the system using the Google Loging button 
                            </h5>
                        </div>)
                        :
                        <div>
                            <h5>User Name : {getUserName()}    </h5>
                            <hr />
                            Other User Info : {getUserOtherInfo()}
                            <hr />
                            
                   
                             
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Launch demo modal
                            </button>
                        </div>
                        
                    }
                </div>
            </div>
        );
    }
}

export default UserInfo;