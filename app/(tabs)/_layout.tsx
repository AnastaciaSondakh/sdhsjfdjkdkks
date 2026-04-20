import { Stack, Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { TabBar } from '../../components/layout/TabBar';
import { Colors } from '../../constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: Colors.bgPrimary },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="aktivitas" />
        <Tabs.Screen name="suasana" />
        <Tabs.Screen name="tips" />
        <Tabs.Screen name="profil" />
      </Tabs>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
