import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Glyphicon } from 'react-bootstrap';
import './styles.css';

import Notif from '@stores/Notification.store';

@observer
class Notification extends Component {
  render() {
    return (
      <div className="notification container" style={{display: Notif.isVisible ? 'block' : 'none'}}>
        <Button className="close-btn" onClick={() => { Notif.toggleVisibility(false) }}>
          <Glyphicon glyph="remove" bsSize="small" />
        </Button>
        <h3>{Notif.title}</h3>
        <div className="notification-content-container">
          {Notif.content}
        </div>
      </div>
    );
  }
}

export default Notification;
