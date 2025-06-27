# Company Registration Module - Modular Architecture Documentation

## Overview

This document explains the modular refactoring of the Company Registration feature, following the MVVM + BLoC architecture pattern and DRY principles.

## Architecture Components

### 1. Data Layer

#### Models (`data/models/`)
- **`CompanyRegistrationModel`**: Main data model for company registration
- **`BusinessCategoryModel`**: Model for business categories with static data
- Contains proper serialization, equality, and copyWith methods

#### Services (`data/services/`)
- **`CompanyRegistrationService`**: Abstract service interface
- **`CompanyRegistrationServiceImpl`**: Implementation with API calls
- Handles business logic for registration, validation, and file uploads

### 2. Presentation Layer

#### BLoC (`presentation/bloc/`)
- **`CompanyRegistrationBloc`**: Main state management using BLoC pattern
- **Events**: `UpdateSelectedCategories`, `UpdateGSTNumber`, `SubmitCompanyRegistration`, etc.
- **States**: `CompanyRegistrationInProgress`, `CompanyRegistrationLoading`, `CompanyRegistrationSuccess`, etc.
- Handles form validation, state transitions, and business logic

#### ViewModels (`presentation/viewmodels/`)
- **`CompanyRegistrationViewModel`**: Alternative to BLoC using ChangeNotifier
- Provides simpler state management for developers who prefer MVVM
- Contains same business logic but with different state management approach

#### Screens (`presentation/screens/`)
- **`CompanyRegistrationScreen`**: Main screen implementation
- **`CompanyRegistration`**: Legacy wrapper for backward compatibility
- Uses BLoC for state management and modular widgets

#### Widgets (`presentation/widgets/`)
- **`CategorySelectionWidget`**: Reusable category selection component
- **`SignatureWidget`**: Signature capture and upload functionality
- **`CustomTextField`**: Enhanced text field with consistent styling
- All widgets are self-contained and reusable

#### Utils (`presentation/utils/`)
- **`FormDecorations`**: Centralized styling and decoration utilities
- **`FormSpacing`**: Consistent spacing constants
- **`FormConstraints`**: Common UI constraints
- Implements DRY principle for consistent styling

### 3. Core Layer

#### Validators (`core/validators/`)
- **`FormValidators`**: Extended with company-specific validators
- **`validateGSTNumber`**: GST number format validation
- **`validatePANNumber`**: PAN number format validation
- **`validateAadhaarNumber`**: Aadhaar number validation
- **`validateCategoriesSelection`**: Category selection validation

## Key Improvements

### 1. Modular Components
- **Separation of Concerns**: Each component has a single responsibility
- **Reusable Widgets**: Components can be used across different screens
- **Consistent Styling**: Centralized styling with utility classes
- **Type Safety**: Proper TypeScript-like type definitions

### 2. DRY Principles Applied
- **Common Decorations**: Centralized in `FormDecorations` utility class
- **Reusable Validators**: Extracted to `FormValidators`
- **Consistent Spacing**: Defined in `FormSpacing` constants
- **Business Logic**: Separated from UI components

### 3. State Management Options
- **BLoC Pattern**: For complex state management and event handling
- **ViewModel Pattern**: For simpler state management needs
- **Both Patterns**: Can be used interchangeably based on requirements

### 4. Enhanced Error Handling
- **Validation States**: Proper validation error handling
- **Loading States**: Loading indicators during API calls
- **Success States**: Success feedback and navigation
- **Failure States**: Error messages and retry options

## Usage Examples

### Using BLoC Pattern
```dart
// In your screen
BlocProvider(
  create: (context) => CompanyRegistrationBloc(),
  child: CompanyRegistrationScreen(),
)

// In your widget
BlocBuilder<CompanyRegistrationBloc, CompanyRegistrationState>(
  builder: (context, state) {
    // Handle different states
    if (state is CompanyRegistrationLoading) {
      return CircularProgressIndicator();
    }
    // ... other states
  },
)
```

### Using ViewModel Pattern
```dart
// In your screen
ChangeNotifierProvider(
  create: (context) => CompanyRegistrationViewModel(
    GetIt.instance<CompanyRegistrationService>(),
  ),
  child: YourScreen(),
)

// In your widget
Consumer<CompanyRegistrationViewModel>(
  builder: (context, viewModel, child) {
    return YourWidget(
      isLoading: viewModel.isLoading,
      onSubmit: viewModel.submitRegistration,
    );
  },
)
```

### Using Reusable Widgets
```dart
// Category Selection
CategorySelectionWidget(
  selectedCategories: selectedCategories,
  onCategoriesChanged: (categories) {
    // Handle category changes
  },
)

// Signature Widget
SignatureWidget(
  signatureImage: signatureImage,
  onSignatureChanged: (signature) {
    // Handle signature changes
  },
)

// Custom Text Field with Validation
CustomTextField(
  label: 'GST Number',
  hintText: 'GST Number',
  controller: gstController,
  validator: FormValidators.validateGSTNumber,
)
```

### Using Utility Classes
```dart
// Consistent styling
TextFormField(
  decoration: FormFieldDecorations.standard(
    hintText: 'Enter value',
    prefixIcon: Icon(Icons.business),
  ),
)

// Consistent spacing
const SizedBox(height: FormSpacing.extraLarge)

// Consistent button styling
ElevatedButton(
  style: FormFieldDecorations.primaryButton(),
  child: Text('Submit'),
)
```

## Benefits

### 1. Maintainability
- **Single Responsibility**: Each component has a clear purpose
- **Easy to Test**: Components can be tested independently
- **Easy to Modify**: Changes in one component don't affect others

### 2. Reusability
- **Widget Reuse**: Widgets can be used in multiple screens
- **Code Reuse**: Business logic can be shared across features
- **Style Consistency**: Common styling across the app

### 3. Scalability
- **Easy to Extend**: New features can be added without affecting existing code
- **Team Development**: Multiple developers can work on different components
- **Performance**: Efficient state management and rendering

### 4. Developer Experience
- **Type Safety**: Better IDE support and error detection
- **Code Completion**: Better IntelliSense and autocompletion
- **Documentation**: Self-documenting code with clear naming

## Best Practices

### 1. State Management
- Use BLoC for complex business logic and side effects
- Use ViewModel for simpler state management
- Keep UI components stateless when possible

### 2. Validation
- Use centralized validators for consistency
- Implement real-time validation for better UX
- Provide clear error messages

### 3. Styling
- Use utility classes for consistent styling
- Define constants for spacing and dimensions
- Follow Material Design guidelines

### 4. Error Handling
- Handle all possible states (loading, success, error)
- Provide meaningful error messages
- Implement retry mechanisms for failed operations

## Migration Guide

### From Old Implementation
1. **Replace StatefulWidget**: Use BLoC or ViewModel instead
2. **Extract Reusable Components**: Move repeated UI code to widgets
3. **Centralize Styling**: Use FormDecorations utility class
4. **Add Proper Validation**: Use FormValidators for type-safe validation
5. **Implement State Management**: Use BLoC events and states

### Testing Strategy
1. **Unit Tests**: Test business logic in BLoCs and ViewModels
2. **Widget Tests**: Test individual widgets in isolation
3. **Integration Tests**: Test complete user flows
4. **Golden Tests**: Test UI consistency across different states

This modular architecture ensures that the Company Registration feature is maintainable, scalable, and follows Flutter best practices while adhering to the DRY principle and MVVM + BLoC architecture pattern.
