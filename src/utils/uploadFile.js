import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../firebase/config';

export const uploadFile = async (file, fileType, additionalData = {}) => {
  try {
    // 1. Create storage reference
    const storageRef = ref(storage, `${fileType}/${Date.now()}_${file.name}`);
    
    // 2. Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // 3. Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // 4. Save to Firestore
    const docRef = await addDoc(collection(db, fileType), {
      ...additionalData,
      url: downloadURL,
      fileName: file.name,
      fileType: file.type,
      uploadedAt: serverTimestamp()
    });
    
    return { id: docRef.id, url: downloadURL };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};