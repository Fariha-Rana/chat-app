# website Link : https://chat-app-beta-ruddy.vercel.app/

## Chat-App

This is a Realtime chat application built using Nextjs, Appwrite and Chakra UI.

## src: Contains the source code for the chat application.

- src/App.js: The main Directory that renders the chat application.
- src/components/Chat.js: The component responsible for displaying the chat messages.
- src/context: provides context of Appwrite authentication and chakraProviders context.
- src/appwrite: The service responsible for interacting with the Appwrite backend. It includes user authentication logic and talking with database.

## Main Dependencies

- Appwrite: A backend-as-a-service platform used for handling user authentication and storing chat messages.
- Chakra UI: A component library for building user interfaces with React.

## Getting Started

1. Clone the repository.
2. Install the dependencies using `pnpm install`.
3. Configure the Appwrite backend and obtain the necessary API keys as shown in env.example file.
4. Run the application using `pnpm run dev`
