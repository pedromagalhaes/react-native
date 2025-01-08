import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Star } from 'lucide-react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Service {
  id: number;
  service_name: string;
  short_description: string;
  image_url: string;
  entity: {
    id: number;
    entity_name: string;
  };
  status: {
    id: number;
    name: string;
  };
}

export default function ServiceScreen() {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/services/${id}`);
      const data = await response.json();
      setService(data.data || data);
    } catch (error) {
      console.error('Error fetching service:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !service) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-background'>
      <Image 
        source={{ uri: service.image_url }}
        className='w-full aspect-[4/3]'
        style={{ resizeMode: 'cover' }}
      />
      <View className='p-6'>
        <Text className='text-2xl font-bold text-foreground'>{service.service_name}</Text>
        <Text className='text-base text-muted-foreground mt-1'>{service.entity.entity_name}</Text>
        
        <View className='flex-row items-center mt-2'>
          <Star size={16} className='text-yellow-400' fill='currentColor' />
          <Text className='text-sm text-foreground ml-1 font-medium'>
            {/* Add rating logic here if available */}
          </Text>
        </View>

        <View className='mt-4'>
          <Text className='text-base text-foreground'>{service.short_description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
