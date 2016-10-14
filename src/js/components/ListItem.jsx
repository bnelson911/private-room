import React from 'react';
import {withBebo} from 'bebo-react';

class Card extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };

  }

  addRoom(){
    this.props.bebo.Server.addRoom(this.props.room.widget_id);
  }

  render(){
    return (
      <div className="room-container">
        <div className="room-meta">
          <p className="room-title">{this.props.room.title}</p>
          <p className="room-description">{this.props.room.description}</p>
        </div>
        <div className="card">
          <img src={"https://s3-us-west-2.amazonaws.com/bebo-images-usw2/misc/screenshot-" + this.props.room.widget_id+".png"} alt="" className="card-image" />
        </div>
      </div>
    );
  }

}



Card.displayName = 'Card';

// Uncomment properties you need
// Card.propTypes = {};
// Card.defaultProps = {};

export default withBebo(Card);
