import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwaqytngwakzyalzbrch.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3YXF5dG5nd2FrenlhbHpicmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NjIwNzYsImV4cCI6MjA5NjUzODA3Nn0.HW-zFC3_eaxRXCR1pHsATApWC5gaRTajphSTYOEfi8s';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const generateProperties = () => {
  const types = ["House", "Apartment", "Villa", "Penthouse"];
  const statuses = ["FOR SALE", "FOR RENT"];
  const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Miami, FL", "Austin, TX", "Seattle, WA", "San Francisco, CA", "Boston, MA", "Denver, CO", "Atlanta, GA", "San Diego, CA", "Nashville, TN", "Phoenix, AZ", "Dallas, TX", "Portland, OR"];
  const titles = [
    "Modern Downtown Loft", "Cozy Suburban Home", "Luxury Beachfront Villa", 
    "Sleek High-rise Penthouse", "Historic Brownstone", "Contemporary Family Home", 
    "Chic Studio Apartment", "Rustic Forest Cabin", "Minimalist Urban Retreat", 
    "Spacious Garden Estate", "Elegant Corner Apartment", "Sunny Hillside House", 
    "Industrial Loft Space", "Classic Victorian Home", "Secluded Mountain Lodge", 
    "Ocean View Condo", "Eco-friendly Modern House", "Grand Suburban Mansion", 
    "Quaint City Townhouse", "Lavish City Penthouse"
  ];
  
  const properties = [];
  for(let i=0; i<20; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const price = status === "FOR SALE" ? Math.floor(Math.random() * 4800000) + 200000 : Math.floor(Math.random() * 8000) + 1500;
    
    properties.push({
      id: `property-${Date.now()}-${i}`,
      slug: `property-${Date.now()}-${i}`,
      title: titles[i],
      price: price,
      pricePerMonth: status === "FOR RENT",
      location: cities[Math.floor(Math.random() * cities.length)],
      beds: Math.floor(Math.random() * 5) + 1,
      baths: Math.floor(Math.random() * 4) + 1,
      area: Math.floor(Math.random() * 400) + 50,
      images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"],
      status: status,
      type: type,
      isFeatured: false
    });
  }
  return properties;
}

const run = async () => {
  console.log("Generating 20 properties...");
  const properties = generateProperties();
  const { data, error } = await supabase.from('properties').insert(properties);
  if (error) {
    console.error("Error inserting properties:", error);
  } else {
    console.log("Successfully inserted 20 properties.");
  }
}

run();
