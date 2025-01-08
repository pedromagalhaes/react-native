import * as React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info, Star } from 'lucide-react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import Constants from 'expo-constants';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";
const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const CARD_WIDTH = SCREEN_WIDTH * 0.67; // Shows 1.5 cards

const StarRating = ({ rating, reviews }: { rating: string; reviews: string }) => {
  const ratingNum = Number(rating);
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className='flex-row items-center space-x-1'>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className='text-yellow-400' fill='currentColor' />
      ))}
      {hasHalfStar && (
        <Star key="half" size={16} className='text-yellow-400' fill='currentColor' strokeWidth={0.5} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className='text-muted-foreground/20' strokeWidth={1.5} />
      ))}
      <Text className='ml-2 text-sm text-muted-foreground'>({reviews})</Text>
    </View>
  );
};

const EntityCard = ({ item }: { item: Entity }) => (
  <View style={{ width: CARD_WIDTH - 16 }} className='mx-2'>
    <Card className='rounded-2xl'>
      <CardHeader className='items-center'>
        <Avatar alt={`${item.entity_name}'s Image`} className='w-24 h-24'>
          <AvatarImage source={{ uri: item.image_url }} />
          <AvatarFallback>
            <Text>{item.entity_name.substring(0, 2)}</Text>
          </AvatarFallback>
        </Avatar>
        <View className='p-3' />
        <View className='pb-2'>
          <Text className='text-xl font-semibold text-center'>{item.entity_name}</Text>
        </View>
        <View>
          <Text className='text-base font-semibold text-center'>{item.category.category_name}</Text>
        </View>
      </CardHeader>
      <CardContent>
        <View>
          <Text className='text-sm text-muted-foreground text-center'>{item.short_description}</Text>
        </View>
        <View className='pt-4 items-center'>
          <StarRating rating={item.rating} reviews={item.reviews} />
        </View>
        <View className='pt-4'>
          <Text className='text-sm text-muted-foreground text-center'>{item.location.location_name}</Text>
        </View>
      </CardContent>
    </Card>
  </View>
);

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const [entities, setEntities] = React.useState<Entity[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities`);
      const json = await response.json();
      setEntities(json.data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    } finally {
      setLoading(false);
    }
  };

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <FlatList
        data={entities}
        renderItem={({ item }) => <EntityCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH} // Use card width for snapping
        decelerationRate="fast"
        className='w-full'
      />
    </View>
  );
}
