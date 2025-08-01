<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React TypeScript Frontend Application

This is a production-ready React TypeScript application built with modern tools and best practices.

## Architecture Guidelines

- Use TypeScript for all new code with strict type checking
- Follow React functional components with hooks pattern
- Implement proper error boundaries for robust error handling
- Use Zustand for state management with proper TypeScript typing
- Implement responsive design using Tailwind CSS
- Use proper logging with the custom logging middleware
- Write comprehensive tests using Vitest and React Testing Library

## Code Quality Standards

- All components should be properly typed with TypeScript interfaces
- Use proper error handling with try-catch blocks and user-friendly error messages
- Implement loading states for all async operations
- Use proper semantic HTML and accessibility attributes
- Follow the established folder structure and naming conventions
- Implement proper form validation using react-hook-form and zod
- Use the custom UI components from the components/ui directory

## Logging Requirements

- All major user actions and API calls should use the logging middleware
- Log levels: debug, info, warning, error
- Always include meaningful context in log messages
- Use the logging middleware in the first function of each component as required

## Testing Guidelines

- Write unit tests for all utility functions
- Write component tests for UI components
- Test error states and edge cases
- Use proper mocking for external dependencies
- Maintain good test coverage

## Responsive Design

- Mobile-first approach using Tailwind CSS
- Ensure all components work on mobile, tablet, and desktop
- Use proper breakpoints and responsive utilities
- Test on different screen sizes

## Performance

- Use React.memo for expensive components
- Implement proper code splitting where appropriate
- Optimize images and assets
- Use proper loading states and skeleton screens
