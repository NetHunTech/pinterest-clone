type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string | null;
  created_at: string;
};

type Pin = {
  id: string;
  title: string;
  image_url: string;
  user_id?: string;
  created_at?: string;
};

export type { 
  Profile, 
  Pin 
}