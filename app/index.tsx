import * as React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, ScrollView, Image } from 'react-native';
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
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.35;
const SPACING = 8;
const SIDE_PADDING = 16;

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
  <View style={{ width: CARD_WIDTH }}>
    <View className='w-full aspect-square rounded-lg overflow-hidden bg-muted'>
      <Image
        source={{ uri: item.image_url }}
        className='w-full h-full'
        style={{ resizeMode: 'cover' }}
      />
    </View>
    <View className='mt-2'>
      <Text className='font-semibold text-foreground' numberOfLines={2}>{item.entity_name}</Text>
      <Text className='text-sm text-muted-foreground' numberOfLines={1}>{item.category.category_name}</Text>
      <View className='flex-row items-center mt-1'>
        <Star size={12} className='text-yellow-400' fill='currentColor' />
        <Text className='text-xs text-muted-foreground ml-1'>{Number(item.rating).toFixed(1)} ({item.reviews})</Text>
      </View>
    </View>
  </View>
);

const ServiceCard = ({ item }: { item: Service }) => (
  <View style={{ width: CARD_WIDTH }}>
    <View className='w-full aspect-square rounded-lg overflow-hidden bg-muted'>
      <Image
        source={{ uri: item.image_url }}
        className='w-full h-full'
        style={{ resizeMode: 'cover' }}
      />
    </View>
    <View className='mt-2'>
      <Text className='font-semibold text-foreground' numberOfLines={2}>{item.service_name}</Text>
      <Text className='text-sm text-muted-foreground' numberOfLines={1}>{item.entity.entity_name}</Text>
      <View className='mt-1'>
        <View className='px-2 py-0.5 bg-primary/10 self-start rounded-full'>
          <Text className='text-xs text-primary font-medium capitalize'>{item.status.name}</Text>
        </View>
      </View>
    </View>
  </View>
);

const CarouselSection = ({ title, subtitle, data, renderItem }: {
  title: string;
  subtitle: string;
  data: any[];
  renderItem: any;
}) => (
  <View className='w-full'>
    <View className='px-5 mb-4'>
      <Text className='text-2xl font-bold text-foreground'>{title}</Text>
      <Text className='text-sm text-muted-foreground'>{subtitle}</Text>
    </View>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: SIDE_PADDING
      }}
      ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
    />
  </View>
);

export default function Screen() {
  const [entities, setEntities] = React.useState<Entity[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [entitiesResponse, servicesResponse] = await Promise.all([
        fetch(`${serverUrl}/api/entities`),
        fetch(`${serverUrl}/api/entities/services`)
      ]);

      const [entitiesData, servicesData] = await Promise.all([
        entitiesResponse.json(),
        servicesResponse.json()
      ]);

      setEntities(entitiesData.data || entitiesData);
      setServices(servicesData.data || servicesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log('Entities:', entities);
  console.log('Services:', services);

  return (
    <ScrollView
      className='flex-1 bg-secondary/30 pt-6'
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <CarouselSection
        title="Entities"
        subtitle="Discover local services and businesses"
        data={entities}
        renderItem={({ item }) => <EntityCard item={item} />}
      />

      <View className='h-8' />

      <CarouselSection
        title="Services"
        subtitle="Explore available services"
        data={services}
        renderItem={({ item }) => <ServiceCard item={item} />}
      />
    </ScrollView>
  );
}
