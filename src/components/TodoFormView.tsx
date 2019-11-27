import React, { useState } from 'react';
import {Text, View, TextInput, StyleSheet, Button, Picker} from 'react-native';
import ItemListView from "./ItemListView";
import {NavigationStackProp} from "react-navigation-stack";

interface Props {
  navigation: NavigationStackProp<{}>;
}

const TodoFormView = ({ navigation }: Props) => {
  const { navigate, getParam } = navigation;
  const edit = getParam('edit') as boolean;
  const onAdd = getParam('onAdd') as (todo: TodoNewlyCreated) => Promise<any>;
  const onEdit = getParam('onEdit') as (todo: Todo) => Promise<any>;
  const item = getParam('item') as Todo;
  const [status, setStatus] = useState(edit ? item.status : 'Todo');
  const [name, setName] = useState(edit ? item.title : '');
  const [priority, setPriority] = useState(edit ? item.priority : 'Low');
  const [description, setDescription] = useState(edit ? item.description : '');
  const submit = async () => {
    if ( !name || !description ) {
      console.log('Please fill form');
      return;
    }

    if (edit) {
      await onEdit({
        id: item.id,
        title: name,
        priority,
        status,
        description,
      });
      navigate('Home');
    } else {
      await onAdd({
        title: name,
        priority,
        status,
        description,
      });
      navigate('Home');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Name</Text>
        <TextInput placeholder={'Name'} style={styles.input} value={name} onChangeText={setName}/>
      </View>
      <View>
        <Text>Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
          <Picker.Item label="Todo" value="Todo" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Done" value="Done" />
        </Picker>
      </View>
      <View>
        <Text>Priority</Text>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>
      <View>
        <Text>Description</Text>
        <TextInput placeholder={'Description'} style={styles.input} value={description} onChangeText={setDescription}/>
      </View>
      <View>
        { edit ?
          (<Button title={'Save'} onPress={submit} />) :
          (<Button title={'Add'} onPress={submit} />)
        }
      </View>
    </View>
  );
};

TodoFormView.navigationOptions = {
  title: 'Todo Form',
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  input: {
    margin: 5,
    width: 200,
  },
});

export default TodoFormView;
