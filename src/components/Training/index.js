import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import TrainingPic from './training.png';

class Training extends Component {
  render() {
    return (
      <Image src={TrainingPic} responsive />
    );
  }
}

export default Training;
