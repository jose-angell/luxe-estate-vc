-- 1. Create a public table for user roles
CREATE TABLE public.user_roles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
-- Anyone can read user roles (useful for checking if someone is admin in UI)
CREATE POLICY "Allow public read access on user_roles" 
ON public.user_roles FOR SELECT 
USING (true);

-- Only admins can update user roles (We will use the service role key from the server, 
-- which bypasses RLS entirely, so we don't strictly need a complex update policy here 
-- for the client side, but we can add one for safety).
-- For now, updates are only allowed from server-side using service_role_key.

-- 4. Create a trigger to automatically add a 'user' role when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
