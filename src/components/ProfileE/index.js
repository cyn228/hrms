import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { Grid, Row, Col,Image} from 'react-bootstrap';
import { ButtonToolbar,Button } from 'react-bootstrap';
import { Form, FormGroup,ControlLabel,FormControl,Checkbox, DropdownButton, MenuItem } from "react-bootstrap";
import { observer } from 'mobx-react';
import UserStore from '@stores/User.store';

@observer class Profile extends Component {
  static displayName = 'ProfileE';

  constructor(props) {
    super(props);

    this.state = {
      department: UserStore.department,
      major: UserStore.major
    }

    this.deptDropdown = {
      1: 'Production',
      2: 'Marketing',
      3: 'Finance',
      4: 'HR'
    };

    this.csDropdown = {
        1: 'Java',
        2: 'C++', 
        3: 'PHP', 
        4: 'C#', 
        5: 'HTML', 
        6: 'JavaScript', 
        7: 'Python',
        8: 'More'
    };

    this.lsDropdown = {
        1: 'English', 
        2: 'French', 
        3: 'Spanish', 
        4: 'Chinese', 
        5: 'Japanese', 
        6: 'Korean', 
        7: 'Russian',
        8: 'More'
    };

    this.degDropdown = {
        1: 'High School', 
        2: 'Bachelor', 
        3: 'Master', 
        4: 'Doctor', 
        5: 'More'
    };

    this.majDropdown = {
        1: 'Computer Science', 
        2: 'Accounting', 
        3: 'Arts', 
        4: 'Science', 
        5: 'Economics', 
        6: 'Physics', 
        7: 'Biology',
        8: 'More'
    };

    this.onDeptChange = this.onDeptChange.bind(this);
    this.onMajChange = this.onMajChange.bind(this);
    this.handleClickSave = this.handleClickSave.bind(this);
  }

  onDeptChange(event) {
    this.setState({department: this.deptDropdown[event]});
  }
   onMajChange(event) {
    this.setState({major: this.majDropdown[event]});
  }

  handleClickSave() {
    const obj = {department: this.state.department, major: this.state.major};
    UserStore.updateProfile(obj);
  }
  
