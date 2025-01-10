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
  <View className='w-full '>
    <View className='px-4 mb-2'>
      <Text className='text-lg font-bold text-foreground'>{title}</Text>
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
