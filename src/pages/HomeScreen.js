/* eslint-disable react-native/no-inline-styles */
// Example: Example of SQLite Database in React Native

import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
// import {openDatabase} from 'react-native-sqlite-storage';

import SQLite from 'react-native-sqlite-storage';

// var db = openDatabase({name: 'www/UserDataBase.db'});

// var db = openDatabase({
//   name: 'UserDatabase.db',
//   createFromLocation: 'src/database/UserDataBase.db',
// });
const db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~UserDataBase.db',
  },
  () => {},
  (error) => {
    console.log('ERROR: ' + error);
  },
);

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    console.log('IN THE USEEFFECT HOMME SCREENAM');
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          console.log('item:', res.rows);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="SQLite Example" />
          <Mybutton
            title="Register"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          https://github.com/sambabhouria
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
