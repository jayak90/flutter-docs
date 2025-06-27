# Deals Feature - Bid Management System

## Overview

This document explains the refactored Deals feature, specifically the Bid Management System, which follows the MVVM (Model-View-ViewModel) architecture pattern with BLoC state management. The system has been designed to be modular, maintainable, and follows the DRY (Don't Repeat Yourself) principle.

## Architecture

The Deals feature follows a clean architecture pattern with clear separation of concerns:

```
lib/features/deals/
├── data/                           # Data Layer
│   ├── models/                     # Data models and business entities
│   │   ├── bid_model.dart         # Bid data model with business logic
│   │   └── deal.dart              # Deal data model
│   └── services/                   # Data access layer
│       └── bid_service.dart       # API service for bid operations
│
└── presentation/                   # Presentation Layer
    ├── bloc/                       # State Management (BLoC Pattern)
    │   ├── bid_bloc.dart          # Bid-specific state management
    │   ├── bid_event.dart         # Bid events
    │   ├── bid_state.dart         # Bid states
    │   ├── deals_bloc.dart        # Main deals state management
    │   └── bloc.dart              # Barrel file for exports
    │
    ├── viewmodels/                 # ViewModels (Alternative approach)
    │   ├── bid_view_model.dart    # ChangeNotifier-based ViewModel
    │   └── deals_viewmodel.dart   # Deals ViewModel
    │
    └── widgets/                    # UI Components
        ├── bid_dialog.dart        # Complete bid submission dialog
        ├── bid_price_display_widget.dart  # Clickable bid price button
        ├── custom_text_field.dart # Reusable input field component
        ├── detail_row_widget.dart # Price/info display row
        ├── shipping_type_selector.dart    # Radio button group for shipping
        └── widgets.dart           # Barrel file for exports
```

## Key Components

### 1. Data Layer

#### BidModel (`data/models/bid_model.dart`)
The core data model that represents a bid with all its properties and business logic:

```dart
class BidModel extends Equatable {
  final String id;
  final String productName;
  final double currentBidPrice;
  final double perPiecePrice;
  final int quantity;
  final double totalTax;
  final ShippingType shippingType;
  final double? customDeliveryCharges;
  
  // Business Logic
  double get totalBeforeTax => perPiecePrice * quantity;
  double get finalTotalAmount => totalBeforeTax + totalTax + deliveryCharges;
}
```

**Features:**
- Immutable data structure using `Equatable`
- Built-in business logic calculations
- Type-safe shipping options with enum
- Proper null safety implementation

#### BidService (`data/services/bid_service.dart`)
Abstract service layer for bid-related API operations:

```dart
abstract class BidService {
  Future<BidModel> getBidById(String bidId);
  Future<void> submitBid(String bidId, double totalAmount, ShippingType shippingType, double? deliveryCharges);
}
```

### 2. Presentation Layer

#### BLoC Pattern (`presentation/bloc/`)

**BidBloc**: Manages the state of bid operations
- **Events**: `LoadBidData`, `UpdateShippingType`, `UpdateDeliveryCharges`, `SubmitBid`
- **States**: `BidInitial`, `BidLoading`, `BidLoaded`, `BidError`, `BidSubmitting`, `BidSubmitted`

**Example Usage:**
```dart
// Loading bid data
context.read<BidBloc>().add(LoadBidData('bid_123'));

// Updating shipping type
context.read<BidBloc>().add(UpdateShippingType('Vendor'));

// Submitting bid
context.read<BidBloc>().add(SubmitBid(totalAmount));
```

#### Reusable UI Components

##### BidPriceDisplayWidget
A clickable button that displays bid price and opens the bid dialog:

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

##### BidDialog
A comprehensive dialog for bid submission with:
- Current bid price display
- Shipping type selection (Radio buttons)
- Delivery charges input (conditional)
- Total amount calculation and input
- Price breakdown details
- Submit functionality with loading states

##### Reusable Components
- **CustomTextField**: Standardized input field with consistent styling
- **DetailRow**: Label-value display for price breakdowns
- **ShippingTypeSelector**: Radio button group for shipping options

## MVVM Architecture Implementation

### Model
- **BidModel**: Contains data structure and business logic
- **BidService**: Handles data operations and API calls

### View
- **BidDialog**: Main UI component for bid submission
- **BidPriceDisplayWidget**: Entry point widget
- **All other widgets**: Pure UI components

### ViewModel
- **BidBloc**: State management and business logic coordination
- **BidViewModel**: Alternative ChangeNotifier-based approach

## Design Principles Applied

### 1. **Single Responsibility Principle (SRP)**
- Each widget has one specific purpose
- Services handle only data operations
- BLoC manages only state transitions

### 2. **DRY (Don't Repeat Yourself)**
- **Reusable Components**: Text fields, detail rows, selectors
- **Centralized Business Logic**: All calculations in models
- **Shared State Management**: Single source of truth for bid state

### 3. **Dependency Inversion**
- Abstract service interfaces
- Dependency injection ready
- Mockable components for testing

### 4. **Open/Closed Principle**
- Easy to extend with new bid types
- New UI components can be added without modifying existing ones

## Usage Examples

### Basic Implementation

```dart
// 1. Provide BLoC at app level or feature level
BlocProvider(
  create: (context) => BidBloc(
    bidService: GetIt.instance<BidService>(),
  ),
  child: MyApp(),
)

// 2. Use the widget in your UI
BidPriceDisplayWidget(
  price: '₹${deal.currentBidPrice}',
  label: 'Place Bid',
  backgroundColor: AppColors.primary,
  textColor: Colors.white,
  isClickable: true,
  bidId: deal.id,
)
```

### Advanced Usage with Custom Service

```dart
// Custom service implementation
class CustomBidService implements BidService {
  final Dio _dio;
  
  CustomBidService(this._dio);
  
  @override
  Future<BidModel> getBidById(String bidId) async {
    final response = await _dio.get('/bids/$bidId');
    return BidModel.fromJson(response.data);
  }
  
  @override
  Future<void> submitBid(String bidId, double totalAmount, 
                        ShippingType shippingType, double? deliveryCharges) async {
    await _dio.post('/bids/$bidId/submit', data: {
      'totalAmount': totalAmount,
      'shippingType': shippingType.name,
      'deliveryCharges': deliveryCharges,
    });
  }
}
```

## State Management Flow

```
User Action → Event → BLoC → Service → API
    ↓           ↓       ↓        ↓       ↓
 Widget ← UI Update ← State ← Response ← Server
```

### Example Flow:
1. User clicks "Place Bid" → `BidPriceDisplayWidget` triggered
2. Dialog opens with `LoadBidData` event
3. `BidBloc` calls `BidService.getBidById()`
4. Service fetches data from API
5. `BidLoaded` state emitted with data
6. UI updates to show bid form
7. User modifies shipping type → `UpdateShippingType` event
8. `BidBloc` updates state with new shipping selection
9. UI reactively updates total amount
10. User submits → `SubmitBid` event
11. `BidBloc` calls `BidService.submitBid()`
12. Success/Error state emitted
13. UI shows feedback to user

## Testing Strategy

### Unit Tests
```dart
// Model tests
test('BidModel calculates total amount correctly', () {
  final bid = BidModel(/* parameters */);
  expect(bid.finalTotalAmount, equals(expectedTotal));
});

// BLoC tests
blocTest<BidBloc, BidState>(
  'emits BidLoaded when LoadBidData is successful',
  build: () => BidBloc(bidService: mockBidService),
  act: (bloc) => bloc.add(LoadBidData('test_id')),
  expect: () => [BidLoading(), isA<BidLoaded>()],
);
```

### Widget Tests
```dart
testWidgets('BidPriceDisplayWidget opens dialog when clicked', (tester) async {
  await tester.pumpWidget(testWidget);
  await tester.tap(find.byType(BidPriceDisplayWidget));
  await tester.pumpAndSettle();
  expect(find.byType(BidDialog), findsOneWidget);
});
```

## Performance Considerations

1. **Lazy Loading**: BLoC providers are created only when needed
2. **Immutable State**: Efficient state comparisons using Equatable
3. **Selective Rebuilds**: BlocBuilder rebuilds only affected widgets
4. **Memory Management**: Proper disposal of controllers and resources

## Future Enhancements

### Planned Features
- [ ] Real-time bid updates using WebSocket
- [ ] Offline bid caching with local storage
- [ ] Bid history and analytics
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Integration with payment gateway

### Technical Improvements
- [ ] Add comprehensive form validation using Formz
- [ ] Implement repository pattern for data caching
- [ ] Add automated testing pipeline
- [ ] Performance monitoring and analytics
- [ ] Error tracking and reporting

## Migration Guide

### From Old Implementation
If you're migrating from the old `BidForItemsDialog`:

**Before:**
```dart
showDialog(
  context: context,
  builder: (context) => const BidForItemsDialog(),
);
```

**After:**
```dart
BidPriceDisplayWidget(
  price: '₹26,500',
  label: 'Place Bid',
  backgroundColor: AppColors.primary,
  textColor: Colors.white,
  isClickable: true,
  bidId: 'bid_123', // Now required
)
```

### Dependencies Required
Ensure your `pubspec.yaml` includes:
```yaml
dependencies:
  flutter_bloc: ^8.1.4
  equatable: ^2.0.5
  auto_size_text: ^3.0.0
  # ... other dependencies
```

## Troubleshooting

### Common Issues

1. **BLoC not found error**
   - Ensure BlocProvider is properly set up in widget tree
   - Check that the correct BLoC type is being accessed

2. **State not updating**
   - Verify events are being added correctly
   - Check that copyWith is properly implemented in states

3. **Dialog not opening**
   - Ensure `bidId` is provided and not null
   - Check `isClickable` is set to true

4. **API errors**
   - Implement proper error handling in BidService
   - Add retry mechanisms for network failures

## Contributing

When contributing to this feature:

1. Follow the established architecture patterns
2. Write tests for new components
3. Update documentation for new features
4. Ensure backwards compatibility
5. Follow the project's coding standards

## Conclusion

This refactored bid management system provides a robust, scalable, and maintainable foundation for handling bid operations in the Anudha Mart application. The modular architecture ensures easy testing, debugging, and future enhancements while maintaining clean separation of concerns throughout the codebase.
