import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { usePlantContext } from "../contexts/PlantContext";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";

// -- Screen to add new plant using camera. stores plant inside plant context  -- //
const ScanScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const { addPlant } = usePlantContext();

  // Request camera permission and open camera when mounted if status is granted
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required!");
        navigation.navigate("ListScreen");
      } else {
        openCamera();
      }
    })();
  }, []);

  // Open camera function
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      navigation.goBack(); // Go back if user cancels
    }
  };

  // Save plant details to context
  const savePlant = () => {
    // Check if there is name and image before adding
    if (name.trim() && image) {
      addPlant({
        name,
        image,
        notes,
        dateAdded: new Date().toLocaleDateString(),
      });
      navigation.navigate("ListScreen"); // Navigate to home screen after plant is added
    } else {
      alert("Please enter a name and take a photo!"); // Alert user to enter name and image
    }
  };

  return (
    // dismiss keyboard when tapped outside of keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            {image ? (
              <>
                <Card.Cover source={{ uri: image }} style={styles.image} />
                <Card.Content>
                  <Text variant="titleLarge" style={styles.title}>
                    Add Plant Details
                  </Text>

                  <TextInput
                    label="Plant Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    mode="outlined"
                  />

                  <TextInput
                    label="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    style={styles.input}
                    mode="outlined"
                    multiline
                  />

                  <Button
                    mode="contained"
                    onPress={savePlant}
                    style={styles.button}
                  >
                    Save Plant
                  </Button>
                </Card.Content>
              </>
            ) : (
              <Text>Opening camera...</Text>
            )}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
  image: {
    height: 350,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default ScanScreen;
