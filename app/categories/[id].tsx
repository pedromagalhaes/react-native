import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from '~/components/ui/text';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

interface Category {
  id: number;
  category_name: string;
  image: string;
  // Add other relevant properties
}

export default function CategoryDetail() {
  const { id } = useLocalSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/entities/categories/${id}`);
      const data = await response.json();
      setCategory(data.data || data);
    } catch (error) {
      console.error('Error fetching category:', error);
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
        <Image source={{ uri: category?.image }} style={{ width: '100%', height: 200 }} />
        <Text>{category?.category_name}</Text>
        {/* Render other category details here */}
      </View>
    </ScrollView>
  );
}
