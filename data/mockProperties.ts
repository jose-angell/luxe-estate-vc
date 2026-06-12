export interface Property {
  id: string;
  slug: string;
  title: string;
  price: number;
  pricePerMonth?: boolean;
  location: string;
  beds: number;
  baths: number;
  area: number; // in m²
  images: string[];
  status: "FOR SALE" | "FOR RENT";
  type: "House" | "Apartment" | "Villa" | "Penthouse";
  badge?: string;
  isFeatured: boolean;
}

const extraImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbloTFAmeq6ugmfkwyqn3NMGn11PMk4FU0EIHRHvfYB8nw_-iH5TLps5ig3zipLPoKVZZKO8fOvEVJIwp3MQ9wrS4Dzhgw6ypUDhsycDc-YsboVBbRrXxKOYl-77zNHX9E4hynYyJfVVzXn7ldtURk3Ij3pHIMwqzfDdUxyhYaIJe5dRYa0JN5RpHbPNaV33TcM-IoYW11wNUCKkivtfgC3tk7hkKa3gue7ZTjLhR1ZOE_A1MvMZ3rgBxGDg-HFASH4YP6jI3rwMM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDRCEooMTK0GZV_7SdAorgeIN1pNz3R9YsLv-2pv39FOje7BUWCWPnKOSA1f6rlYcw7IoJ8NxUp4OU-MAk5_ucnykEtps56-kR6DtQ9JgLlCNyiuazO87fy-xCtXVNROT9kquBZ2JUvUtNGRwWiBaK1DnXOHSxp3ELHbLK8MNS-Ht3Gw8dXgNbya4bZiHZ7C-YnCJfwPjX25zrrQypfbiJsS8jjxFq3--uC264Zbhxp8XCsqDid3BIaJ8RdNMRze6lVvpg49N7Z0tI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBk_c2n3UBtDQJ-NNLPp9wHCUtPuJTKQi4jnndp2ZNKTRfxtmV85MELPvVecn7Ef74j23fC3l08ZwEbHr70k5C1eHlVG8Pj-K0GWve-DoShWQNa5VGFhBad_Vtlxlu_u22wpBT3475EVHpmhcfwY2FekfCxqUrc_fGSBlHLcKIZ8XsNyHpAPUqUD2n10H86tm9E1nexgYeFUXpLsgB-FRTtya2tTZZ8kTJ-i0Mv6kWLi-LJgvYuYsN2lB0jZi0Q7xxJe6O1M-vA9eg"
];

export const mockProperties: Property[] = [
  {
    id: "featured-1",
    slug: "the-glass-pavilion",
    title: "The Glass Pavilion",
    price: 5250000,
    location: "Beverly Hills, California",
    beds: 5,
    baths: 4.5,
    area: 4200,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Villa",
    badge: "Exclusive",
    isFeatured: true
  },
  {
    id: "featured-2",
    slug: "azure-heights-penthouse",
    title: "Azure Heights Penthouse",
    price: 3800000,
    location: "Downtown, Vancouver",
    beds: 3,
    baths: 3,
    area: 2100,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Penthouse",
    badge: "New Arrival",
    isFeatured: true
  },
  {
    id: "market-1",
    slug: "modern-family-home",
    title: "Modern Family Home",
    price: 850000,
    location: "123 Pine St, Seattle",
    beds: 3,
    baths: 2,
    area: 120,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-2",
    slug: "urban-loft",
    title: "Urban Loft",
    price: 3200,
    pricePerMonth: true,
    location: "456 Elm Ave, Portland",
    beds: 1,
    baths: 1,
    area: 85,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-3",
    slug: "highland-retreat",
    title: "Highland Retreat",
    price: 620000,
    location: "789 Mountain Rd, Bend",
    beds: 2,
    baths: 2,
    area: 98,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-4",
    slug: "sea-view-penthouse",
    title: "Sea View Penthouse",
    price: 4500,
    pricePerMonth: true,
    location: "321 Ocean Dr, Miami",
    beds: 3,
    baths: 3,
    area: 180,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Penthouse",
    isFeatured: false
  },
  {
    id: "market-5",
    slug: "central-studio",
    title: "Central Studio",
    price: 550000,
    location: "555 Main St, Chicago",
    beds: 1,
    baths: 1,
    area: 50,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-6",
    slug: "garden-villa",
    title: "Garden Villa",
    price: 2800,
    pricePerMonth: true,
    location: "999 Oak Ln, Austin",
    beds: 2,
    baths: 2,
    area: 110,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Villa",
    isFeatured: false
  },
  {
    id: "market-7",
    slug: "serene-lakeside-villa",
    title: "Serene Lakeside Villa",
    price: 4200000,
    location: "Lake Tahoe, Nevada",
    beds: 4,
    baths: 4,
    area: 380,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Villa",
    isFeatured: false
  },
  {
    id: "market-8",
    slug: "minimalist-forest-house",
    title: "Minimalist Forest House",
    price: 1250000,
    location: "Portland, Oregon",
    beds: 3,
    baths: 2.5,
    area: 220,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-9",
    slug: "skyline-view-penthouse",
    title: "Skyline View Penthouse",
    price: 6800,
    pricePerMonth: true,
    location: "Manhattan, New York",
    beds: 2,
    baths: 2,
    area: 160,
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Penthouse",
    isFeatured: false
  },
  {
    id: "market-10",
    slug: "contemporary-coastal-retreat",
    title: "Contemporary Coastal Retreat",
    price: 2950000,
    location: "Malibu, California",
    beds: 4,
    baths: 3.5,
    area: 310,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Villa",
    isFeatured: false
  },
  {
    id: "market-11",
    slug: "chic-soho-loft-apartment",
    title: "Chic Soho Loft Apartment",
    price: 3400,
    pricePerMonth: true,
    location: "Soho, New York",
    beds: 1,
    baths: 1.5,
    area: 95,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-12",
    slug: "brutalist-architectural-house",
    title: "Brutalist Architectural House",
    price: 3750000,
    location: "Austin, Texas",
    beds: 4,
    baths: 4.5,
    area: 450,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-13",
    slug: "modernist-desert-oasis",
    title: "Modernist Desert Oasis",
    price: 1950000,
    location: "Palm Springs, California",
    beds: 3,
    baths: 3,
    area: 280,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Villa",
    isFeatured: false
  },
  {
    id: "market-14",
    slug: "high-rise-executive-studio",
    title: "High-Rise Executive Studio",
    price: 2100,
    pricePerMonth: true,
    location: "Seattle, Washington",
    beds: 1,
    baths: 1,
    area: 65,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR RENT",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-15",
    slug: "sunset-strip-penthouse",
    title: "Sunset Strip Penthouse",
    price: 8900000,
    location: "Los Angeles, California",
    beds: 3,
    baths: 4,
    area: 380,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "Penthouse",
    isFeatured: false
  },
  {
    id: "market-16",
    slug: "mid-century-modern-residence",
    title: "Mid-Century Modern Residence",
    price: 1650000,
    location: "Denver, Colorado",
    beds: 3,
    baths: 2,
    area: 240,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      ...extraImages
    ],
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  }
];
