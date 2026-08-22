import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout(){
    const {isSignedIn,isLoaded} = useAuth()

    if (!isLoaded) {return null};

    if (isSignedIn) return <Redirect href = "/"/>
    console.log("AUTH LAYOUT", {
  isLoaded,
  isSignedIn,
});
    return <Stack initialRouteName="sign-up" screenOptions={{ headerShown: false }} />;
}