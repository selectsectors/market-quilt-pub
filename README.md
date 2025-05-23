# Market Quilt Repository

## Getting Started

### Environment Setup

This project uses environment variables for configuration. To set up your local environment:

1. Copy the `.env.local` file from the repository root (or create one if it doesn't exist)
2. Update the required environment variables

### Algolia Search Configuration

The application uses Algolia for search functionality. To configure Algolia search:

1. Sign up for an Algolia account at [https://www.algolia.com/](https://www.algolia.com/)
2. Create an index named "SYMBOLS" in your Algolia dashboard
3. Get your Application ID from the Algolia dashboard:
   - Go to "Settings" > "API Keys"
   - Copy the Application ID
4. Open your `.env.local` file and replace `YOUR_ALGOLIA_APP_ID` with your actual Application ID:
   ```
   NEXT_PUBLIC_ALGOLIA_APP_ID=YOUR_ACTUAL_APP_ID
   ```

The Search API Key is already configured in the `.env.local` file.

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

