import {
    TabList,
    Tabs,
    TabSlot,
    TabTrigger,
} from "expo-router/ui";

import { useUserStore } from "../../../../store/userStore";

import LiquidGlassTab from "./LiquidGlassTab";
import LiquidGlassTabBar from "./LiquidGlassTabBar";

export default function AppTabs() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <Tabs>
      {/* The current screen */}
      <TabSlot />

      {/* Our custom Android tab bar */}
      <TabList asChild>
        <LiquidGlassTabBar>
          {/* HOME */}
          <TabTrigger name="index" href="/(root)/(tabs)" asChild>
            <LiquidGlassTab icon="home-outline" label="Home" />
          </TabTrigger>

          {/* SEARCH */}
          <TabTrigger name="search" href="/(root)/(tabs)/search" asChild>
            <LiquidGlassTab icon="search-outline" label="Search" />
          </TabTrigger>

          {/* CREATE - ADMIN ONLY */}
          {isAdmin && (
            <TabTrigger name="create" href="/(root)/(tabs)/create" asChild>
              <LiquidGlassTab icon="add-circle-outline" label="Add Property" />
            </TabTrigger>
          )}

          {/* SAVED */}
          <TabTrigger name="saved" href="/(root)/(tabs)/saved" asChild>
            <LiquidGlassTab icon="heart-outline" label="Saved" />
          </TabTrigger>

          {/* PROFILE */}
          <TabTrigger name="profile" href="/(root)/(tabs)/profile" asChild>
            <LiquidGlassTab icon="person-outline" label="Profile" />
          </TabTrigger>
        </LiquidGlassTabBar>
      </TabList>
    </Tabs>
  );
}