  render() {
    return (
    <Grid>
       <Row>
          <Col xs={4} md={4}>
             <PageHeader>
               Sam Smith
               </PageHeader>
               
           
        </Col>
          <Col xsPush={2} md={4}>
            <Image 
              style={{width: 50, height: 'auto'}}
              src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" responsive />
          </Col>

      </Row>
      <Row>
               CONTACT INFORMATION
      </Row> 
      <Row>
               ------------------------------
      </Row> 
       <Row>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                    Email
                </Col>
                <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalMobile">
                <Col componentClass={ControlLabel} sm={2}>
                    Mobile
                </Col>
                <Col sm={10}>
                    <FormControl type="Mobile" placeholder="Mobile" />
                </Col>
            </FormGroup>
            
            

        </Form>
       </Row>
      <Row>
               GENERAL INFORMATION
      </Row> 
      <Row>
               ------------------------------
      </Row> 
       <Row>
          <Form horizontal>
            <FormGroup controlId="formHorizontalBirthday">
                <Col componentClass={ControlLabel} sm={2}>
                    Birthday
                </Col>
                <Col sm={10}>
                    <FormControl type="birthday" placeholder="Birthday" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalDepartment">
                <Col componentClass={ControlLabel} sm={2}>
                   Department
                </Col>
                <Col sm={10}>
                    <DropdownButton bsStyle='Default' title={this.state.department} onSelect={this.onDeptChange} >
                      <MenuItem eventKey='1'>{this.deptDropdown[1]}</MenuItem>
                      <MenuItem eventKey='2'>{this.deptDropdown[2]}</MenuItem>
                      <MenuItem eventKey='3'>{this.deptDropdown[3]}</MenuItem>
                      <MenuItem eventKey='4'>{this.deptDropdown[4]}</MenuItem>
                    </DropdownButton>
                </Col>
            </FormGroup>
            
             <FormGroup controlId="formHorizontalSupervisor">
                <Col componentClass={ControlLabel} sm={2}>
                   Supervisor
                </Col>
                <Col sm={10}>
                    <FormControl type="supervisor" placeholder="Supervisor" />
                </Col>
            </FormGroup>

             <FormGroup controlId="formHorizontalCity">
                <Col componentClass={ControlLabel} sm={2}>
                   City
                </Col>
                <Col sm={10}>
                    <FormControl type="city" placeholder="City" />
                </Col>
            </FormGroup>

            </Form>
            </Row>
                  <Row>
               CONTACT INFORMATION
      </Row> 
      <Row>
               ------------------------------
      </Row> 
       <Row>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                    Email
                </Col>
                <Col sm={10}>
                    <FormControl type="email" placeholder="Email" />
                </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalMobile">
                <Col componentClass={ControlLabel} sm={2}>
                    Mobile
                </Col>
                <Col sm={10}>
                    <FormControl type="Mobile" placeholder="Mobile" />
                </Col>
            </FormGroup>
            
            

        </Form>
       </Row>
      <Row>
               SKILL INVENTORY INFORMATION
      </Row> 
      <Row>
               ----------------------------------
      </Row> 
       <Row>
          <Form horizontal>
            <FormGroup controlId="formHorizontalSKILLS">
                
                <Col componentClass={ControlLabel} sm={2}>
                    Skills
                </Col>
                <Col sm={10}>
                    <DropdownButton bsStyle='Default' title={'computer skills'} >
                      <MenuItem eventKey='1'>{this.csDropdown[1]}</MenuItem>
                      <MenuItem eventKey='2'>{this.csDropdown[2]}</MenuItem>
                      <MenuItem eventKey='3'>{this.csDropdown[3]}</MenuItem>
                      <MenuItem eventKey='4'>{this.csDropdown[4]}</MenuItem>
                      <MenuItem eventKey='5'>{this.csDropdown[5]}</MenuItem>
                      <MenuItem eventKey='6'>{this.csDropdown[6]}</MenuItem>
                      <MenuItem eventKey='7'>{this.csDropdown[7]}</MenuItem>
                      <MenuItem eventKey='8'>{this.csDropdown[8]}</MenuItem>


                    </DropdownButton>
                
                    <DropdownButton bsStyle='Default' title={'langauge skills'} >
                      <MenuItem eventKey='1'>{this.lsDropdown[1]}</MenuItem>
                      <MenuItem eventKey='2'>{this.lsDropdown[2]}</MenuItem>
                      <MenuItem eventKey='3'>{this.lsDropdown[3]}</MenuItem>
                      <MenuItem eventKey='4'>{this.lsDropdown[4]}</MenuItem>
                      <MenuItem eventKey='5'>{this.lsDropdown[5]}</MenuItem>
                      <MenuItem eventKey='6'>{this.lsDropdown[6]}</MenuItem>
                      <MenuItem eventKey='7'>{this.lsDropdown[7]}</MenuItem>
                      <MenuItem eventKey='8'>{this.lsDropdown[8]}</MenuItem>


                    </DropdownButton>
                
                    <DropdownButton bsStyle='Default' title={'Degree'} >
                      <MenuItem eventKey='1'>{this.degDropdown[1]}</MenuItem>
                      <MenuItem eventKey='2'>{this.degDropdown[2]}</MenuItem>
                      <MenuItem eventKey='3'>{this.degDropdown[3]}</MenuItem>
                      <MenuItem eventKey='4'>{this.degDropdown[4]}</MenuItem>


                    </DropdownButton>
               
                    <DropdownButton bsStyle='Default' title={'Major'} onSelect={this.onMajChange}>
                      <MenuItem eventKey='1'>{this.majDropdown[1]}</MenuItem>
                      <MenuItem eventKey='2'>{this.majDropdown[2]}</MenuItem>
                      <MenuItem eventKey='3'>{this.majDropdown[3]}</MenuItem>
                      <MenuItem eventKey='4'>{this.majDropdown[4]}</MenuItem>
                      <MenuItem eventKey='5'>{this.majDropdown[5]}</MenuItem>
                      <MenuItem eventKey='6'>{this.majDropdown[6]}</MenuItem>
                      <MenuItem eventKey='7'>{this.majDropdown[7]}</MenuItem>
                      <MenuItem eventKey='8'>{this.majDropdown[8]}</MenuItem>


                    </DropdownButton>
                </Col>
            </FormGroup>

            </Form>
          </Row>
          <Row>
            <Col xsPush={2} md={4}>
            <ButtonToolbar>
                <Button bsStyle="primary" onClick= {this.handleClickSave}>Save</Button>
            </ButtonToolbar>
            </Col>
        </Row>

      </Grid>
    );

  }
}

export default Profile;
