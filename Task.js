// components/Task.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Task = ({ text, completed, onToggle, onDelete }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onToggle} style={styles.itemLeft}>
        <View style={[styles.square, completed && styles.checkedSquare]}>
          {completed && <MaterialIcons name="check" size={16} color="white" />}
        </View>
        <Text style={styles.itemText}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="#fe7876" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#D9EFFF',
    borderRadius: 5,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedSquare: {
    backgroundColor: '#5DB4FF',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Task;
