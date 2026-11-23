# Tecprime OS Cloud Sync — Firebase setup

Cloud sync uses Firebase Authentication, Cloud Firestore, and Cloud Storage. Existing local browser data must be retained and migrated only after the user is authenticated and chooses to upload it.

## Security model
- Each user is isolated by Firebase Auth UID.
- Firestore path: `users/{uid}/tecprime/{document}`.
- Storage path: `users/{uid}/tecprime/{file}`.
- Never use open/test-mode rules in production.
- The web Firebase config is public client configuration; security is enforced by Firebase rules and Auth.

## Setup
1. Create a Firebase project and register a Web app.
2. Enable Authentication > Sign-in method > Email/Password.
3. Create the Firestore database.
4. Enable Storage if photo cloud storage is required (availability/billing may depend on Firebase plan).
5. Deploy `firestore.rules` and `storage.rules` from this repository or paste them into Firebase Rules.
6. Copy the Firebase web config. It will be added to the app only after the cloud project is configured.

## Migration safety
- Keep local `tecprimeOS_v1` data intact.
- On first sign-in, show an explicit migration choice before uploading local records.
- Do not overwrite cloud records automatically. Compare local/cloud snapshots and ask before choosing a merge.
- Photos should be uploaded as files to Storage, with metadata/URLs in Firestore; do not store base64 photos inside a Firestore document.

## Firestore document layout (planned)
`users/{uid}/tecprime/appdata` — clients, jobs, receipts, app metadata.
Photo objects live under `users/{uid}/tecprime/photos/{jobId}/{photoId}`.
