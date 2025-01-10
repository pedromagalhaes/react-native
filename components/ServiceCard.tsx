import React from 'react';
import { View, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Entity, Service, Review, Event, Category, Location } from '~/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.33;

const ServiceCard = ({ item }: { item: Service }) => (
  <Link href={`/services/${item.id}`} params={{ serviceId: item.id }} asChild>
    <Pressable>
      <View style={{ width: CARD_WIDTH }}>
        <View className='w-full rounded-lg overflow-hidden bg-muted'>
          <Image
            source={{ uri: item.image_url }}
            className='w-full'
            style={{ width: '100%', height: undefined, aspectRatio: 1 / 1 }}
          />
        </View>
        <View className='mt-2'>
          <Text className='text-sm font-semibold text-foreground'>{item.service_name}</Text>
          <Text className='text-xs text-muted-foreground'>{item.short_description
          }</Text>
        </View>
      </View>
    </Pressable>
  </Link>
);

export default ServiceCard;
