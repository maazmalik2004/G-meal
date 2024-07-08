import React from 'react';
import Button from '@mui/material/Button';

class RedirectButton extends React.Component {
  handleButtonClick = () => {
    // URL to redirect to
    const url = 'http://localhost:8501/';

    // Open the URL in a new tab
    window.open(url, '_blank');
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleButtonClick}>
          Fast Food Analytics
        </Button>
      </div>
    );
  }
}

export default RedirectButton;