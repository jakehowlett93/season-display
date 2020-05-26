import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


class App extends React.Component {
    constructor(props) {
        super(props);

        //this is the only place that state can be directly assigned otherwise setState must be used
        this.state = { 
            lat: null,
            errorMessage: ''
        };
    }

    componentDidMount() {
        console.log('this function is automatically called one time when the component first mounts');
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    componentDidUpdate() {
        console.log('this function is called automatically every time the component updates')
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message="Please accept the location request"/>;
    }

    // Requirement of React, react says we have to define render
    render() {
        return (
            <div className='border red'>
                {this.renderContent()}
            </div>
        )
       
    }
}

    //create-react-app generates a div called root which is traditionally where the app is rendered too
ReactDOM.render(
    <App />,
    document.querySelector("#root")
);