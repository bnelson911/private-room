import React from 'react';
import {withBebo} from 'bebo-react';
import MainSettings from './MainSettings.jsx';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      page: null,
      modal: null
    };
  }

  componentWillMount() {
    this.setState({page: 'main_settings'});
  }

  renderMainSettings(){
    if(this.state.page === "main_settings"){
      return (
        <MainSettings changePage={(page)=> this.setState({page})} />
      );
    }
    return null;
  }



  render() {
    return (
        <div className="app-layer">
          {this.renderMainSettings()}
        </div>
        );
  }

}

App.displayName = 'App';

// Uncomment properties you need
// App.propTypes = {};
// App.defaultProps = {};

export default withBebo(App);
