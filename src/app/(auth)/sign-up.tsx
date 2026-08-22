import {  useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");


  const isLoading = fetchStatus === "fetching";

  const onSignUpPress = async () => {
    console.log("SIGN UP STARTED");

    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    console.log("PASSWORD RESULT:", {
      error,
      status: signUp.status,
      missingFields: signUp.missingFields,
      unverifiedFields: signUp.unverifiedFields,
    });

    if (error) {
      console.log("SIGN UP ERROR:", JSON.stringify(error, null, 2));
      return;
    }

    const { error: sendError } =
      await signUp.verifications.sendEmailCode();

    console.log("SEND EMAIL RESULT:", {
      sendError,
      status: signUp.status,
    });

    if (sendError) {
      console.log(
        "SEND EMAIL ERROR:",
        JSON.stringify(sendError, null, 2)
      );
      return;
    }

    console.log("VERIFICATION EMAIL REQUESTED");
  };

  const onVerifyPress = async () => {
  const { error } = await signUp.verifications.verifyEmailCode({
    code,
  });

  if (error) {
    console.error(
      "EMAIL VERIFICATION ERROR:",
      JSON.stringify(error, null, 2)
    );
    return;
  }

  console.log("VERIFICATION RESULT:", {
    status: signUp.status,
    missingFields: signUp.missingFields,
    unverifiedFields: signUp.unverifiedFields,
  });

  if (signUp.status === "complete") {
    await signUp.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log("CURRENT TASK:", session.currentTask);
          return;
        }

        router.replace("/");
      },
    });
  } else {
    console.error("Sign-up attempt not complete:", {
      status: signUp.status,
      missingFields: signUp.missingFields,
      unverifiedFields: signUp.unverifiedFields,
    });
  }
};

   if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Image
          source={require("../../../assets/images/immobilier.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Verify your account
        </Text>
        <Text className="text-gray-500 mb-8 text-center">
          We sent a code to {email}
        </Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Enter verification code"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
        {errors.fields.code && (
          <Text className="text-red-500 mb-4">
            {errors.fields.code.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="w-full bg-blue-800 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-600">I need a new code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => signUp.reset()} className="py-2">
          <Text className="text-blue-600">Start over</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <ScrollView className="bg-white"
  contentContainerStyle={{
    flexGrow: 1,
    paddingBottom: 40,
  }}
  keyboardShouldPersistTaps="handled"
  keyboardDismissMode="on-drag">

      <View className="flex-1 justify-center px-6 py-12">
        <Image source={require('../../../assets/images/immobilier.png')} className="w-48 h-28 mb-8 -ml-3" resizeMode="contain" />
        <Text className="text-2xl font-bold text-gray-800 mb-2">Create Account</Text>
        <Text className="text-gray-500 mb-8">
          Find your dream home today
        </Text>
        <View className="flex-row gap-3 mb-4">
          <TextInput className="flex-1 border border-gray-300 rounded-xl px-4 py-3" placeholder="First name" placeholderTextColor="#9CA3AF"
            value={firstName} onChangeText={setFirstName} autoCapitalize="words" />


          <TextInput className="flex-1 border border-gray-300 rounded-xl px-4 py-3" placeholder="Last name" placeholderTextColor="#9CA3AF"
            value={lastName} onChangeText={setLastName} autoCapitalize="words" />


        </View>
        <TextInput className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4" placeholder="Email Address" placeholderTextColor="#9CA3AF"
          value={email} onChangeText={setEmail} autoCapitalize="none" />
        {errors.fields.emailAddress && (<Text className="text-red-500 mb-4">{errors.fields.emailAddress.message}</Text>)}
        <TextInput className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-black" placeholder="Password" placeholderTextColor="#9CA3AF"
          value={password} onChangeText={setPassword} secureTextEntry />
        {errors.fields.password && (<Text className="text-red-500 mb-4">{errors.fields.password.message}</Text>)}
        <TouchableOpacity
          onPress={onSignUpPress}
          disabled={isLoading} className="w-full bg-blue-900 rounded-xl py-4 items-center mb-4">
          {isLoading ? (<ActivityIndicator color="white"></ActivityIndicator>) : (<Text className="text-white text-base font-bold">Sign Up</Text>)}
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <Link href="/(auth)/sign-in" className="text-blue-900 font-bold ml-1">Sign In</Link>
        </View>
        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  )
}