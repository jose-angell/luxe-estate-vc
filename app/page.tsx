import { connection } from 'next/server';
import { supabase } from '../lib/supabase';
import HomeClient from './HomeClient';
import { Property } from '../data/mockProperties';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; category?: string; q?: string }>;
}) {
  await connection(); // force dynamic render so searchParams are always fresh
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = parseInt(params.limit || '8', 10);
  const category = params.category || 'All';
  const q = params.q || '';
  
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Fetch all featured properties for the top section (limit to 2 as requested)
  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*')
    .eq('isFeatured', true)
    .eq('isActive', true)
    .limit(2);

  // Fetch paginated market properties
  let marketQuery = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('isActive', true);

  const isFiltering = category !== 'All' || q !== '';
  if (!isFiltering) {
    marketQuery = marketQuery.eq('isFeatured', false);
  }

  if (category !== 'All') {
    marketQuery = marketQuery.eq('type', category);
  }

  if (q) {
    // ILIKE is natively case-insensitive in Postgres — no need to lowercase
    marketQuery = marketQuery.ilike('title', `%${q}%`);
  }

  const { data: marketProperties, count } = await marketQuery.range(start, end);

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
      initialQ={q}
    />
  );
}
