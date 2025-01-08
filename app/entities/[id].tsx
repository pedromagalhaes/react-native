import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Star } from 'lucide-react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Entity {
  id: number;
  entity_name: string;
  image_url: string;
  short_description: string;
  rating: string;
  reviews: string;
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
      const response = await fetch(`${serverUrl}/api/entities/${id}`);
      const data = await response.json();
      setEntity(data.data || data);
    } catch (error) {
      console.error('Error fetching entity:', error);
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

  return (
    <ScrollView className='flex-1 bg-background'>
      <Image 
        source={{ uri: entity.image_url }}
        className='w-full aspect-[4/3]'
        style={{ resizeMode: 'cover' }}
      />
      <View className='p-6'>
        <Text className='text-2xl font-bold text-foreground'>{entity.entity_name}</Text>
        <Text className='text-base text-muted-foreground mt-1'>{entity.category.category_name}</Text>
        
        <View className='flex-row items-center mt-2'>
          <Star size={16} className='text-yellow-400' fill='currentColor' />
          <Text className='text-sm text-foreground ml-1 font-medium'>
            {Number(entity.rating).toFixed(1)}
          </Text>
          <Text className='text-sm text-muted-foreground ml-1'>
            ({entity.reviews} reviews)
          </Text>
        </View>

        <View className='mt-4'>
          <Text className='text-base text-foreground'>{entity.short_description}</Text>
        </View>

        <View className='mt-4'>
          <Text className='text-sm font-medium text-foreground'>Location</Text>
          <Text className='text-sm text-muted-foreground mt-1'>{entity.location.location_name}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
