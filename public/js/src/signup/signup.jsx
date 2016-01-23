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
      inputChange : false
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
  handleChange: function(){
    this.setState({ inputChange : true });
  },
  render: function(){
    var Message;
    var styleInput;
    var styleSubmitButton;
    if(this.state.inputChange){
      styleSubmitButton = {'display' : 'block'};
    }
    if(this.state.received){
      Message = <p>{this.state.message}</p>
    }
    if(this.state.message == "received!"){
      styleInput = {'display' : 'none'}
      styleSubmitButton = {'display' : 'none'}
    }
    return (
      <div className="Container">
        <section className="Slide1">
          <div className="RoadBackground">
            <img src="/images/yale.png"/>
          </div>
          <Title/>
          <form className="InputBox" onSubmit={this.handleSubmit}>
            <input style={styleInput} onChange={this.handleChange}  ref="email" type="text" placeholder="Signup With Your Yale Email"/>
            {Message}
            <p style={styleSubmitButton} onClick={this.handleSubmit} className="Submit">Submit</p>
          </form>
        </section>
        <section className="Slide2">
          <p className="Description1">
            We believe the more visible a path, the more likely someone will take a chance and travel it.
            Our mission is to illuminate a variety of worthwhile paths, including unconventional ones. Calhoun can help as a venue and platform.
            <br/><br/>
            To begin, we will plan a once-a-month luncheon where we invite several people from different industries and walks of life. We will ask our guests to
            talk about their respective careers and fields: why they chose them,
            how they got there, and how students could get a leg up.
            <br/><br/>
            We don’t think of this as a long presentation where students passively listen.
            You will be able to sit with guests and have concurrent conversations, whether at multiple tables in the dining hall or in some other way.
            <br/><br/>
            Help us kick off this project by filling out the following <a target="_blank" href="https://docs.google.com/a/yale.edu/forms/d/1lezwaAd8PJQODgB-TYhVjAPGwJwFUGltyHrL8i-6YDc/viewform">form</a>.
            <br/><br/>
            We will also have a Slack dedicated to TraveledBy &#x2014; an online forum where students and speakers can connect, Q&A, and share opportunities. Add your email above and we’ll send you an invite!
            <br/><br/>
            Questions? <span>Interested in being a speaker?</span> <br/>Contact kevin.tan@yale.edu or annasophia.young@yale.edu
            <br/><br/><br/>
            Keep searching, never settle.
          </p>
       </section>
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
