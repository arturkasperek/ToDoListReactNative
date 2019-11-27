import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Props {
  item: TodoBasic;
  isLast: boolean;
  onDelete: (itemId: number) => any;
  onEdit: (itemId: number) => any;
}

const Item = ({ item, isLast, onDelete, onEdit }: Props) => {
  const { id, title, status, priority} = item;

  return (
    <View style={isLast ? styles.mainContainerLast : styles.mainContainer}>
      <View style={styles.itemContainer}>
        <Text style={styles.titleItem}>{title}</Text>
        <Text style={styles.statusItem}>{status}</Text>
        <Text style={styles.priorityItem}>{priority}</Text>
      </View>
      <View style={styles.functionBoxItem}>
        <Text onPress={() => onEdit(item.id)} style={styles.editButton}>Edit</Text>
        <Text onPress={()=>{ onDelete(item.id) }} style={styles.deleteButton}>Delete</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  functionBoxItem: {
    flexDirection: 'row',
  },
  mainContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e3e3',
  },
  mainContainerLast: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e3e3',
  },
  editButton: {
    color: '#3450ee',
    marginRight: 20,
  },
  deleteButton: {
    color: '#cb1748',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  titleItem: {
    flexGrow: 1,
    flexBasis: 0,
  },
  statusItem: {
    flexGrow: 1,
    flexBasis: 0,
  },
  priorityItem: {
    flexGrow: 1,
    flexBasis: 0,
  },
});

export default Item;
