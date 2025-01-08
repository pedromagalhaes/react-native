import React from 'react';
import { View, Pressable, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Entity, Service, Review, Event, Category, Location } from '~/types';
import StarRating from './StarRating';
import { Star } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.35;

const EntityCard = ({ item }: { item: Entity }) => (
  <Link href={`/entities/${item.id}`} asChild>
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
          <Text className='font-semibold text-foreground' numberOfLines={2}>{item.entity_name}</Text>
          <Text className='text-sm text-muted-foreground' numberOfLines={1}>{item.category.category_name}</Text>
          <View className='flex-row items-center mt-1'>
            <Star size={12} className='text-yellow-400' fill='currentColor' />
            <Text className='text-xs text-muted-foreground ml-1'>{Number(item.rating).toFixed(1)} ({item.reviews})</Text>
          </View>
        </View>
      </View>
    </Pressable>
  </Link>
);

export default EntityCard;
