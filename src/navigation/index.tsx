import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthContext } from '../context/AuthContext';

// Screens
import { AuthScreen } from '../screens/AuthScreen';
import { SafetyDashboard } from '../screens/SafetyDashboard';
import { GroupScreen } from '../screens/GroupScreen';
import { GroupMapScreen } from '../screens/GroupMapScreen';
import { GroupChatScreen } from '../screens/GroupChatScreen';
import { EmergencyScreen } from '../screens/EmergencyScreen';
import { Header } from '../components/Header';
import { GroupSettingsScreen } from '../screens/GroupSettingsScreen';
import { GroupActivityScreen } from '../screens/GroupActivityScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function GroupStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Groups" component={GroupScreen} />
      <Stack.Screen name="GroupMap" component={GroupMapScreen} />
      <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      <Stack.Screen name="GroupSettings" component={GroupSettingsScreen} />
      <Stack.Screen name="GroupActivity" component={GroupActivityScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Safety"
        component={SafetyDashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-check" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="GroupsTab"
        component={GroupStack}
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function Navigation() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 