import { createClient } from '@supabase/supabase-js';

// Initialize database client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isPlaceholder(value: string | undefined) {
  if (!value) return true;
  const v = value.toLowerCase();
  return v.includes('your') || v.includes('example') || v === '';
}

// Minimal typing for the mock client to satisfy common usage sites
type MockResponse<T = any> = Promise<{ data: T; error: any } | { data: null; error: any }>;

type MockFrom = (table: string) => {
  select: (columns?: string) => MockResponse<any>;
  insert: (values: any) => MockResponse<any>;
  update: (values: any) => MockResponse<any>;
  delete: () => MockResponse<any>;
  eq: (column: string, value: any) => MockResponse<any>;
  order: (column: string, options?: any) => MockResponse<any>;
};

type MockAuth = {
  signInWithPassword: (creds: { email: string; password: string }) => MockResponse<any>;
  signOut: () => MockResponse<any>;
  getSession: () => MockResponse<any>;
  onAuthStateChange: (cb: (...args: any[]) => void) => { data: { subscription: { unsubscribe: () => void } } };
  signUp: (creds: { email: string; password: string }) => MockResponse<any>;
};

type MockStorage = {
  from: (bucket: string) => {
    upload: (path: string, file: any) => MockResponse<any>;
    getPublicUrl: (path: string) => { data: { publicUrl: string } };
  };
};

let supabase: any;

if (!isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseKey)) {
  // Initialize Supabase client with provided credentials
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  const warningMsg =
    'Supabase environment variables not found or contain placeholders. The app will run in limited mode without database functionality.';

  // Warn in development and production but do not crash; provide a Promise-based mock client
  console.warn(
    warningMsg + '\nTo enable full functionality, configure environment variables:\n' +
    'VITE_SUPABASE_URL=your_supabase_project_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_supabase_anon_key'
  );

  const mockFrom: MockFrom = (table: string) => ({
    select: (columns?: string) => Promise.resolve({ data: [], error: null }),
    insert: (values: any) => Promise.resolve({ data: values, error: null }),
    update: (values: any) => Promise.resolve({ data: values, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
    order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
  });

  const mockAuth: MockAuth = {
    signInWithPassword: ({ email, password }: { email: string; password: string }) =>
      Promise.resolve({ data: { user: { id: 'mock-user-id', email }, session: { access_token: 'mock-token' } }, error: null }),
    signOut: () => Promise.resolve({ data: null, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signUp: ({ email, password }: { email: string; password: string }) =>
      Promise.resolve({ data: { user: { id: 'mock-user-id', email } }, error: null }),
  };

  const mockStorage: MockStorage = {
    from: (bucket: string) => ({
      upload: (path: string, file: any) => Promise.resolve({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `https://mock-url/${path}` } }),
    }),
  };

  supabase = {
    from: mockFrom,
    auth: mockAuth,
    storage: mockStorage,
  };
}

export { supabase };