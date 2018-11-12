import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setSearchField} from './actions';


class App extends Component {
    render() {
        return (
            <div>
                <h4>App.js</h4>
            </div>
        )
    }
}


// access by this.props.searchField
const mapStateToProps = (state) => {

    return {
        searchField: state.searchRobots.searchField,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(searchField (event.target.value))
    }
}
// calling by this.props.onSearchChange

export default connect(mapStateToProps, mapDispatchToProps)(App);