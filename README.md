# Talentropy Enterprise - README

## Project Overview

Talentropy Enterprise is a comprehensive platform for unstructured data intelligence that combines business-user accessibility with enterprise-grade technical capabilities. This project is an implementation of the master plan outlined in the project analysis, providing a scalable solution for document management, chat-based interaction, workflow automation, and analytics.

## Features

- **Document Management**: Upload, process, and organize documents with automatic classification and entity extraction
- **Chat Interface**: Interact with documents through natural language queries
- **Workflow Automation**: Create and manage automated workflows for different business processes
- **Advanced Search**: Search across all content using natural language
- **Analytics Dashboard**: Visualize key metrics and insights
- **Enterprise-Grade Security**: Role-based access control and authentication

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Components**: Custom components built with Tailwind CSS
- **State Management**: React Context API for simulated backend functionality
- **Routing**: React Router for navigation
- **Styling**: Tailwind CSS for responsive design

## Project Structure

```
talentropy_enterprise/
├── public/               # Static assets
├── src/
│   ├── components/       # UI components
│   │   ├── chat/         # Chat interface components
│   │   ├── dashboard/    # Dashboard and analytics components
│   │   ├── documents/    # Document management components
│   │   ├── layout/       # Layout components (header, sidebar)
│   │   ├── search/       # Search interface components
│   │   ├── ui/           # Reusable UI components
│   │   └── workflows/    # Workflow management components
│   ├── lib/              # Utilities and context providers
│   │   ├── analytics.tsx # Analytics context and logic
│   │   ├── auth.tsx      # Authentication context and logic
│   │   ├── chat.tsx      # Chat context and logic
│   │   ├── documents.tsx # Document management context and logic
│   │   ├── utils.ts      # Utility functions
│   │   └── workflows.tsx # Workflow management context and logic
│   ├── App.css           # Global styles
│   ├── App.tsx           # Main application component
│   ├── index.css         # Base styles
│   └── main.tsx          # Application entry point
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development

To start the development server:

```bash
npm run dev
# or
pnpm dev
```

This will start the development server at http://localhost:5173 (or another port if 5173 is in use).

### Building for Production

To build the project for production:

```bash
npm run build
# or
pnpm build
```

## Customization Guide

### Adding New Pages

1. Create a new component in the appropriate directory under `src/components/`
2. Add a new route in `src/App.tsx`:

```tsx
<Route path="/your-path" element={<Layout><YourComponent /></Layout>} />
```

### Extending Backend Functionality

The project currently uses React Context API to simulate backend functionality. To connect to a real backend:

1. Modify the context providers in the `src/lib/` directory
2. Replace the mock functions with actual API calls
3. Update the data models as needed

### Styling

The project uses Tailwind CSS for styling. To customize the theme:

1. Modify the `tailwind.config.js` file
2. Update the global styles in `src/index.css` and `src/App.css`

## Future Enhancements

- Integration with real backend services
- Advanced document processing capabilities
- Enhanced workflow automation features
- Mobile application support
- Integration with third-party services

## License

This project is licensed under the MIT License - see the LICENSE file for details.
