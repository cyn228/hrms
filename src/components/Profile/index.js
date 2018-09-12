import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';
import { Grid, Row, Col,Image} from 'react-bootstrap';
import { ButtonToolbar,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserStore from '@stores/User.store';
import ProfileE from '@components/ProfileE';
import { observer } from 'mobx-react';
import SkillChart from '@components/SkillChart';
import AuthStore from '@stores/Auth.store';


class ProfileWrap extends Component {
  render() {
    const url = this.props.match.url;

    return (
      <div>
        <Route exact path={url} component={Profile} />
        <Route path={`${url}/edit`} component={ProfileE} />
        <Route path={`${url}/chart`} component={SkillChart} />
      </div>
    );
  }
}

@observer class Profile extends Component {
  static displayName = 'Profile';

  render() {
    return (
    <Grid>
       <Row>
          <Col xs={4} md={4}>
             <PageHeader>
               Sam Smith
               </PageHeader>


        </Col>
         <Col xsPush={2} md={1}>
          <ButtonToolbar>
            <Link to='/dashboard/profile/chart'>
              <Button bsStyle="primary">Manage</Button>
            </Link>
          </ButtonToolbar>
          </Col>
          <Col xsPush={2} md={4}>
            <Image
              style={{width: 50, height: 'auto'}}
              src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" responsive />
          </Col>

      </Row>
      <Row>
        ————————————————————————————————————————————————————————————————————————
      </Row>
        <Row>
          <Col xs={6} md={4}>
            <Image
              style={{width: 200, height: 'auto'}}
              src="http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg" responsive />
          </Col>
          <Col xs={6} md={4}>
            <Row>
               CONTACT INFORMATION
            </Row>
            <Row>
               ------------------------------
            </Row>
            <Row>
               Email: SamSmith@gmail.com
            </Row>
            <Row>
               Mobile: +1(519)-729-1034
            </Row>
            <Row>
              ———————————————————————————————
            </Row>
            <Row>
               GENERAL INFORMATION
            </Row>
            <Row>
               ------------------------------
            </Row>
            <Row>
               Birthday: July,4th 1990
            </Row>
            <Row>
              {'Department: ' + UserStore.department}
            </Row>
            <Row>
              Supervisor: Gigi Green
            </Row>
            <Row>
              City: Waterloo
            </Row>
            <Row>
              ———————————————————————————————
            </Row>
            <Row>
                SKILL INVENTORY INFORMATION
            </Row>
            <Row>
               ------------------------------
            </Row>
            <Row>
               Skills: PHP,Java,HTML,CSS,C++,JavaScript
            </Row>
            <Row>
              Interests: Tennis, football, piano
            </Row>
            <Row>
              ———————————————————————————————
            </Row>
            <Row>
                ADDITIONAL INFORMATION
            </Row>
            <Row>
               ------------------------------
            </Row>


          </Col>
        </Row>
        <Row>
              ————————————————————————————————————————————————————————————————————————
            </Row>

        <Row>

            </Row>
        <Row>
           <Col>
          <ButtonToolbar>
            <Link to='/dashboard/profile/edit'>
              <Button bsStyle="primary">Edit</Button>
            </Link>
          </ButtonToolbar>
          </Col>


        </Row>
      </Grid>
    );

  }

    handleClickLogout(){
    AuthStore.logOut();
    window.location.reload();
  }
}

export default ProfileWrap;
