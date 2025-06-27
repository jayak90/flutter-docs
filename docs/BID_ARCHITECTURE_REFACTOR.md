# Bid Feature Architecture Documentation

## Overview

The bid feature has been refactored to follow the MVVM architecture pattern with BLoC state management, adhering to the DRY (Don't Repeat Yourself) principle and proper separation of concerns.

## Architecture Structure

```
lib/features/deals/
├── data/                           # Data Layer
│   ├── models/
│   │   └── bid_model.dart         # Data models with business logic
│   └── services/
│       └── bid_service.dart       # API service layer
│
├── presentation/                   # Presentation Layer
│   ├── bloc/                      # State Management
│   │   ├── bid_bloc.dart         # Business logic controller
│   │   ├── bid_event.dart        # User actions/events
│   │   ├── bid_state.dart        # UI states
│   │   └── bloc.dart             # Barrel export file
│   │
│   ├── viewmodels/                # ViewModels (Alternative to BLoC)
│   │   └── bid_view_model.dart   # ChangeNotifier-based ViewModel
│   │
│   └── widgets/                   # UI Components
│       ├── bid_dialog.dart       # Main bid dialog
│       ├── bid_price_display_widget.dart  # Clickable bid button
│       ├── custom_text_field.dart # Reusable text field
│       ├── detail_row_widget.dart # Price detail row
│       ├── shipping_type_selector.dart    # Radio button group
│       └── widgets.dart          # Barrel export file
```

## Key Architectural Principles Applied

### 1. **Separation of Concerns**
- **Models**: Handle data structure and business logic calculations
- **Services**: Handle API communications and data fetching
- **BLoC**: Manages application state and business logic flow
- **Widgets**: Focus purely on UI rendering and user interactions

### 2. **DRY Principle**
- **Reusable Components**: `CustomTextField`, `DetailRow`, `ShippingTypeSelector`
- **Centralized Models**: `BidModel` contains all bid-related data and calculations
- **Shared Business Logic**: Calculations like `totalAmount` are centralized in the model

### 3. **MVVM Architecture**
- **Model**: `BidModel` + `BidService`
- **View**: All widget files (`bid_dialog.dart`, etc.)
- **ViewModel**: `BidBloc` (or `BidViewModel` as alternative)

## Components Breakdown

### Data Layer

#### BidModel
```dart
class BidModel extends Equatable {
  // Properties
  final String id;
  final String productName;
  final double currentBidPrice;
  // ... other properties
  
  // Business Logic
  double get totalBeforeTax => perPiecePrice * quantity;
  double get finalTotalAmount => // calculation logic
  
  // Immutability
  BidModel copyWith({...}) => // immutable updates
}
```

#### BidService
```dart
abstract class BidService {
  Future<BidModel> getBidById(String bidId);
  Future<void> submitBid(...);
}
```

### Presentation Layer

#### BLoC Pattern
- **Events**: User actions (`LoadBidData`, `UpdateShippingType`, etc.)
- **States**: UI states (`BidLoading`, `BidLoaded`, `BidError`, etc.)
- **BLoC**: Business logic processor

#### Reusable Widgets
- **CustomTextField**: Standardized input field with validation support
- **DetailRow**: Consistent label-value display
- **ShippingTypeSelector**: Radio button group for shipping options

## Usage Examples

### Using the BidPriceDisplayWidget
```dart
BidPriceDisplayWidget(
  price: '₹26,500',
  label: 'Current Bid',
  backgroundColor: Colors.blue,
  textColor: Colors.white,
  isClickable: true,
  bidId: 'bid_123', // Required for dialog functionality
)
```

### Providing BLoC
```dart
BlocProvider(
  create: (context) => BidBloc(
    bidService: GetIt.instance<BidService>(), // Dependency injection
  ),
  child: YourWidget(),
)
```

## Benefits Achieved

### 1. **Modularity**
- Each component has a single responsibility
- Components can be easily tested in isolation
- Easy to add new features without affecting existing code

### 2. **Reusability**
- Text fields, detail rows, and selectors can be used across the app
- Business logic is centralized and reusable

### 3. **Maintainability**
- Clear separation makes debugging easier
- Changes to business logic don't affect UI and vice versa
- Follows Flutter and Dart best practices

### 4. **Testability**
- Models can be unit tested
- BLoC can be tested independently
- Widgets can be widget tested
- Services can be mocked for testing

### 5. **Scalability**
- Easy to add new bid types or modify existing ones
- New UI components can reuse existing building blocks
- State management scales well with app complexity

## Future Enhancements

1. **Dependency Injection**: Use GetIt or Provider for better service management
2. **Form Validation**: Add Formz integration for robust form validation
3. **Offline Support**: Add local storage capabilities
4. **Error Handling**: Implement comprehensive error handling strategies
5. **Loading States**: Add skeleton loading and better UX feedback
6. **Accessibility**: Ensure all components follow accessibility guidelines

## Migration Guide

If you have existing code using the old `BidForItemsDialog`, update your usage:

### Before:
```dart
showDialog(
  context: context,
  builder: (context) => const BidForItemsDialog(),
);
```

### After:
```dart
BidPriceDisplayWidget(
  // ... properties
  bidId: 'your_bid_id',
  isClickable: true,
)
```

The new architecture automatically handles the dialog display with proper state management.
