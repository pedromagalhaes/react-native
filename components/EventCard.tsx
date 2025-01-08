import React from 'react';
import { View, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Entity, Service, Review, Event, Category, Location } from '~/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_PADDING = 16;
const SPACING = 8;
const CARD_WIDTH = SCREEN_WIDTH * 0.35;

const EventCard = ({ item }: { item: Event }) => (
  <Link href={`/events/${item.id}`} asChild>
    <Pressable>
      <View style={{ width: CARD_WIDTH }}>
        <View className='w-full rounded-lg overflow-hidden bg-muted'>
          <Image
            source={{ uri: item.image_url }}
            className='w-full'
            style={{ width: '100%', height: undefined, aspectRatio: 10 / 14 }}
          />
        </View>
        <View className='mt-2'>
          <Text className='font-semibold text-foreground'>{item.event_name}</Text>
          <Text className='text-sm text-muted-foreground'>{item.location}</Text>
          <Text className='text-xs text-muted-foreground'>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

export default EventCard;
