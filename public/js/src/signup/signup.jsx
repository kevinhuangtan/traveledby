////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var PARSE_APP_ID = "FSfEL179hnGvnBBnvmmam10PhwDziYeukTJh8WRC"
var PARSE_JAVASCRIPT_KEY = "RwYZQBqEmCDa1F5IV2iBvdwGi6smXLWSmggt3zxB"
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

////////////////////////////////////////////////
////////////////*~ Container ~*/////////////////
////////////////////////////////////////////////

var Title = React.createClass({
  render: function(){
    return (
      <div className="Title">
        <h1>TraveledBy</h1>
        <p>
          <a href="http://calhoun.yalecollege.yale.edu/">
            <span id="CalhounCollege">Calhoun College</span>
          </a>
            's forum for illuminating diverse career paths.
        </p>
      </div>
    )
  }
})

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var Container = React.createClass({
  getInitialState: function(){
    return {
      received : false,
      message : "",
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    // console.log(this.refs.email.value);
    email = this.refs.email.value;
    var message;
    var self = this;
    if(validateEmail(email)){
      var Signup = Parse.Object.extend("Signup");
      var signup = new Signup();
      signup.set("email", email);
      signup.save(null, {
        success: function(signup){
          message = "received!";
          self.setState({
            received : true,
            message : message
          })
        }
      });
    }
    else{
      message = "please enter valid email";
      self.setState({
        received : true,
        message : message
      })
    }

  },
  render: function(){
    var Message;
    var style;
    if(this.state.received){
      Message = <p>{this.state.message}</p>
    }
    if(this.state.message == "received!"){
      style = {'display' : 'none'}
    }
    return (
      <div className="Container">
        <div className="RoadBackground">
          <img src="/images/yale.png"/>
        </div>
        <Title/>
        <form className="InputBox" onSubmit={this.handleSubmit}>
          <input style={style} ref="email" type="text" placeholder="Signup With Your Yale Email"/>
          {Message}
        </form>
      </div>
    )
  }
});

////////////////////////////////////////////////
/////////////////*~ Render ~*///////////////////
////////////////////////////////////////////////

ReactDOM.render(
  <div>
    <Container/>
  </div>,
  document.getElementById('root')
);
