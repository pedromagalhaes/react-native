import React from 'react';
import { View } from 'react-native';
import { Star } from 'lucide-react-native';
import { Text } from '~/components/ui/text';

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
      {reviews && <Text className='ml-2 text-sm text-muted-foreground'>({reviews})</Text>}
    </View>
  );
};

export default StarRating;
