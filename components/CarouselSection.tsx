import React from 'react';
import { Text } from '~/components/ui/text';
import { View, FlatList } from 'react-native';

const SIDE_PADDING = 16;
const SPACING = 16;

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
      contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
      ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
    />
  </View>
);

export default CarouselSection;
