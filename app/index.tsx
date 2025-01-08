// This file uses a single FlatList to manage all sections of the app, including carousels and vertical lists.
// This setup avoids nesting VirtualizedLists inside ScrollViews to prevent performance issues and warnings.

import * as React from 'react';
import { View, FlatList, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import Constants from 'expo-constants';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { Entity, Service, Review, Event, Category, Location } from '~/types';
import EntityCard from '~/components/EntityCard';
import ServiceCard from '~/components/ServiceCard';
import EventCard from '~/components/EventCard';
import CategoryCard from '~/components/CategoryCard';
import LocationCard from '~/components/LocationCard';
import StarRating from '~/components/StarRating';
import CarouselSection from '~/components/CarouselSection';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";
const SIDE_PADDING = 16;

export default function Screen() {
  const [entities, setEntities] = React.useState<Entity[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
    fetchReviews();
    fetchEvents();
    fetchCategories();
    fetchLocations();
  }, []);

  const fetchData = async () => {
    try {
      const [entitiesResponse, servicesResponse] = await Promise.all([
        fetch(`${serverUrl}/api/entities`),
        fetch(`${serverUrl}/api/entities/services`)
      ]);

      const [entitiesData, servicesData] = await Promise.all([
        entitiesResponse.json(),
        servicesResponse.json()
      ]);

      setEntities(entitiesData.data || entitiesData);
      setServices(servicesData.data || servicesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/reviews`);
      const data = await response.json();
      setReviews(data.data || data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/events`);
      const data = await response.json();
      setEvents(data.data || data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/categories`);
      const data = await response.json();
      setCategories(data.data || data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/locations`);
      const data = await response.json();
      setLocations(data.data || data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

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
            renderItem={({ item }) => <EntityCard item={item} />}
          />
          <View className='h-8' />
          <CarouselSection
            title="Services"
            subtitle="Explore available services"
            data={services}
            renderItem={({ item }) => <ServiceCard item={item} />}
          />
          <View className='h-8' />
          <View className='px-5 mb-0'>
            <Text className='text-2xl font-bold text-foreground'>Reviews</Text>
            <Text className='text-sm text-muted-foreground'>Read user reviews</Text>
          </View>
          <FlatList
            data={reviews}
            renderItem={({ item }) => (
              <Link href={`/reviews/${item.id}`} asChild>
                <Pressable>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}>
                    <Image
                      source={{ uri: item.entity.image_url }}
                      style={{ width: 80, height: 80, borderRadius: 8 }}
                    />
                    <View style={{ flex: 1, marginLeft: 8 }}>
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
            contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
          />
          <View className='h-8' />
          <CarouselSection
            title="Events"
            subtitle="Check out upcoming events"
            data={events}
            renderItem={({ item }) => <EventCard item={item} />}
          />
          <View className='h-8' />
          <CarouselSection
            title="Categories"
            subtitle="Explore various categories"
            data={categories}
            renderItem={({ item }) => <CategoryCard item={item} />}
          />
          <View className='h-8' />
          <CarouselSection
            title="Locations"
            subtitle="Discover various locations"
            data={locations}
            renderItem={({ item }) => <LocationCard item={item} />}
          />
        </View>
      }
    />
  );
}
