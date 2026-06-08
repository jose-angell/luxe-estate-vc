export interface Property {
  id: string;
  title: string;
  price: number;
  pricePerMonth?: boolean;
  location: string;
  beds: number;
  baths: number;
  area: number; // in m²
  image: string;
  status: "FOR SALE" | "FOR RENT";
  type: "House" | "Apartment" | "Villa" | "Penthouse";
  badge?: string;
  isFeatured: boolean;
}

export const mockProperties: Property[] = [
  {
    id: "featured-1",
    title: "The Glass Pavilion",
    price: 5250000,
    location: "Beverly Hills, California",
    beds: 5,
    baths: 4.5,
    area: 4200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
    status: "FOR SALE",
    type: "Villa",
    badge: "Exclusive",
    isFeatured: true
  },
  {
    id: "featured-2",
    title: "Azure Heights Penthouse",
    price: 3800000,
    location: "Downtown, Vancouver",
    beds: 3,
    baths: 3,
    area: 2100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
    status: "FOR SALE",
    type: "Penthouse",
    badge: "New Arrival",
    isFeatured: true
  },
  {
    id: "market-1",
    title: "Modern Family Home",
    price: 850000,
    location: "123 Pine St, Seattle",
    beds: 3,
    baths: 2,
    area: 120,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-2",
    title: "Urban Loft",
    price: 3200,
    pricePerMonth: true,
    location: "456 Elm Ave, Portland",
    beds: 1,
    baths: 1,
    area: 85,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4",
    status: "FOR RENT",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-3",
    title: "Highland Retreat",
    price: 620000,
    location: "789 Mountain Rd, Bend",
    beds: 2,
    baths: 2,
    area: 98,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
    status: "FOR SALE",
    type: "House",
    isFeatured: false
  },
  {
    id: "market-4",
    title: "Sea View Penthouse",
    price: 4500,
    pricePerMonth: true,
    location: "321 Ocean Dr, Miami",
    beds: 3,
    baths: 3,
    area: 180,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
    status: "FOR RENT",
    type: "Penthouse",
    isFeatured: false
  },
  {
    id: "market-5",
    title: "Central Studio",
    price: 550000,
    location: "555 Main St, Chicago",
    beds: 1,
    baths: 1,
    area: 50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
    status: "FOR SALE",
    type: "Apartment",
    isFeatured: false
  },
  {
    id: "market-6",
    title: "Garden Villa",
    price: 2800,
    pricePerMonth: true,
    location: "999 Oak Ln, Austin",
    beds: 2,
    baths: 2,
    area: 110,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8",
    status: "FOR RENT",
    type: "Villa",
    isFeatured: false
  }
];
