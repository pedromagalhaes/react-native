import {
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "~/components/ui/text";
import { Badge } from "~/components/ui/badge";
import CarouselSection from "~/components/CarouselSection";
import Map from "~/components/Map";
import { Star, Table } from "lucide-react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import StarRating from "~/components/StarRating";
import ServiceCard from "~/components/ServiceCard";

const serverUrl =
  Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
  };
  created_at: string;
  entity: {
    image_url: string;
    entity_name: string;
  };
}

interface Service {
  id: number;
  service_name: string;
  description: string;
}

interface Entity {
  id: number;
  entity_name: string;
  image_url: string;
  short_description: string;
  rating: string;
  reviews: Review[];
  services: Service[];
  category: {
    category_name: string;
  };
  location: {
    location_name: string;
  };
}

export default function EntityScreen() {
  const { id } = useLocalSearchParams();
  const [entity, setEntity] = useState<Entity | null>(null);
  const [loading, setLoading] = useState(true);
  const isWeb = Platform.OS === "web";

  useEffect(() => {
    fetchEntity();
  }, [id]);

  const fetchEntity = async () => {
    try {
      const entitiesResponse = await fetch(`${serverUrl}/api/entities/${id}`);
      if (!entitiesResponse.ok) {
        const text = await response.text();
        throw new Error(`Error fetching entity: ${entitiesResponse.status}`);
      }
      const entitiesData = await entitiesResponse.json();

      // Fetch reviews for the entity
      const reviewsResponse = await fetch(
        `${serverUrl}/api/entities/reviews/by-entity/${id}`
      );
      if (!reviewsResponse.ok) {
        const text = await reviewsResponse.text();
        throw new Error(`Error fetching reviews: ${reviewsResponse.status}`);
      }
      const reviewsData = await reviewsResponse.json();

      // Fetch services for the entity
      const servicesResponse = await fetch(
        `${serverUrl}/api/entities/services/by-entity/${id}`
      );
      let servicesData = [];
      if (!servicesResponse.ok) {
        const text = await servicesResponse.text();
        // No services found, set servicesData to an empty array
        servicesData = [];
      } else {
        servicesData = await servicesResponse.json();
      }

      // Set the entity along with its reviews and services
      setEntity({
        ...entitiesData,
        reviews: reviewsData ? reviewsData : [],
        services: servicesData,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading || !entity) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  // console the object to render as object in terminal

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      keyExtractor={() => "dummy"}
      ListHeaderComponent={
        <View className="dark:bg-slate-900">
          <Image
            source={{ uri: entity.image_url }}
            className="w-full aspect-[4/2]"
            style={{ resizeMode: "cover" }}
          />
          <View className="pt-8 p-4">
            <View className="mb-8 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-foreground">
                {entity.entity_name}
              </Text>
              <View className="flex-row items-center">
                <Star
                  size={20}
                  className="text-yellow-400"
                  fill="currentColor"
                />
                <Text className="text-lg text-foreground ml-2 mr-1 font-medium">
                  {Number(entity.rating).toFixed(1)}
                </Text>
                <Text className="text-sm text-muted-foreground ml-1">
                  ({entity.reviews.length})
                </Text>
              </View>
            </View>

            <View className="mb-8 mb-7">
              <Text className="font-medium mt-1">
                {entity.short_description}
              </Text>
            </View>
            <View className="mb-8 flex-row items-center align-center justify-start">
              <View className="mr-6">
                <Text className="text-sm font-medium text-muted-foreground pr-1">
                  Location
                </Text>
                <Text className="text-sm font-medium">
                  {entity?.location?.location_name}
                </Text>
              </View>

              <View className="">
                <Text className="text-sm font-medium text-muted-foreground pr-1">
                  Category
                </Text>
                <Text className="text-sm font-medium">
                  {entity?.category?.category_name}
                </Text>
              </View>
            </View>
          </View>

          <View className='mb-8'>
          <Map />
          </View>

          <View className="mb-8">
            {entity.services.length > 0 ? (
              <CarouselSection
                title="Services"
                subtitle="Explore available services"
                data={entity.services}
                renderItem={({ item }: { item: Service }) => (
                  <ServiceCard item={item} />
                )}
              />
            ) : (
              <Text className="text-sm text-muted-foreground">
                No services available for this entity.
              </Text>
            )}
          </View>

          <View className="mb-8 px-4">
            <Text className="text-lg font-bold text-foreground">Reviews</Text>
            <FlatList
              style={{
                paddingLeft: 0,
                marginLeft: 0,
              }}
              data={entity.reviews}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 16,
                  }}
                >
                  <Image
                    source={{ uri: item.entity.image_url }}
                    style={{ width: 30, height: 30, borderRadius: 30 }}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text className="text-sm text-muted-foreground">
                      {`${item.user ? item.user.name : "Anonymous"}: ${
                        item.comment
                      }`}
                    </Text>
                    <StarRating rating={item.rating.toString()} />
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
            />
          </View>
        </View>
      }
    />
  );
}
