/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import DatabaseConnector from '../database/DatabaseConnector';
import TodoService from '../services/TodoService';
import TodoRepository from '../database/TodoRepository';
import ItemsList from '../components/ItemsList';

let todoService: TodoService;

interface Props {
  navigation: NavigationStackProp<{}>;
}

const ItemListView = ({ navigation }: Props) => {
  const emptyItems: TodoBasic[] = [];
  const [items, setItems] = useState(emptyItems);

  useEffect(() => {
    const initDB = async () => {
      const dbConnection = await DatabaseConnector();
      todoService = new TodoService(dbConnection);

      await TodoRepository.drop(dbConnection);
      await TodoRepository.createTableIfNonExists(dbConnection);

      const items = await todoService.getAll();

      setItems(items);
    };

    initDB();
  }, []);
  const onDelete = async (itemId: number) => {
    const items = await todoService.removeOne(itemId);

    setItems(items);
  };
  const onSort = (sortItem: string, desc: boolean) => {
    let itemsSorted = [...items];

    switch (sortItem) {
      case 'name':
        itemsSorted = items.sort((a, b) => {
          if (a.title < b.title) {
            return desc ? -1 : 1;
          }
          if (a.title > b.title) {
            return desc ? 1 : -1;
          }
          return 0;
        });
        break;
      case 'priority':
        itemsSorted = items.sort((a, b) => {
          if (a.priority < b.priority) {
            return desc ? -1 : 1;
          }
          if (a.priority > b.priority) {
            return desc ? 1 : -1;
          }
          return 0;
        });
        break;
      case 'status':
        itemsSorted = items.sort((a, b) => {
          if (a.status < b.status) {
            return desc ? -1 : 1;
          }
          if (a.status > b.status) {
            return desc ? 1 : -1;
          }
          return 0;
        });
        break;
    }

    setItems(itemsSorted);
  };
  const onAdd = async (todo: TodoNewlyCreated) => {
    await todoService.add(todo);
    const todos = await todoService.getAll();

    setItems(todos);
  };
  const onEdit = async (todo: Todo) => {
    await todoService.update(todo);
    const todos = await todoService.getAll();

    setItems(todos);
  };
  const onEditEvent = async (itemId: number) => {
    const item = await todoService.getOne(itemId);

    navigation.navigate('TodoForm', {
      edit: true,
      onAdd,
      onEdit,
      item,
    })
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.buttonWrapper}>
          <Button title={'Add'} onPress={() => {
            navigation.navigate('TodoForm', {
              edit: false,
              onAdd,
              onEdit,
            });
          }} />
        </View>
        <ItemsList onEdit={onEditEvent} sortBy={onSort} onDelete={onDelete} items={items} />
      </View>
    </>
  );
};

ItemListView.navigationOptions = {
  title: 'Item List',
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  buttonWrapper: {
    width: 150,
  },
});

export default ItemListView;
