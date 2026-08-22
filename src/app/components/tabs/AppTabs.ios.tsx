import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useUserStore } from "../../../../store/userStore";

export default function AppTabs() {
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <NativeTabs>
      {/* HOME */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>
          Home
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="house.fill"
          md="home"
        />
      </NativeTabs.Trigger>

      {/* SEARCH */}
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>
          Search
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="magnifyingglass"
          md="search"
        />
      </NativeTabs.Trigger>

      {/* CREATE - ADMIN ONLY */}
      {isAdmin && (
        <NativeTabs.Trigger name="create">
          <NativeTabs.Trigger.Label>
            Add Property
          </NativeTabs.Trigger.Label>

          <NativeTabs.Trigger.Icon
            sf="plus.circle.fill"
            md="add_circle"
          />
        </NativeTabs.Trigger>
      )}

      {/* SAVED */}
      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Label>
          Saved
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="heart.fill"
          md="favorite"
        />
      </NativeTabs.Trigger>

      {/* PROFILE */}
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          Profile
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="person.fill"
          md="person"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}