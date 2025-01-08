import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  entity: {
    id: number;
    entity_name: string;
    contact_info: string;
    image_url: string;
    short_description: string;
    url: string;
  };
}

export default function ReviewScreen() {
  const { id } = useLocalSearchParams();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/reviews/${id}`);
      const data = await response.json();
      setReview(data.data || data);
    } catch (error) {
      console.error('Error fetching review:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !review) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='flex-1 bg-background'>
      <Image 
        source={{ uri: review.entity.image_url }}
        className='w-full aspect-[4/3]'
        style={{ resizeMode: 'cover' }}
      />
      <View className='p-6'>
        <Text className='text-2xl font-bold text-foreground'>{review.entity.entity_name}</Text>
        <Text className='text-base text-muted-foreground mt-1'>Rating: {review.rating}</Text>
        <Text className='text-base text-foreground mt-4'>{review.comment}</Text>
        <Text className='text-sm text-muted-foreground mt-2'>Reviewed by: {review.user.name}</Text>
        <Text className='text-sm text-muted-foreground'>On: {new Date(review.created_at).toLocaleDateString()}</Text>
      </View>
    </ScrollView>
  );
}
