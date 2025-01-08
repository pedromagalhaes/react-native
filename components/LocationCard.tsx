import React from 'react';
import { View, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Entity, Service, Review, Event, Category, Location } from '~/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.35;

const LocationCard = ({ item }: { item: Location }) => (
  <Link href={`/locations/${item.id}`} asChild>
    <Pressable>
      <View style={{ width: CARD_WIDTH }}>
        <View className='w-full aspect-square rounded-lg overflow-hidden bg-muted'>
          <Image
            source={{ uri: item.image }}
            className='w-full'
            style={{ width: '100%', height: undefined, aspectRatio: 10 / 16 }}
          />
        </View>
        <View className='mt-2'>
          <Text className='font-semibold text-foreground'>{item.location_name}</Text>
          {item.address && <Text className='text-sm text-muted-foreground'>{item.address}</Text>}
        </View>
      </View>
    </Pressable>
  </Link>
);

export default LocationCard;
