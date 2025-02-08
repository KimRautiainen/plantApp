import React from "react";
import { usePlantContext } from "../contexts/PlantContext";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// -- List screen acting as homepage. Shows all plants user has added. Plus icon for navigating to scanview to add plant--//
const ListScreen = ({ navigation }) => {
  const { plants } = usePlantContext(); // Get plants state from context

  // Conditionally render text if plant lenght = 0 to guide user how to add a new plant
  return (
    <View style={styles.container}>
      {plants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You don't currently have any plants.{"\n"}Tap the plus icon to add a
            new plant.
          </Text>
        </View>
      ) : (
        // If plant lenght is greater than 0, Render plants in batch of 10 to optimize large amounts of rendering in case there is many plants
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          maxToRenderPerBatch={10}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.card, index === 0 && styles.firstCard]}
              onPress={() =>
                navigation.navigate("PlantDetail", { plant: item })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.date}>{item.dateAdded}</Text>
              </View>

              {/* Show Notes Icon Only If Notes Exist */}
              {item.notes && item.notes.trim() !== "" && (
                <MaterialIcons name="notes" size={28} color="gray" />
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Floating Action Button to navigate to scan screen for adding plants */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("Scan")}
      >
        <MaterialIcons name="add-circle" size={70} color={"green"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  card: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  firstCard: {
    marginTop: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
  fab: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
});

export default ListScreen;
