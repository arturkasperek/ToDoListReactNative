import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Item from "./Item";

interface Props {
  items: TodoBasic[];
  onDelete: (itemId: number) => any;
  onEdit: (itemId: number) => any;
  sortBy: (field: string, desc: boolean) => any;
}

const ItemsList = ({ items, onDelete, onEdit, sortBy }: Props) => {
  const sortDirDefault: { [key: string]: boolean } = {
    name: false,
    status: false,
    priority: false,
  };
  const [sortDir, setSortDir] = useState(sortDirDefault);
  const onSort = (property: string) => {
    const newSortDir = {
      ...sortDir,
      [property]: !sortDir[property],
    };
    setSortDir(newSortDir);
    sortBy(property, newSortDir[property]);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text onPress={()=> onSort('name')} style={styles.headerItem}>Name</Text>
        <Text onPress={()=> onSort('status')} style={styles.headerItem}>Status</Text>
        <Text onPress={() => onSort('priority')} style={styles.headerItem}>Priority</Text>
      </View>
      <ScrollView style={styles.itemsWrapper}>
        {items.map((item, index) => (
          <Item onDelete={onDelete} onEdit={onEdit} item={item} key={item.id} isLast={index === items.length - 1}/>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsWrapper: {
    padding: 10,
    height: 355,
  },
  header: {
    flexDirection: 'row',
    margin: 10,
  },
  headerItem: {
    flexGrow: 1,
    flexBasis: 0,
  },
});

export default ItemsList;
