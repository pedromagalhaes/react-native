import * as React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
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

const EntityCard = ({ item }: { item: Entity }) => (
  <Card className='rounded-2xl mx-2' style={{ width: CARD_WIDTH - 16 }}> {/* 16 accounts for mx-2 */}
    <CardHeader className='items-center'>
      <Avatar alt={`${item.entity_name}'s Image`} className='w-24 h-24'>
        <AvatarImage source={{ uri: item.image_url }} />
        <AvatarFallback>
          <Text>{item.entity_name.substring(0, 2)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className='p-3' />
      <CardTitle className='pb-2 text-center'>{item.entity_name}</CardTitle>
      <CardDescription className='text-base font-semibold'>{item.category.category_name}</CardDescription>
    </CardHeader>
    <CardContent>
      <Text className='text-sm text-muted-foreground text-center'>{item.short_description}</Text>
      <View className='pt-4 flex-row justify-center items-center space-x-4'>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Rating</Text>
          <Text className='text-lg font-semibold text-sky-600'>{Number(item.rating).toFixed(1)}</Text>
        </View>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Reviews</Text>
          <Text className='text-lg font-semibold'>{item.reviews}</Text>
        </View>
      </View>
      <View className='pt-4'>
        <Text className='text-sm text-muted-foreground text-center'>{item.location.location_name}</Text>
      </View>
    </CardContent>
  </Card>
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
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardHeader className='items-center'>
          <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
            <AvatarFallback>
              <Text>RS</Text>
            </AvatarFallback>
          </Avatar>
          <View className='p-3' />
          <CardTitle className='pb-2 text-center'>Rick Sanchez</CardTitle>
          <View className='flex-row'>
            <CardDescription className='text-base font-semibold'>Scientist</CardDescription>
            <Tooltip delayDuration={150}>
              <TooltipTrigger className='px-2 pb-0.5 active:opacity-50'>
                <Info size={14} strokeWidth={2.5} className='w-4 h-4 text-foreground/70' />
              </TooltipTrigger>
              <TooltipContent className='py-2 px-4 shadow'>
                <Text className='native:text-lg'>Freelance</Text>
              </TooltipContent>
            </Tooltip>
          </View>
        </CardHeader>
        <CardContent>
          <View className='flex-row justify-around gap-3'>
            <View className='items-center'>
              <Text className='text-sm text-muted-foreground'>Dimension</Text>
              <Text className='text-xl font-semibold'>C-137</Text>
            </View>
            <View className='items-center'>
              <Text className='text-sm text-muted-foreground'>Age</Text>
              <Text className='text-xl font-semibold'>70</Text>
            </View>
            <View className='items-center'>
              <Text className='text-sm text-muted-foreground'>Species</Text>
              <Text className='text-xl font-semibold'>Human</Text>
            </View>
          </View>
        </CardContent>
        <CardFooter className='flex-col gap-3 pb-0'>
          <View className='flex-row items-center overflow-hidden'>
            <Text className='text-sm text-muted-foreground'>Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                className='w-11 items-center'
              >
                <Text className='text-sm font-bold text-sky-600'>{progress}%</Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View>
          <Progress value={progress} className='h-2' indicatorClassName='bg-sky-600' />
          <View />
          <Button
            variant='outline'
            className='shadow shadow-foreground/5'
            onPress={updateProgressValue}
          >
            <Text>Update</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
