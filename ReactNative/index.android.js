/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import SimpleList from './js/SimpleList';
import DataUtils from './data/utils';

class Quizzer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: null,
      subcategoryId: null,
    };

    this._renderNavLeftButton = this._renderNavLeftButton.bind(this);
    this._renderNavRightButton = this._renderNavRightButton.bind(this);
    this._renderNavTitle = this._renderNavTitle.bind(this);

    this._onCategorySelected = this._onCategorySelected.bind(this);
    this._onSubcategorySelected = this._onSubcategorySelected.bind(this);
  }

  _onCategorySelected(key) {
    this.setState({ categoryId: key });
    this.refs.nav.push({ name: 'Subcategories' });
  }

  _onSubcategorySelected(key) {
    this.setState({ subcategoryId: key });
  }

  _renderNavLeftButton(route, navigator, index, navState) {
    return null;
  }

  _renderNavRightButton(route, navigator, index, navState) {
    return null;
  }

  _renderNavTitle(route, navigator, index, navState) {
    return (
      <Text style={styles.navBarTitle}>{route.name}</Text>
    );
  }

  render() {
    return (
      <Navigator
        ref='nav'
        initialRoute={{ name: 'Home' }}
        renderScene={(route, navigator) => {
          switch (route.name) {
            case 'Subcategories':
              return (
                <SimpleList
                  data={DataUtils.getSubcategories(
                    this.state.categoryId)}
                  onPress={this._onSubcategorySelected} />
               );
            default:
              return (
                <SimpleList
                  data={DataUtils.getCategories()}
                  onPress={this._onCategorySelected} />
              );
            }
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: this._renderNavLeftButton,
              RightButton: this._renderNavRightButton,
              Title: this._renderNavTitle,
            }}
            style={styles.navBar}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navBar: {
    backgroundColor: '#eeeeee',
  },
  navBarTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 15,
  },
});

AppRegistry.registerComponent('Quizzer', () => Quizzer);
