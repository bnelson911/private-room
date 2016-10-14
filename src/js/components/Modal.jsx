import React from 'react';

class Modal extends React.Component {

  render() {
    var buttonTwo;
    var buttonOneStyle = {};
    if (this.props.actionLabel2) {
        buttonTwo = <button className='dialog--actions--btn' onClick={this.props.action2}>{this.props.actionLabel2}</button>
    } else {
      buttonOneStyle = {width: "100%", borderRight: "none"};
    }
    return <div className='modal modal-dialog'>
    <div className='dialog'> 
      <span className='dialog--header'>{this.props.title}</span>
      <span className='dialog--body'>{this.props.body}</span>
      <span className='dialog--actions'>
        <button className='dialog--actions--btn'
                onClick={this.props.action1}
                style={buttonOneStyle} >
                {this.props.actionLabel1}
        </button>
        {buttonTwo}
      </span>
    </div>
    <div className='modal-overlay'></div>
    </div>
  }
}

Modal.displayName = "Modal";
export default Modal;
