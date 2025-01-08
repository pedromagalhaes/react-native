http://localhost:4001/api/entities/locations

{
    "data": [
        {
            "id": 4,
            "location_name": "Fuseta",
            "address": null,
            "image": "https://picsum.photos/800/600"
        },
        {
            "id": 1,
            "location_name": "Moncarapacho",
            "address": "123 Main St, New York, NY",
            "image": "https://picsum.photos/800/600"
        },
        {
            "id": 2,
            "location_name": "Olhao",
            "address": "456 Ocean Ave, Los Angeles, CA",
            "image": "https://picsum.photos/800/600"
        },
        {
            "id": 5,
            "location_name": "Pechão",
            "address": null,
            "image": "https://picsum.photos/800/600"
        },
        {
            "id": 3,
            "location_name": "Quelfes",
            "address": "789 Lake St, Chicago, IL",
            "image": "https://picsum.photos/800/600"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 5,
        "itemsPerPage": 10
    }
}

http://localhost:4001/api/entities/categories/10

{
    "id": 10,
    "category_name": "animais",
    "image": "https://picsum.photos/800/600",
    "created_at": "2025-01-08T09:02:49.284Z",
    "updated_at": "2025-01-08T09:02:49.284Z"
}

http://localhost:4001/api/entities/categories

{
    "data": [
        {
            "id": 10,
            "category_name": "animais",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:02:49.284Z",
            "updated_at": "2025-01-08T09:02:49.284Z"
        },
        {
            "id": 15,
            "category_name": "auto e moto",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:05:51.950Z",
            "updated_at": "2025-01-08T09:05:51.950Z"
        },
        {
            "id": 1,
            "category_name": "comer e beber",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z"
        },
        {
            "id": 13,
            "category_name": "cultura e entretenimento",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:05:51.950Z",
            "updated_at": "2025-01-08T09:05:51.950Z"
        },
        {
            "id": 4,
            "category_name": "decoração, casa e jardim",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z"
        },
        {
            "id": 12,
            "category_name": "desporto e lazer",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:05:51.950Z",
            "updated_at": "2025-01-08T09:05:51.950Z"
        },
        {
            "id": 11,
            "category_name": "emprego e formação",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:04:35.371Z",
            "updated_at": "2025-01-08T09:04:35.371Z"
        },
        {
            "id": 14,
            "category_name": "eventos e catering",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:05:51.950Z",
            "updated_at": "2025-01-08T09:05:51.950Z"
        },
        {
            "id": 8,
            "category_name": "fornecedores, indústria e construção",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:02:49.284Z",
            "updated_at": "2025-01-08T09:02:49.284Z"
        },
        {
            "id": 9,
            "category_name": "jogos e brinquedos",
            "image": "https://picsum.photos/800/600",
            "created_at": "2025-01-08T09:02:49.284Z",
            "updated_at": "2025-01-08T09:02:49.284Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "totalItems": 16,
        "itemsPerPage": 10
    }
}

http://localhost:4001/api/entities/events

{
    "data": [
        {
            "id": 3,
            "event_name": "Tech Expo 2025",
            "latitude": "41.87810000",
            "longitude": "-87.62980000",
            "location_name": "Tech World Exhibition Center",
            "access_type": "private",
            "ticket_url": "https://tickets.example.com/tech-expo",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "description": "Discover the future of gadgets and AI.",
            "entity": {
                "id": 3,
                "entity_name": "Intermarché Moncarapacho"
            },
            "event_category": {
                "id": 3,
                "category_name": "Art Exhibition"
            },
            "status": {
                "id": 2,
                "name": "pending"
            }
        },
        {
            "id": 2,
            "event_name": "Coffee Tasting Event",
            "latitude": "34.05220000",
            "longitude": "-118.24370000",
            "location_name": "Cafe Delight Lounge",
            "access_type": "public",
            "ticket_url": "https://tickets.example.com/coffee-tasting",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "description": "Sample our newest coffee blends.",
            "entity": {
                "id": 2,
                "entity_name": "Galp"
            },
            "event_category": {
                "id": 2,
                "category_name": "Food Festival"
            },
            "status": {
                "id": 3,
                "name": "published"
            }
        },
        {
            "id": 1,
            "event_name": "Live Music Night",
            "latitude": "40.71280000",
            "longitude": "-74.00600000",
            "location_name": "Company A Main Hall",
            "access_type": "public",
            "ticket_url": "https://tickets.example.com/music-night",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "description": "Enjoy an evening of jazz and pop hits.",
            "entity": {
                "id": 1,
                "entity_name": "Mercado Municipal de Moncarapacho"
            },
            "event_category": {
                "id": 1,
                "category_name": "Music Concert"
            },
            "status": {
                "id": 3,
                "name": "published"
            }
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 3,
        "itemsPerPage": 10
    }
}

http://localhost:4001/api/entities/reviews

{
    "data": [
        {
            "id": 1,
            "rating": 5,
            "comment": "Excellent service!",
            "created_at": "2025-01-07T15:20:07.857Z",
            "user": {
                "id": 27,
                "name": "Chris Martin",
                "email": "chris.martin@temp.com"
            },
            "entity": {
                "id": 1,
                "entity_name": "Mercado Municipal de Moncarapacho",
                "contact_info": "phone: +1234567",
                "image_url": "https://picsum.photos/800/600",
                "short_description": "A popular local business.",
                "url": "https://company-a.com",
                "created_at": "2025-01-07T15:20:07.857085+00:00",
                "updated_at": "2025-01-07T15:20:07.857085+00:00"
            },
            "status": {
                "id": 4,
                "status_name": "approved"
            }
        },
        {
            "id": 2,
            "rating": 4,
            "comment": "Pretty good, will return.",
            "created_at": "2025-01-07T15:20:07.857Z",
            "user": {
                "id": 29,
                "name": "Sarah Connor",
                "email": "sarah.connor@temp.com"
            },
            "entity": {
                "id": 1,
                "entity_name": "Mercado Municipal de Moncarapacho",
                "contact_info": "phone: +1234567",
                "image_url": "https://picsum.photos/800/600",
                "short_description": "A popular local business.",
                "url": "https://company-a.com",
                "created_at": "2025-01-07T15:20:07.857085+00:00",
                "updated_at": "2025-01-07T15:20:07.857085+00:00"
            },
            "status": {
                "id": 4,
                "status_name": "approved"
            }
        },
        {
            "id": 3,
            "rating": 5,
            "comment": "Amazing coffee!",
            "created_at": "2025-01-07T15:20:07.857Z",
            "user": {
                "id": 30,
                "name": "Bob Roberts",
                "email": "bob.roberts@temp.com"
            },
            "entity": {
                "id": 2,
                "entity_name": "Galp",
                "contact_info": "contact@cafedelight.com",
                "image_url": "https://picsum.photos/800/600",
                "short_description": "A delightful coffee experience.",
                "url": "https://cafe-delight.com",
                "created_at": "2025-01-07T15:20:07.857085+00:00",
                "updated_at": "2025-01-07T15:20:07.857085+00:00"
            },
            "status": {
                "id": 4,
                "status_name": "approved"
            }
        },
        {
            "id": 4,
            "rating": 3,
            "comment": "Average experience.",
            "created_at": "2025-01-07T15:20:07.857Z",
            "user": {
                "id": 28,
                "name": "Emily Stone",
                "email": "emily.stone@temp.com"
            },
            "entity": {
                "id": 3,
                "entity_name": "Intermarché Moncarapacho",
                "contact_info": "info@techworld.com",
                "image_url": "https://picsum.photos/800/600",
                "short_description": "Your one-stop shop for electronics.",
                "url": "https://tech-world.com",
                "created_at": "2025-01-07T15:20:07.857085+00:00",
                "updated_at": "2025-01-07T15:20:07.857085+00:00"
            },
            "status": {
                "id": 1,
                "status_name": "draft"
            }
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 4,
        "itemsPerPage": 10
    }
}

http://localhost:4001/api/entities/services

{
    "data": [
        {
            "id": 3,
            "service_name": "Repair Center",
            "short_description": "Fix your devices quickly",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "entity": {
                "id": 3,
                "entity_name": "Intermarché Moncarapacho"
            },
            "status": {
                "id": 1,
                "name": "draft"
            }
        },
        {
            "id": 2,
            "service_name": "Barista Training",
            "short_description": "Learn how to make the perfect cup of coffee",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "entity": {
                "id": 2,
                "entity_name": "Galp"
            },
            "status": {
                "id": 3,
                "name": "published"
            }
        },
        {
            "id": 1,
            "service_name": "Consultation",
            "short_description": "Business consultation and strategy",
            "image_url": "https://picsum.photos/800/600",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "entity": {
                "id": 1,
                "entity_name": "Mercado Municipal de Moncarapacho"
            },
            "status": {
                "id": 3,
                "name": "published"
            }
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 3,
        "itemsPerPage": 10
    }
}

http://localhost:4001/api/entities/4

{
    "id": 4,
    "entity_name": "Tractor Rega",
    "contact_info": "info@techworld.com",
    "image_url": "https://picsum.photos/800/600",
    "short_description": "Your one-stop shop for electronics.",
    "url": null,
    "created_at": "2025-01-08T09:30:54.374Z",
    "updated_at": "2025-01-08T09:30:54.374Z",
    "published_at": null,
    "rating": "0.0",
    "reviews": "0",
    "category": {
        "id": 3,
        "category_name": "serviços",
        "image": "https://picsum.photos/800/600"
    },
    "location": {
        "id": 3,
        "location_name": "Quelfes",
        "address": "789 Lake St, Chicago, IL",
        "image": "https://picsum.photos/800/600"
    },
    "status": {
        "id": 1,
        "status_name": "draft"
    },
    "user": {
        "id": null,
        "name": null,
        "email": null
    }
}


http://localhost:4001/api/entities

{
    "data": [
        {
            "id": 4,
            "entity_name": "Tractor Rega",
            "contact_info": "info@techworld.com",
            "image_url": "https://picsum.photos/800/600",
            "short_description": "Your one-stop shop for electronics.",
            "url": null,
            "created_at": "2025-01-08T09:30:54.374Z",
            "updated_at": "2025-01-08T09:30:54.374Z",
            "published_at": null,
            "rating": "0.0",
            "reviews": "0",
            "category": {
                "id": 3,
                "category_name": "serviços",
                "image": "https://picsum.photos/800/600"
            },
            "location": {
                "id": 3,
                "location_name": "Quelfes",
                "address": "789 Lake St, Chicago, IL",
                "image": "https://picsum.photos/800/600"
            },
            "status": {
                "id": 1,
                "status_name": "draft"
            },
            "user": {
                "id": null,
                "name": null,
                "email": null
            }
        },
        {
            "id": 1,
            "entity_name": "Mercado Municipal de Moncarapacho",
            "contact_info": "phone: +1234567",
            "image_url": "https://picsum.photos/800/600",
            "short_description": "A popular local business.",
            "url": "https://company-a.com",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "rating": "4.5",
            "reviews": "2",
            "category": {
                "id": 1,
                "category_name": "comer e beber",
                "image": "https://picsum.photos/800/600"
            },
            "location": {
                "id": 1,
                "location_name": "Moncarapacho",
                "address": "123 Main St, New York, NY",
                "image": "https://picsum.photos/800/600"
            },
            "status": {
                "id": 1,
                "status_name": "draft"
            },
            "user": {
                "id": null,
                "name": null,
                "email": null
            }
        },
        {
            "id": 2,
            "entity_name": "Galp",
            "contact_info": "contact@cafedelight.com",
            "image_url": "https://picsum.photos/800/600",
            "short_description": "A delightful coffee experience.",
            "url": "https://cafe-delight.com",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "rating": "5.0",
            "reviews": "1",
            "category": {
                "id": 2,
                "category_name": "saúde, beleza e bem-estar",
                "image": "https://picsum.photos/800/600"
            },
            "location": {
                "id": 2,
                "location_name": "Olhao",
                "address": "456 Ocean Ave, Los Angeles, CA",
                "image": "https://picsum.photos/800/600"
            },
            "status": {
                "id": 1,
                "status_name": "draft"
            },
            "user": {
                "id": null,
                "name": null,
                "email": null
            }
        },
        {
            "id": 3,
            "entity_name": "Intermarché Moncarapacho",
            "contact_info": "info@techworld.com",
            "image_url": "https://picsum.photos/800/600",
            "short_description": "Your one-stop shop for electronics.",
            "url": "https://tech-world.com",
            "created_at": "2025-01-07T15:20:07.857Z",
            "updated_at": "2025-01-07T15:20:07.857Z",
            "published_at": null,
            "rating": "3.0",
            "reviews": "1",
            "category": {
                "id": 3,
                "category_name": "serviços",
                "image": "https://picsum.photos/800/600"
            },
            "location": {
                "id": 3,
                "location_name": "Quelfes",
                "address": "789 Lake St, Chicago, IL",
                "image": "https://picsum.photos/800/600"
            },
            "status": {
                "id": 1,
                "status_name": "draft"
            },
            "user": {
                "id": null,
                "name": null,
                "email": null
            }
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 4,
        "itemsPerPage": 10
    }
}