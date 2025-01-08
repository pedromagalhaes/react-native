import React from 'react';
import { View, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Entity, Service, Review, Event, Category, Location } from '~/types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.35;

const ServiceCard = ({ item }: { item: Service }) => (
  <Link href={`/services/${item.id}`} params={{ serviceId: item.id }} asChild>
    <Pressable>
      <View style={{ width: CARD_WIDTH }}>
        <View className='w-full aspect-square rounded-lg overflow-hidden bg-muted'>
          <Image
            source={{ uri: item.image_url }}
            className='w-full'
            style={{ width: '100%', height: undefined, aspectRatio: 10 / 16 }}
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
    </Pressable>
  </Link>
);

export default ServiceCard;
