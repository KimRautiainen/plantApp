import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements"; // For dynamic keyboard offset
import { MaterialIcons } from "@expo/vector-icons";
import { usePlantContext } from "../contexts/PlantContext";
import * as ImagePicker from "expo-image-picker";

// -- Screen to view details of plant and modify -- //
const PlantDetailScreen = ({ route, navigation }) => {
  const { plant } = route.params; // Take plant as param from listScreen
  const { updatePlant } = usePlantContext();
  const headerHeight = useHeaderHeight(); // Get header height for offset

  const [isEditing, setIsEditing] = useState(false); // State to control if editing is true or false
  const [editedPlant, setEditedPlant] = useState({ ...plant }); // State of edited plant

  // Function to handle edits in the plant details
  // Takes in the field name (e.g., "name", "notes", "image") and the new value
  // Updates the editedPlant state while keeping previous values intact
  const handleEdit = (field, value) => {
    setEditedPlant((prev) => ({ ...prev, [field]: value }));
  };

  // Launch camera function
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) handleEdit("image", result.assets[0].uri);
  };

  // Save changes to plant context
  const saveChanges = () => {
    updatePlant(plant.id, editedPlant);
    setIsEditing(false);
  };

  // Use effect to re render when values have been edited
  useEffect(() => {
    setEditedPlant({ ...plant });
  }, [plant]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight + 20}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {/* Image Container */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: editedPlant.image }}
              style={styles.largeImage}
            />

            {/* Edit and save icon on bottom right of image  */}
            {isEditing ? (
              <TouchableOpacity
                style={styles.rightSideButtons}
                onPress={saveChanges}
              >
                <MaterialIcons name="check-circle" size={28} color="green" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.rightSideButtons}
                onPress={() => setIsEditing(true)}
              >
                <MaterialIcons name="edit" size={28} color="gray" />
              </TouchableOpacity>
            )}

            {/* Camera Icon in bottom left of image when editing */}
            {isEditing && (
              <TouchableOpacity
                style={styles.leftSideButtons}
                onPress={pickImage}
              >
                <MaterialIcons name="photo-camera" size={28} color="gray" />
              </TouchableOpacity>
            )}
          </View>

          {/* Plant details */}
          <View style={styles.detailsContainer}>
            {isEditing ? (
              <TextInput
                style={styles.inputTitle}
                value={editedPlant.name}
                onChangeText={(text) => handleEdit("name", text)}
                textAlign="center"
              />
            ) : (
              <Text style={styles.title}>{editedPlant.name}</Text>
            )}
            <Text style={styles.date}>{plant.dateAdded}</Text>
          </View>

          {/* Notes Section */}
          <View style={styles.notesContainer}>
            <Text style={styles.sectionTitle}>Notes</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.notesInput]}
                value={editedPlant.notes}
                onChangeText={(text) => handleEdit("notes", text)}
                multiline
              />
            ) : (
              <Text style={styles.notesText}>
                {editedPlant.notes || "No notes available."}
              </Text>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    position: "relative",
    flexShrink: 1,
  },
  largeImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  rightSideButtons: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  leftSideButtons: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "gray",
    width: "80%",
    padding: 5,
  },
  date: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  notesContainer: {
    marginTop: 20,
    padding: 15,
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notesText: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    padding: 8,
  },
  input: {
    fontSize: 16,
    padding: 8,
    marginBottom: 10,
  },
  notesInput: {
    textAlignVertical: "top",
  },
});

export default PlantDetailScreen;
