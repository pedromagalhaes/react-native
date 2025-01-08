import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Location {
  id: number;
  location_name: string;
  address: string | null;
  image: string;
}

export default function LocationScreen() {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, [id]);

  const fetchLocation = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/locations/${id}`);
      const data = await response.json();
      setLocation(data.data || data);
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !location) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-background'>
      <Image 
        source={{ uri: location.image }}
        className='w-full aspect-[4/3]'
        style={{ resizeMode: 'cover' }}
      />
      <View className='p-6'>
        <Text className='text-2xl font-bold text-foreground'>{location.location_name}</Text>
        {location.address && <Text className='text-base text-muted-foreground mt-1'>{location.address}</Text>}
      </View>
    </ScrollView>
  );
}
