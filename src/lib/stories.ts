
import { collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, query } from "firebase/firestore"; 
import { firestore } from '@/lib/firebase';
import type { Story, Season } from './types';

// NOTE: This is a placeholder author slug. In a real application,
// this would be dynamically assigned based on the logged-in author.
const AUTHOR_SLUG = 'elara-vance';
const AUTHOR_NAME = 'Elara Vance';


/**
 * Fetches all stories from the Firestore database.
 * @returns A promise that resolves to an array of stories.
 */
export async function getStories(): Promise<Story[]> {
    const storiesCollection = collection(firestore, "stories");
    const storiesSnapshot = await getDocs(query(storiesCollection));
    const storiesList = storiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Story));
    return storiesList;
}

/**
 * Adds a new story to the Firestore database.
 * @param storyData - The data for the new story.
 * @returns A promise that resolves to the newly created story data.
 */
export async function addStory(storyData: Omit<Story, 'id' | 'author' | 'authorSlug' | 'imageUrl' | 'imageHint' | 'rating' | 'views' | 'likes'>): Promise<Story> {
    
    // In a real app, you would get the author details from the authenticated user
    const newStory = {
      ...storyData,
      author: AUTHOR_NAME,
      authorSlug: AUTHOR_SLUG,
      // Add placeholder values for fields not in the form
      imageUrl: `https://picsum.photos/seed/${Math.random()}/600/400`,
      imageHint: "abstract",
      rating: 0,
      views: 0,
      likes: 0,
      createdAt: serverTimestamp(),
    };

    const storiesCollection = collection(firestore, "stories");
    const docRef = await addDoc(storiesCollection, newStory);
    
    return {
        ...newStory,
        id: docRef.id,
    } as Story;
}

/**
 * Deletes a story from the Firestore database.
 * @param storyId - The ID of the story to delete.
 * @returns A promise that resolves when the story is deleted.
 */
export async function deleteStory(storyId: string): Promise<void> {
    const storyDoc = doc(firestore, "stories", storyId);
    await deleteDoc(storyDoc);
}
