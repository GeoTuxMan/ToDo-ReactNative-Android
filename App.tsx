import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState<{ text: string; completed: boolean }[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@task_items');
        if (storedTasks) {
          setTaskItems(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Eroare la încărcarea task-urilor:', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('@task_items', JSON.stringify(taskItems));
      } catch (e) {
        console.error('Eroare la salvare:', e);
      }
    };
    saveTasks();
  }, [taskItems]);

  const handleAddTask = () => {
    if (!task.trim()) return;
    Keyboard.dismiss();
    setTaskItems([...taskItems, { text: task.trim(), completed: false }]);
    setTask('');
  };

  const toggleTask = (index: number) => {
    const newTasks = [...taskItems];
    newTasks[index].completed = !newTasks[index].completed;
    setTaskItems(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = taskItems.filter((_, i) => i !== index);
    setTaskItems(newTasks);
  };

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
  >
    <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1} style={{ flex: 1 }}>
      <LinearGradient colors={['#ff6a8d', '#ff9a61']} style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>
            <AntDesign name="checksquareo" size={24} color="#333" /> DE FĂCUT AZI
          </Text>
          <ScrollView
            style={styles.items}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            {taskItems.map((item, index) => (
              <Task
                key={index}
                text={item.text}
                completed={item.completed}
                onToggle={() => toggleTask(index)}
                onDelete={() => deleteTask(index)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Adaugă o sarcină nouă"
            placeholderTextColor="#aaa"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    flexDirection: 'row',
  },
  items: {
    marginBottom: 80,
  },
  writeTaskWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 20,
  marginBottom: 60,
},

  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#5DB4FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
