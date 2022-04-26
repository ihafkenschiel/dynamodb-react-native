import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Button,
} from 'react-native';
import {docClient} from './utils/AwsFunctions';

const App = () => {
  const [response, setResponse] = useState('');

  const fetchDataFormDynamoDb = tableName => {
    const params = {
      TableName: tableName,
    };

    docClient.scan(params, function (err, data) {
      if (!err) {
        console.log('data :>> ', data);
        setResponse(JSON.stringify(data, null, 2));
      } else {
        setResponse(JSON.stringify(err, null, 2));
      }
    });
  };

  const addDataToDynamoDB = async tableName => {
    const userData = {
      id: '125',
      firstName: 'Test',
      lastName: 'User3',
    };

    const params = {
      TableName: tableName,
      Item: userData,
    };

    console.log('params :>> ', params);

    docClient.put(params, function (err, data) {
      console.log('data :>> ', data);
      if (err) {
        setResponse(JSON.stringify(err, null, 2));
      } else {
        setResponse('Posted!');
      }
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flex: 1, margin: 20}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>
            DynamoDB on React Native
          </Text>
          <Button
            onPress={() => fetchDataFormDynamoDb('Users')}
            title="Fetch"
          />
          <Button onPress={() => addDataToDynamoDB('Users')} title="Post" />
          <Text>{response}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
