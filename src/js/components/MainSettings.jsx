import React from 'react';
import {withBebo} from 'bebo-react';
import DropZone from 'react-dropzone';
import LoadImage from 'blueimp-load-image';

class MainSettings extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      roster: [],
      selectedUsers: [],
      selectedRoom:null
    };

    this.updateRoster = this.updateRoster.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.createRoom = this.createRoom.bind(this);

  }

  componentWillMount(){
    this.updateRoster();
  }

  updateRoster(){
    return this.props.Bebo.Server.getRoster()
      .then((roster) =>{
        const user_id = this.props.Bebo.User.getId();
        roster = roster.filter((r) => r.user_id !== user_id && r.username);
        this.setState({roster});
      })
      .catch(function(err){
        console.error("failed to get rooms", err);
      });
  }

  selectRoom(room) {
    this.setState({selectedRoom: room});
  }

  selectUser(user_id) {
    const {selectedUsers} = this.state;
    const index = selectedUsers.indexOf(user_id);
    if(index === -1){
      selectedUsers.push(user_id);
      this.setState({selectedUsers});
    }else{
      selectedUsers.splice(index, 1);
      this.setState({selectedUsers});
    }
  }

  createRoom(){
    var data = {
      widget_id: this.state.selectedRoom,
      participants: this.state.selectedUsers
    };
    this.props.Bebo.Server.addRoom(data)
      .then(() => {
        this.setState({selectedUsers:[], selectedRoom:null});
      })
      .catch((err) => {
        console.error("Failed to add private room");
      });
  }

  renderTop(){
    return <div className="header">Create A Private Room</div>;
  }

  renderMeta(){
    return (
      <ul className="settings-group">
        <header className="settings-group-header">
          <p>Select A Room</p>
        </header>
        <li className={this.state.selectedRoom === "chat" ? "settings-item selected" : "settings-item"} onClick={() => this.selectRoom("chat")}>
          <div className="settings-item-left">
            <span>Chat</span>
          </div>
          <div className="settings-item-right">
            <div className="chat-img"></div>
          </div>
        </li>
        <li className={this.state.selectedRoom === "wall" ? "settings-item selected" : "settings-item"} onClick={() => this.selectRoom("wall")}>
          <div className="settings-item-left">
            <span>Discussions</span>
          </div>
          <div className="settings-item-right">
            <div className="wall-img"></div>
          </div>
        </li>
        <li className={this.state.selectedRoom === "video-lounge" ? "settings-item selected" : "settings-item"} onClick={() => this.selectRoom("video-lounge")}>
          <div className="settings-item-left">
            <span>Video Lounge</span>
          </div>
          <div className="settings-item-right">
            <div className="video-img"></div>
          </div>
        </li>

      </ul>);
  }

  renderRoster(){
    return (
      <ul className="settings-group">
        <header className="settings-group-header">
          <p>Select Members</p>
        </header>
        {this.state.roster.length > 0 ? this.state.roster.map((r) => {
          return (
            <li key={r.user_id} className="settings-item" onClick={() => this.selectUser(r.user_id)}>
              <div className="settings-item-left">
                <p>
                  <span className="room-icon" style={{backgroundImage: "url(" + r.image_url + ")"}}></span>
                  <span>{r.username}</span>
                </p>
              </div>
              <div className="settings-item-right">
                <div className="room-checkbox-container">
                  <label className={this.state.selectedUsers.indexOf(r.user_id) > -1 ? "checked" : ""}></label>
                </div>
              </div>
            </li>
          );
        }) : "No members in this group"}
      </ul>
    );
  }

  renderCreateButton(){
    const {selectedUsers, selectedRoom} = this.state;
    if(selectedRoom !== null && selectedUsers.length > 0){
      return <button className="create-button" onClick={this.createRoom}>Create Private Room</button>
    }
    return null;
  }

  render(){
    return (
      <div className="app-layer">
        <div className="main-container">
          <div className="main-settings">
            {this.renderTop()}
            {this.renderMeta()}
            {this.renderRoster()}
            {this.renderCreateButton()}
          </div>
        </div>
      </div>
    );
  }

}

MainSettings.displayName = 'MainSettings';

// Uncomment properties you need
// MainSettings.propTypes = {};
// MainSettings.defaultProps = {};

export default withBebo(MainSettings);
