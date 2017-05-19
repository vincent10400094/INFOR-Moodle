import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <div id='wrap'>
            <Navbar />
            {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
