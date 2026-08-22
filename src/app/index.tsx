import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function Index() {
  const {isSignedIn,isLoaded} = useAuth()

  if (!isLoaded) return null;
  if (isSignedIn) {return <Redirect href = "/(root)/(tabs)"/>}
  console.log("INDEX", {
  isLoaded,
  isSignedIn,
});
  return <Redirect href="/(auth)/sign-up" />;

}



// "adaptiveIcon": {
//         "backgroundColor": "#E6F4FE",
//         "foregroundImage": "./assets/images/applogo.png",
//         "monochromeImage": "./assets/images/applogo.png"
//       }, this all goes in app.json file for adaptive icon if something goes wrong with the icon in android device with current icon. This is optional and can be removed if not needed.
