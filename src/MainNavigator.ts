import {createStackNavigator} from 'react-navigation-stack';
import ItemListView from './components/ItemListView';
import TodoFormView from './components/TodoFormView';

const MainNavigator = createStackNavigator({
  Home: {screen: ItemListView},
  TodoForm: {screen: TodoFormView},
});

export default MainNavigator;
