// Types will be defined here as needed
// Example: User, Note, ChatMessage types

export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  number: number;
  createdAt: Date;
}

