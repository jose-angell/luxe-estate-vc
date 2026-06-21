"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface PropertyPayload {
  id?: string;
  slug: string;
  title: string;
  price: number;
  pricePerMonth: boolean;
  location: string;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  status: string;
  type: string;
  badge: string;
  isFeatured: boolean;
  description?: string;
  yearBuilt?: number | null;
  parking?: number;
  amenities?: string[];
  latitude?: number | null;
  longitude?: number | null;
}

export async function saveProperty(
  payload: PropertyPayload,
  existingId?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createAdminClient();

  // Strip id from payload — it should never be sent as null on insert
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, ...cleanPayload } = payload;

  if (existingId) {
    const { error } = await supabase
      .from("properties")
      .update(cleanPayload)
      .eq("id", existingId);

    if (error) return { success: false, error: error.message };
  } else {
    const { error } = await supabase.from("properties").insert([cleanPayload]);

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/admin/properties");
  return { success: true };
}
