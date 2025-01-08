import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Event {
  id: number;
  event_name: string;
  latitude: string;
  longitude: string;
  location_name: string;
  access_type: string;
  ticket_url: string;
  image_url: string;
  description: string;
  // Add other relevant properties
}

export default function EventDetail() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/events/${id}`);
      const data = await response.json();
      setEvent(data.data || data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Image source={{ uri: event?.image_url }} style={{ width: '100%', height: 200 }} />
        <Text>{event?.event_name}</Text>
        <Text>{event?.location_name}</Text>
        <Text>{event?.description}</Text>
        {/* Render other event details here */}
        <Text>Access Type: {event?.access_type}</Text>
        <Text>Ticket URL: <Text>{event?.ticket_url}</Text></Text>
      </View>
    </ScrollView>
  );
}
