// This file uses a single FlatList to manage all sections of the app, including carousels and vertical lists.
// This setup avoids nesting VirtualizedLists inside ScrollViews to prevent performance issues and warnings.
// Note: Type definitions for Entity, Service, Review, Event, Category, and Location are imported from '~/types' to maintain code organization.
// Reminder: Import types from ~/types.ts for Entity, Service, Review, Event, Category, and Location.

import * as React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { fetchData, fetchReviews, fetchEvents, fetchCategories, fetchLocations } from '~/utils/api';
import EntityCard from '~/components/EntityCard';
import ServiceCard from '~/components/ServiceCard';
import EventCard from '~/components/EventCard';
import CategoryCard from '~/components/CategoryCard';
import LocationCard from '~/components/LocationCard';
import StarRating from '~/components/StarRating';
import CarouselSection from '~/components/CarouselSection';
import { Entity, Service, Review, Event, Category, Location } from '~/types';

export default function Screen() {
  const [entities, setEntities] = React.useState<Entity[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { entities, services } = await fetchData();
      setEntities(entities);
      setServices(services);
      setReviews(await fetchReviews());
      setEvents(await fetchEvents());
      setCategories(await fetchCategories());
      setLocations(await fetchLocations());
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      className='pt-8'
      data={[]}
      renderItem={() => null}
      keyExtractor={() => 'dummy'}
      ListHeaderComponent={
        <View>
          <CarouselSection
            title="Entities"
            subtitle="Discover local services and businesses"
            data={entities}
            renderItem={({ item }: { item: Entity }) => <EntityCard item={item} />}
          />
          <View className='h-16' />
          <CarouselSection
            title="Services"
            subtitle="Explore available services"
            data={services}
            renderItem={({ item }: { item: Service }) => <ServiceCard item={item} />}
          />
          <View className='h-16' />
          <View className='px-5 mb-0'>
            <Text className='text-2xl font-bold text-foreground'>Reviews</Text>
            <Text className='text-sm text-muted-foreground'>Read user reviews</Text>
          </View>
          <FlatList
            data={reviews}
            renderItem={({ item }: { item: Review }) => (
              <Link href={`/reviews/${item.id}`} asChild>
                <Pressable>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}>
                    <Image
                      source={{ uri: item.entity.image_url }}
                      style={{ width: 80, height: 80, borderRadius: '100%' }}
                    />
                    <View style={{ flex: 1, marginLeft: 16 }}>
                      <Text className='font-semibold text-foreground'>{item.entity.entity_name}</Text>
                      <Text className='text-sm text-muted-foreground'>{item.comment}</Text>
                      <StarRating rating={item.rating.toString()} reviews={item.user.name} />
                    </View>
                  </View>
                </Pressable>
              </Link>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
          <View className='h-16' />
          <CarouselSection
            title="Events"
            subtitle="Check out upcoming events"
            data={events}
            renderItem={({ item }: { item: Event }) => <EventCard item={item} />}
          />
          <View className='h-16' />
          <CarouselSection
            title="Categories"
            subtitle="Explore various categories"
            data={categories}
            renderItem={({ item }: { item: Category }) => <CategoryCard item={item} />}
          />
          <View className='h-8' />
          <CarouselSection
            title="Locations"
            subtitle="Discover various locations"
            data={locations}
            renderItem={({ item }: { item: Location }) => <LocationCard item={item} />}
          />
          <View className='h-24' />
        </View>
      }
    />
  );
}
