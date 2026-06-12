import { supabase } from '../lib/supabase';
import HomeClient from './HomeClient';
import { Property } from '../data/mockProperties';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = parseInt(params.limit || '4', 10);
  
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Fetch all featured properties for the top section (not paginated)
  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*')
    .eq('isFeatured', true);

  // Fetch paginated market properties
  const { data: marketProperties, count } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('isFeatured', false)
    .range(start, end);

  const mapProperty = (p: any): Property => ({
    ...p,
    slug: p.slug || p.id,
    images: p.images && p.images.length > 0 ? p.images : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"],
  });

  const mappedFeatured = featuredProperties ? featuredProperties.map(mapProperty) : [];
  const mappedMarket = marketProperties ? marketProperties.map(mapProperty) : [];

  return (
    <HomeClient 
      featuredProperties={mappedFeatured} 
      marketProperties={mappedMarket}
      totalCount={count || 0}
      page={page}
      limit={limit}
    />
  );
}
