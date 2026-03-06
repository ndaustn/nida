// Firebase Admin SDK — server-side only (API routes)
// Requires one of:
//   FIREBASE_SERVICE_ACCOUNT_JSON  (full service account JSON string)
// OR all three of:
//   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

import { App, getApps, initializeApp, cert } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

let cachedApp: App | undefined;

function getAdminApp(): App {
  if (cachedApp) return cachedApp;

  // Reuse existing app if already initialized (e.g. hot-reload in dev)
  if (getApps().length > 0) {
    cachedApp = getApps()[0];
    return cachedApp;
  }

  // Option 1: Full service account JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    cachedApp = initializeApp({ credential: cert(serviceAccount) });
    return cachedApp;
  }

  // Option 2: Individual environment variables
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    cachedApp = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
    return cachedApp;
  }

  throw new Error(
    "Firebase Admin yapılandırması eksik. " +
      ".env.local dosyasına FIREBASE_SERVICE_ACCOUNT_JSON veya " +
      "FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY ekleyin."
  );
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}
