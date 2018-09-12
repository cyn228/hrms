import React from 'react';
import { observable, action } from 'mobx';
import { Row, Col } from 'react-bootstrap';
import Config from '@config';

class NotificationStore {
  @observable title = '';
  @observable content = '';
  @observable isVisible = false;
  ws = null;

  constructor() {
    this.ws = new WebSocket(`${Config.SERVER_WS}`);
    this.ws.addEventListener('open', () => {
      this.ws.send('Hello server!');
      console.log('WS IS ALL GOOD');
    });
    this.ws.addEventListener('message', (msg) => {
      this.handleIncomingMessage(msg);
    });
  }

  @action
  setTitle = (title) => {
    this.title = title;
  }

  @action
  setContent = (content) => {
    this.content = content;
  }

  @action
  setNotification = (title, content) => {
    this.title = title;
    this.content = content;
  }

  @action
  toggleVisibility = (state = null) => {
    if (state !== true && state !== false) {
      this.isVisible = !this.isVisible;
    } else this.isVisible = state;
  }

  @action
  handleIncomingMessage = (msg) => {
    let contents;
    try {
      contents = JSON.parse(msg.data);
    } catch (err) {
      console.log('WS unexpected message', msg.data);
      return;
    }
    console.log('Message received!', contents);
    if (contents.type === 'PAYROLL') {
      console.log('is payroll');
      const payroll = contents.payroll;
      this.toggleVisibility(false);
      this.setNotification('Payrolls have been updated!', (
        <div className="notification-content">
          <Row>
            <Col md={4}>Status:</Col>
            <Col md={8}>{payroll.status}</Col>
          </Row>
          <Row>
            <Col md={4}>Request ID:</Col>
            <Col md={8}>{payroll.request_id}</Col>
          </Row>
          <Row>
            <Col md={4}>Department:</Col>
            <Col md={8}>{payroll.department}</Col>
          </Row>
          <Row>
            <Col md={4}>Manager:</Col>
            <Col md={8}>{payroll.manager}</Col>
          </Row>
          <Row>
            <Col md={4}>Amount:</Col>
            <Col md={8}>${parseFloat(Math.round(payroll.totalAmount * 100) / 100).toFixed(2)}</Col>
          </Row>
        </div>
      ));
      this.toggleVisibility(true);
    }
  }
}

const instance = new NotificationStore();
export default instance;
