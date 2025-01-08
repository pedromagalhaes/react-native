import Constants from 'expo-constants';
import { Entity, Service, Review, Event, Category, Location } from '../types';

const serverUrl = Constants.manifest?.extra?.SERVER_URL || "http://localhost:4001";

export const fetchData = async () => {
  try {
    const [entitiesResponse, servicesResponse] = await Promise.all([
      fetch(`${serverUrl}/api/entities`),
      fetch(`${serverUrl}/api/entities/services`)
    ]);

    const [entitiesData, servicesData] = await Promise.all([
      entitiesResponse.json(),
      servicesResponse.json()
    ]);

    return {
      entities: entitiesData.data || entitiesData,
      services: servicesData.data || servicesData
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { entities: [], services: [] };
  }
};

export const fetchReviews = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/entities/reviews`);
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/entities/events`);
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/entities/categories`);
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchLocations = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/entities/locations`);
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};
