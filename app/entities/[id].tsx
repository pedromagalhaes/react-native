import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Star } from 'lucide-react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Review {
  id: number;
  rating: number;
  comment: string;
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
      const reviewsResponse = await fetch(`${serverUrl}/api/entities/reviews/${id}`);
      if (!reviewsResponse.ok) {
        const text = await reviewsResponse.text();
        throw new Error(`Error fetching reviews: ${reviewsResponse.status}`);
      }
      const reviewsData = await reviewsResponse.json();

      // Fetch services for the entity
      const servicesResponse = await fetch(`${serverUrl}/api/entities/services/${id}`);
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
        reviews: reviewsData ? [reviewsData] : [],
        services: servicesData,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading || !entity) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console the object to render as object in terminal
  console.log(
    entity
  )

  return (
    <ScrollView className='flex-1 bg-background'>
      <Image
        source={{ uri: entity.image_url }}
        className='w-full aspect-[4/3]'
        style={{ resizeMode: 'cover' }}
      />
      <View className='p-6'>
        <Text className='text-2xl font-bold text-foreground'>{entity.entity_name}</Text>
        <Text className='text-base text-muted-foreground mt-1'>{entity?.category?.category_name}</Text>

        <View className='flex-row items-center mt-2'>
          <Star size={16} className='text-yellow-400' fill='currentColor' />
          <Text className='text-sm text-foreground ml-1 font-medium'>
            {Number(entity.rating).toFixed(1)}
          </Text>
          <Text className='text-sm text-muted-foreground ml-1'>
            ({entity.reviews.length} reviews)
          </Text>
        </View>

        <View className='mt-4'>
          <Text className='text-base text-foreground'>{entity.short_description}</Text>
        </View>

        <View className='mt-4'>
          <Text className='text-sm font-medium text-foreground'>Location</Text>
          <Text className='text-sm text-muted-foreground mt-1'>{entity?.location?.location_name}</Text>
        </View>

        <View className='mt-4'>
          <Text className='text-lg font-bold text-foreground'>Reviews</Text>
          {entity.reviews.map(review => (
            <View key={review.id} className='mt-2'>
              <Text className='text-base text-foreground'>Rating: {review.rating}</Text>
              <Text className='text-sm text-muted-foreground'>{review.comment}</Text>
            </View>
          ))}
        </View>

        <View className='mt-4'>
          <Text className='text-lg font-bold text-foreground'>Services</Text>
          {entity.services.length > 0 ? (
            entity.services.map(service => (
              <View key={service.id} className='mt-2'>
                <Text className='text-base text-foreground'>{service.service_name}</Text>
                <Text className='text-sm text-muted-foreground'>{service.description}</Text>
              </View>
            ))
          ) : (
            <Text className='text-sm text-muted-foreground'>No services available for this entity.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}