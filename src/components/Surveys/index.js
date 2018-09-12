import React, { Component } from 'react';
import { PageHeader, Panel, Button } from 'react-bootstrap';

const startBtn = (
  <Button>
    Start
  </Button>
);

class Surveys extends Component {
  articles = [
    'Vote for employee Summer Event',
    'Security seminar feedback',
    'Quaterly Company Employee Review',
  ];

  renderPanels = () => {
    return this.articles.map((a) => {
      return (
        <Panel footer={startBtn}>
          { a }
        </Panel>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <PageHeader>Surveys</PageHeader>
        { this.renderPanels() }
      </div>
    );
  }
}

export default Surveys;
